import type { BrandKit } from "@/lib/firecrawl";
import type { PageCopy } from "@/lib/prompt";

export function CTA({
  copy,
  senderName,
  brand,
  bookingUrl,
}: {
  copy: PageCopy;
  senderName: string;
  brand: BrandKit;
  bookingUrl?: string;
}) {
  const primaryHref =
    bookingUrl ||
    `mailto:?subject=${encodeURIComponent("Quick 15 minutes")}`;

  return (
    <section
      className="px-6 py-20 md:py-28"
      style={{ background: brand.textColor }}
    >
      <div className="max-w-page mx-auto">
        <div className="max-w-content mx-auto text-center">
          <h2
            className="text-display-2 mb-10 leading-[1.05]"
            style={{ color: brand.backgroundColor }}
          >
            {copy.ctaLabel}.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={primaryHref}
              className="inline-flex items-center justify-center px-7 py-4 rounded-btn font-medium text-base transition-opacity hover:opacity-90"
              style={{
                background: brand.primaryColor,
                color: brand.backgroundColor,
              }}
            >
              Book a chat with {senderName}
            </a>
            <a
              href={copy.ctaTarget}
              className="inline-flex items-center justify-center px-7 py-4 rounded-btn font-medium text-base border transition-colors"
              style={{
                color: brand.backgroundColor,
                borderColor: brand.backgroundColor,
                background: "transparent",
              }}
            >
              {copy.ctaLabel}
            </a>
          </div>
          {copy.trustLine && (
            <p
              className="text-small mt-8"
              style={{ color: brand.backgroundColor, opacity: 0.6 }}
            >
              {copy.trustLine}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
