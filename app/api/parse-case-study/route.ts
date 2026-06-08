import { NextResponse } from "next/server";
import { GoogleGenerativeAI, SchemaType, type Schema } from "@google/generative-ai";
import { extractCompanyContext } from "@/lib/firecrawl";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");

const schema: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    brand: { type: SchemaType.STRING },
    domain: { type: SchemaType.STRING },
    outcome: { type: SchemaType.STRING },
    customerName: { type: SchemaType.STRING },
    customerTitle: { type: SchemaType.STRING },
  },
  required: ["brand", "outcome", "customerName", "customerTitle"],
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const url: string = (body?.url || "").trim();
    const pastedText: string = (body?.text || "").trim();

    if (!url && !pastedText) {
      return NextResponse.json(
        { error: "Provide either a URL or pasted text" },
        { status: 400 },
      );
    }

    let source = pastedText;
    if (url && !source) {
      source = await extractCompanyContext(url);
      if (!source) {
        return NextResponse.json(
          { error: "Could not read content from that URL" },
          { status: 422 },
        );
      }
    }

    const prompt = `You are extracting structured fields from a B2B case study.

Source content:
"""
${source.slice(0, 6000)}
"""

Extract the following:
- brand: the customer's brand name (the company the case study is about)
- domain: the customer's website domain if mentioned (e.g., notion.so), otherwise an empty string
- outcome: a single short sentence describing the headline outcome they achieved with a specific number or timeline. Examples: "rebuilt the finance stack in 14 days" | "cut close cycle from 8 days to 2" | "saved $250k annually on vendor consolidation". Make it past tense, third person, no quotes.
- customerName: the named customer / champion / decision maker featured. If multiple, pick the most senior finance or business leader. Empty string if none named.
- customerTitle: their role / title at the company. Empty string if not mentioned.

Return ONLY valid JSON matching the schema. No commentary.`;

    const model = client.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.4,
        maxOutputTokens: 600,
      },
    });

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start < 0 || end < 0) {
      return NextResponse.json(
        { error: "Could not parse a case study from that content" },
        { status: 422 },
      );
    }

    const parsed = JSON.parse(text.slice(start, end + 1));
    return NextResponse.json(parsed);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
