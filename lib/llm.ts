import {
  GoogleGenerativeAI,
  SchemaType,
  type Schema,
} from "@google/generative-ai";
import type { BrandKit } from "./firecrawl";
import { buildCopyPrompt, type PageCopy, type ProspectInput } from "./prompt";

const MODEL = "gemini-2.5-flash";

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");

const responseSchema: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    heroHeadline: { type: SchemaType.STRING },
    heroSubheadline: { type: SchemaType.STRING },
    valueProps: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          title: { type: SchemaType.STRING },
          body: { type: SchemaType.STRING },
        },
        required: ["title", "body"],
      },
    },
    socialProof: { type: SchemaType.STRING },
    ctaLabel: { type: SchemaType.STRING },
    ctaTarget: { type: SchemaType.STRING },
    trustLine: { type: SchemaType.STRING },
  },
  required: [
    "heroHeadline",
    "heroSubheadline",
    "valueProps",
    "socialProof",
    "ctaLabel",
    "ctaTarget",
    "trustLine",
  ],
};

export async function generateCopy(
  brand: BrandKit,
  prospect: ProspectInput,
): Promise<PageCopy> {
  const prompt = buildCopyPrompt(brand, prospect);

  const model = client.getGenerativeModel({
    model: MODEL,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema,
      temperature: 0.6,
      maxOutputTokens: 2048,
    },
  });

  let raw = "";
  try {
    const result = await model.generateContent(prompt);
    raw = result.response.text().trim();
  } catch (err) {
    throw new Error(
      `Gemini API call failed: ${(err as Error).message}. Check GEMINI_API_KEY and model access.`,
    );
  }

  if (!raw) {
    throw new Error(
      "Gemini returned an empty response. The prompt may have been blocked or truncated.",
    );
  }

  let cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    cleaned = cleaned.slice(firstBrace, lastBrace + 1);
  }

  let parsed: PageCopy;
  try {
    parsed = JSON.parse(cleaned) as PageCopy;
  } catch (err) {
    throw new Error(
      `Failed to parse Gemini JSON: ${(err as Error).message}. Raw output: ${raw.slice(0, 400)}`,
    );
  }

  return normalize(parsed);
}

function normalize(copy: PageCopy): PageCopy {
  return {
    heroHeadline: copy.heroHeadline ?? "",
    heroSubheadline: copy.heroSubheadline ?? "",
    valueProps: Array.isArray(copy.valueProps)
      ? copy.valueProps.slice(0, 3).map((vp) => ({
          title: vp?.title ?? "",
          body: vp?.body ?? "",
        }))
      : [],
    socialProof: copy.socialProof ?? "",
    ctaLabel: copy.ctaLabel ?? "Send me the playbook",
    ctaTarget: copy.ctaTarget ?? "#",
    trustLine: copy.trustLine ?? "",
  };
}
