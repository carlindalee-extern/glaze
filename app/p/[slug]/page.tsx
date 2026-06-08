import { notFound } from "next/navigation";
import { getPage } from "@/lib/storage";
import { Hero } from "@/components/Hero";
import { ValueProps } from "@/components/ValueProps";
import { SocialProof } from "@/components/SocialProof";
import { CTA } from "@/components/CTA";
import { GlazeLogo } from "@/components/GlazeLogo";
import { findCaseStudy } from "@/lib/caseStudies";

export const dynamic = "force-dynamic";

export default async function PersonalizedPage({
  params,
}: {
  params: { slug: string };
}) {
  const page = await getPage(params.slug);
  if (!page) notFound();

  const caseStudyEntry = page.prospect.caseStudy
    ? findCaseStudy(page.prospect.caseStudy)
    : undefined;

  const brand = page.brand;

  return (
    <div
      style={
        {
          "--brand-primary": brand.primaryColor,
          "--brand-secondary": brand.secondaryColor,
          "--brand-accent": brand.accentColor,
          "--brand-text": brand.textColor,
          "--brand-bg": brand.backgroundColor,
          background: brand.backgroundColor,
          color: brand.textColor,
          minHeight: "100vh",
        } as React.CSSProperties
      }
    >
      <header
        className="px-6 pt-6 pb-6"
        style={{ background: brand.backgroundColor }}
      >
        <div className="max-w-page mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {brand.logoUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={brand.logoUrl}
                alt={`${brand.productName} logo`}
                className="h-8 w-auto object-contain"
              />
            ) : (
              <span
                className="text-h2 font-medium"
                style={{ color: brand.textColor }}
              >
                {brand.productName}
              </span>
            )}
          </div>
          <span
            className="text-small hidden md:inline"
            style={{ color: brand.textColor, opacity: 0.55 }}
          >
            For {page.prospect.firstName}
            {page.prospect.company ? ` at ${page.prospect.company}` : ""}
          </span>
        </div>
      </header>

      <main>
        <Hero brand={brand} copy={page.copy} senderName={page.senderName} />
        <ValueProps copy={page.copy} brand={brand} />
        <SocialProof
          copy={page.copy}
          brand={brand}
          caseStudyBrand={page.prospect.caseStudy}
          caseStudyLogoUrl={page.caseStudyLogoUrl}
          caseStudyDomain={caseStudyEntry?.domain}
          showCaseStudyLabel={Boolean(caseStudyEntry)}
          connectionName={
            page.prospect.mutualConnection || caseStudyEntry?.connectionName
          }
          connectionRole={caseStudyEntry?.connectionRole}
          connectionHeadshotUrl={page.connectionHeadshotUrl}
          connectionHeadshotFallbackUrl={page.connectionHeadshotFallbackUrl}
        />
        <CTA copy={page.copy} senderName={page.senderName} brand={brand} />
      </main>

      <footer
        className="px-6 py-8 border-t"
        style={{
          borderColor: brand.secondaryColor,
          background: brand.backgroundColor,
        }}
      >
        <div className="max-w-page mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <GlazeLogo size="small" />
            <span
              className="text-small"
              style={{ color: brand.textColor, opacity: 0.55 }}
            >
              Glazed for {page.prospect.firstName} on{" "}
              {new Date(page.createdAt).toLocaleDateString(undefined, {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <a
            href={brand.sourceUrl}
            className="text-small hover:opacity-100 transition-opacity"
            style={{ color: brand.textColor, opacity: 0.55 }}
            target="_blank"
            rel="noreferrer"
          >
            Visit {brand.productName}
          </a>
        </div>
      </footer>
    </div>
  );
}
