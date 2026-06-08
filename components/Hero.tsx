import type { BrandKit } from "@/lib/firecrawl";
import type { PageCopy } from "@/lib/prompt";

export function Hero({
  brand,
  copy,
  senderName,
}: {
  brand: BrandKit;
  copy: PageCopy;
  senderName: string;
}) {
  const fromLine = senderName
    ? `From ${senderName} at ${brand.productName}`
    : `From ${brand.productName}`;

  return (
    <section className="px-6 pt-16 pb-16 md:pt-24 md:pb-20">
      <div className="max-w-page mx-auto">
        <div className="max-w-content">
          <p className="text-small text-glaze-mute mb-8">{fromLine}</p>
          <h1
            className="text-display-2 md:text-display-1 mb-6 leading-[1.05]"
            style={{ color: "var(--brand-text, #0A0A0A)" }}
          >
            {copy.heroHeadline}
          </h1>
          <p
            className="text-h2 max-w-prose"
            style={{ color: "var(--brand-text, #0A0A0A)", opacity: 0.72 }}
          >
            {copy.heroSubheadline}
          </p>
        </div>
      </div>
    </section>
  );
}
