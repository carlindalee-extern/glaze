"use client";

import { useState } from "react";
import type { BrandKit } from "@/lib/firecrawl";
import type { PageCopy } from "@/lib/prompt";

function isDark(hex: string): boolean {
  if (!hex) return false;
  const c = hex.replace("#", "");
  if (c.length < 6) return false;
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const lum = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
  return lum < 0.5;
}

function safeBackground(brand: BrandKit): string {
  const candidates = [brand.accentColor, brand.secondaryColor];
  for (const c of candidates) {
    if (c && !isDark(c)) return c;
  }
  return "#F4F1EB";
}

export function SocialProof({
  copy,
  brand,
  caseStudyBrand,
  caseStudyLogoUrl,
  caseStudyDomain,
  showCaseStudyLabel,
  connectionName,
  connectionRole,
  connectionHeadshotUrl,
  connectionHeadshotFallbackUrl,
}: {
  copy: PageCopy;
  brand: BrandKit;
  caseStudyBrand?: string;
  caseStudyLogoUrl?: string;
  caseStudyDomain?: string;
  showCaseStudyLabel?: boolean;
  connectionName?: string;
  connectionRole?: string;
  connectionHeadshotUrl?: string;
  connectionHeadshotFallbackUrl?: string;
}) {
  const sectionBg = safeBackground(brand);
  const sectionText = isDark(brand.textColor) ? brand.textColor : "#0A0A0A";

  return (
    <section
      className="px-6 py-16 md:py-24"
      style={{ background: sectionBg }}
    >
      <div className="max-w-page mx-auto">
        <div
          className="max-w-content rounded-card p-8 md:p-12"
          style={{
            background: "#FFFFFF",
            border: `1px solid ${brand.secondaryColor || "#E5E5E5"}`,
          }}
        >
          {caseStudyLogoUrl && (
            <div className="mb-8">
              <ProofImage
                src={caseStudyLogoUrl}
                alt={`${caseStudyBrand} logo`}
                className="h-10 w-auto max-w-[120px] object-contain"
                fallback={
                  caseStudyDomain
                    ? `https://logo.clearbit.com/${caseStudyDomain}`
                    : null
                }
              />
            </div>
          )}

          <p
            className="text-h1 leading-[1.2] mb-8"
            style={{ color: sectionText }}
          >
            {copy.socialProof}
          </p>

          {(connectionName || showCaseStudyLabel) && (
            <div
              className="flex items-center justify-between gap-4 pt-6 border-t"
              style={{ borderColor: brand.secondaryColor || "#E5E5E5" }}
            >
              {connectionName ? (
                <div className="flex items-center gap-4 min-w-0">
                  {connectionHeadshotUrl && (
                    <ProofImage
                      src={connectionHeadshotUrl}
                      alt={connectionName}
                      className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                      fallback={connectionHeadshotFallbackUrl || null}
                    />
                  )}
                  <div className="min-w-0">
                    <p
                      className="text-body font-medium leading-tight truncate"
                      style={{ color: sectionText }}
                    >
                      {connectionName}
                    </p>
                    {(connectionRole || caseStudyBrand) && (
                      <p
                        className="text-small leading-tight mt-0.5 truncate"
                        style={{ color: sectionText, opacity: 0.6 }}
                      >
                        {[connectionRole, caseStudyBrand]
                          .filter(Boolean)
                          .join(" at ")}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div />
              )}
              {showCaseStudyLabel && (
                <button
                  type="button"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-1.5 text-small font-medium hover:opacity-70 transition-opacity flex-shrink-0 bg-transparent border-0 p-0 cursor-pointer"
                  style={{ color: brand.primaryColor || "#0667D9" }}
                >
                  View case study
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ProofImage({
  src,
  alt,
  className,
  fallback,
}: {
  src: string;
  alt: string;
  className: string;
  fallback: string | null;
}) {
  const [current, setCurrent] = useState(src);
  const [hidden, setHidden] = useState(false);

  if (hidden) return null;

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={current}
      alt={alt}
      className={className}
      onError={() => {
        if (fallback && current !== fallback) {
          setCurrent(fallback);
        } else {
          setHidden(true);
        }
      }}
    />
  );
}
