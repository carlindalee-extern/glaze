import FirecrawlApp from "@mendable/firecrawl-js";

export type BrandKit = {
  productName: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  backgroundColor: string;
  fontFamily: string;
  borderRadius: string;
  logoUrl: string | null;
  faviconUrl: string | null;
  tagline: string;
  description: string;
  voiceSamples: string[];
  sourceUrl: string;
};

const fc = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY ?? "" });

export async function extractBrand(productUrl: string): Promise<BrandKit> {
  const res: any = await fc.scrapeUrl(productUrl, {
    formats: ["branding", "markdown"] as any,
    onlyMainContent: false,
  });

  const branding = res?.branding ?? {};
  const metadata = res?.metadata ?? {};
  const markdown: string = res?.markdown ?? "";

  const colors = branding?.colors ?? {};
  const typography = branding?.typography ?? {};
  const images = branding?.images ?? {};
  const spacing = branding?.spacing ?? {};

  const productName = guessProductName(metadata, productUrl);
  const tagline = (metadata?.title ?? "").split("|").slice(-1)[0]?.trim() || metadata?.title || "";
  const description = metadata?.description ?? metadata?.ogDescription ?? "";
  const voiceSamples = extractVoiceSamples(markdown).slice(0, 8);

  return {
    productName,
    primaryColor: colors.primary ?? "#0667D9",
    secondaryColor: colors.secondary ?? "#DAD4C8",
    accentColor: colors.accent ?? "#EEE9DF",
    textColor: colors.textPrimary ?? "#0A0A0A",
    backgroundColor: colors.background ?? "#FFFFFF",
    fontFamily: typography?.fontFamilies?.primary ?? "Inter",
    borderRadius: spacing?.borderRadius ?? "11px",
    logoUrl: images?.logo ?? null,
    faviconUrl: images?.favicon ?? null,
    tagline,
    description,
    voiceSamples,
    sourceUrl: productUrl,
  };
}

export async function extractCompanyContext(companyUrl: string): Promise<string> {
  try {
    const res: any = await fc.scrapeUrl(companyUrl, {
      formats: ["markdown"] as any,
      onlyMainContent: true,
    });

    const metadata = res?.metadata ?? {};
    const markdown: string = res?.markdown ?? "";

    const title = metadata?.title ?? metadata?.ogTitle ?? "";
    const description =
      metadata?.description ?? metadata?.ogDescription ?? "";

    const headlines = markdown
      .split("\n")
      .map((line) =>
        line
          .replace(/!\[.*?\]\(.*?\)/g, "")
          .replace(/\[.*?\]\(.*?\)/g, "")
          .replace(/[#*_>`]/g, "")
          .replace(/\\\\/g, "")
          .trim(),
      )
      .filter((line) => {
        if (!line) return false;
        if (line.length < 25 || line.length > 280) return false;
        const wordCount = line.split(/\s+/).length;
        return wordCount >= 5 && wordCount <= 40;
      })
      .slice(0, 8);

    const summary = [
      title ? `Title: ${title}` : null,
      description ? `Description: ${description}` : null,
      headlines.length ? `Key lines from their site:\n${headlines.map((h) => `- ${h}`).join("\n")}` : null,
    ]
      .filter(Boolean)
      .join("\n\n");

    return summary || "";
  } catch (err) {
    return "";
  }
}

function guessProductName(metadata: any, productUrl: string): string {
  const ogTitle: string = metadata?.ogTitle ?? metadata?.title ?? "";
  const before = ogTitle.split("|")[0]?.trim();
  if (before) return before;
  try {
    const host = new URL(productUrl).hostname.replace(/^www\./, "");
    const root = host.split(".")[0];
    return root.charAt(0).toUpperCase() + root.slice(1);
  } catch {
    return "the product";
  }
}

function extractVoiceSamples(markdown: string): string[] {
  if (!markdown) return [];
  return markdown
    .split("\n")
    .map((line) =>
      line
        .replace(/!\[.*?\]\(.*?\)/g, "")
        .replace(/\[.*?\]\(.*?\)/g, "")
        .replace(/\\\\/g, "")
        .replace(/[#*_>`]/g, "")
        .trim(),
    )
    .filter((line) => {
      if (!line) return false;
      if (line.length < 20 || line.length > 220) return false;
      if (/^[A-Z\s]+$/.test(line)) return false;
      if (/^\d+$/.test(line)) return false;
      const wordCount = line.split(/\s+/).length;
      return wordCount >= 4 && wordCount <= 30;
    });
}
