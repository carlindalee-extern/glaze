import type { BrandKit } from "@/lib/firecrawl";
import type { PageCopy } from "@/lib/prompt";

export function ValueProps({
  copy,
  brand,
}: {
  copy: PageCopy;
  brand: BrandKit;
}) {
  return (
    <section
      className="px-6 py-14 md:py-20"
      style={{ background: brand.backgroundColor }}
    >
      <div className="max-w-page mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {copy.valueProps.map((vp, i) => (
            <div
              key={i}
              className="rounded-card p-7"
              style={{
                background: brand.secondaryColor,
              }}
            >
              <h3
                className="text-h2 mb-3 leading-[1.15]"
                style={{ color: brand.textColor }}
              >
                {vp.title}
              </h3>
              <p
                className="text-body"
                style={{ color: brand.textColor, opacity: 0.78 }}
              >
                {vp.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
