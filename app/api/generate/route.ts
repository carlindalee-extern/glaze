import { NextResponse } from "next/server";
import { extractBrand, extractCompanyContext } from "@/lib/firecrawl";
import { generateCopy } from "@/lib/llm";
import { savePage, makeSlug } from "@/lib/storage";
import type { ProspectInput } from "@/lib/prompt";
import {
  findCaseStudy,
  buildHeadshotUrl,
  buildHeadshotForPerson,
  buildPravatarFallback,
} from "@/lib/caseStudies";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const productUrl: string = body?.productUrl;
    const senderName: string = (body?.senderName || "").trim();
    const prospect: ProspectInput = body?.prospect;
    const overrideLogoUrl: string | undefined = body?.caseStudyLogoUrl;
    const overrideHeadshotUrl: string | undefined = body?.connectionHeadshotUrl;

    if (!productUrl) {
      return NextResponse.json({ error: "Missing productUrl" }, { status: 400 });
    }
    if (!prospect || !prospect.firstName) {
      return NextResponse.json(
        { error: "Missing prospect.firstName" },
        { status: 400 },
      );
    }
    if (!prospect.painPoint || !prospect.painPoint.trim()) {
      return NextResponse.json(
        { error: "Missing prospect.painPoint" },
        { status: 400 },
      );
    }

    const [brand, companyContext] = await Promise.all([
      extractBrand(productUrl),
      prospect.companyUrl
        ? extractCompanyContext(prospect.companyUrl)
        : Promise.resolve(""),
    ]);

    const enrichedProspect = {
      ...prospect,
      companyContext: companyContext || undefined,
    };

    const copy = await generateCopy(brand, enrichedProspect);
    const slug = makeSlug(prospect);

    const caseStudyMatch = prospect.caseStudy
      ? findCaseStudy(prospect.caseStudy)
      : undefined;
    const caseStudyLogoUrl =
      overrideLogoUrl || caseStudyMatch?.logoUrl || undefined;

    // Only show a headshot if it's a known case study AND we have a person name.
    // Build the URL from the actual person name (mutualConnection takes priority
    // over the case study's default connection name, so user-typed names like
    // "Sarah Chen" map to /headshots/sarah-chen.png, not the database default).
    const personName =
      prospect.mutualConnection || caseStudyMatch?.connectionName;
    const connectionHeadshotUrl =
      overrideHeadshotUrl ||
      (caseStudyMatch && personName
        ? buildHeadshotForPerson(personName)
        : undefined);
    const connectionHeadshotFallbackUrl =
      caseStudyMatch && personName
        ? buildPravatarFallback(caseStudyMatch)
        : undefined;

    await savePage({
      slug,
      createdAt: new Date().toISOString(),
      senderName: senderName || "your sales rep",
      caseStudyLogoUrl,
      connectionHeadshotUrl,
      connectionHeadshotFallbackUrl,
      brand,
      prospect: enrichedProspect,
      copy,
    });

    return NextResponse.json({ slug, url: `/p/${slug}` });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
