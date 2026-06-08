"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GlazeLogo } from "@/components/GlazeLogo";
import {
  CASE_STUDIES,
  findCaseStudy,
  type CaseStudyEntry,
} from "@/lib/caseStudies";

export default function Home() {
  const [productUrl, setProductUrl] = useState("");
  const [senderName, setSenderName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [company, setCompany] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [title, setTitle] = useState("");
  const [painPoint, setPainPoint] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [industry, setIndustry] = useState("");
  const [currentTool, setCurrentTool] = useState("");
  const [fundingRound, setFundingRound] = useState("");
  const [mutualConnection, setMutualConnection] = useState("");
  const [caseStudy, setCaseStudy] = useState("");
  const [caseStudyOutcome, setCaseStudyOutcome] = useState("");
  const [caseStudyLogoUrl, setCaseStudyLogoUrl] = useState("");
  const [connectionHeadshotUrl, setConnectionHeadshotUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showClayModal, setShowClayModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const saved = typeof window !== "undefined"
      ? window.localStorage.getItem("glaze.profile")
      : null;
    if (saved) {
      try {
        const profile = JSON.parse(saved);
        if (profile.senderName) setSenderName(profile.senderName);
        if (profile.productUrl) setProductUrl(profile.productUrl);
      } catch {}
    }
  }, []);

  function saveProfile() {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      "glaze.profile",
      JSON.stringify({ senderName, productUrl }),
    );
    setShowSettings(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const prospect: Record<string, string> = {
      firstName: firstName.trim(),
      company: company.trim(),
      title: title.trim(),
      painPoint: painPoint.trim(),
    };
    if (companyUrl.trim()) prospect.companyUrl = companyUrl.trim();
    if (industry.trim()) prospect.industry = industry.trim();
    if (currentTool.trim()) prospect.currentTool = currentTool.trim();
    if (fundingRound.trim()) prospect.fundingRound = fundingRound.trim();
    if (mutualConnection.trim())
      prospect.mutualConnection = mutualConnection.trim();
    if (caseStudy.trim()) prospect.caseStudy = caseStudy.trim();
    if (caseStudyOutcome.trim())
      prospect.caseStudyOutcome = caseStudyOutcome.trim();

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productUrl,
          senderName: senderName.trim(),
          prospect,
          caseStudyLogoUrl: caseStudyLogoUrl.trim() || undefined,
          connectionHeadshotUrl: connectionHeadshotUrl.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Generation failed");
      router.push(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setLoading(false);
    }
  }

  function loadSample() {
    setProductUrl("https://www.clay.com/");
    setSenderName("Carlinda");
    setFirstName("Maya");
    setCompany("Veo");
    setCompanyUrl("https://www.veo.com/");
    setTitle("CFO");
    setPainPoint(
      "Locking spend visibility before the next board cycle. Veo just raised a Series B and the finance team is still on Expensify, so receipts pile up and close cycle is dragging into week two.",
    );
    setIndustry("tech");
    setCurrentTool("Expensify");
    setFundingRound("Series B");
    setMutualConnection("Sarah Chen");
    setCaseStudy("Notion");
    setCaseStudyOutcome("rebuilt the finance stack in 14 days");
  }

  return (
    <div className="min-h-screen">
      <div className="bg-glaze-cream relative overflow-hidden">
        <DecorativeStones />
        <header className="px-6 pt-6 relative z-10">
          <div className="max-w-page mx-auto flex items-center justify-between">
            <GlazeLogo />
            <div className="flex items-center gap-4">
              <span className="section-label text-glaze-mute hidden md:inline">
                Inspired by Clay&apos;s ecosystem
              </span>
              <button
                type="button"
                onClick={() => setShowSettings(true)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill border border-glaze-beige bg-white text-small text-glaze-ink hover:bg-glaze-cream transition-colors"
                aria-label="Configure your brand"
              >
                <SettingsIcon />
                Configure your brand
              </button>
            </div>
          </div>
        </header>

        <section className="px-6 pt-16 pb-20 md:pt-24 md:pb-28 relative z-10">
          <div className="max-w-content mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-white border border-glaze-beige mb-8">
              <span className="w-2 h-2 rounded-full bg-glaze-blue" />
              <span className="text-small text-glaze-ink font-medium">
                A 1:1 landing page for every prospect
              </span>
            </div>
            <h1 className="text-display-2 md:text-display-1 text-glaze-ink mb-6 tracking-tight">
              Glaze every prospect.
            </h1>
            <p className="text-h2 text-glaze-mute max-w-prose mx-auto mb-2">
              Tell us your product, your prospect, and what you&apos;re solving
              for them. We&apos;ll spin up a landing page they&apos;ll actually
              open.
            </p>
            <p className="text-body text-glaze-mute mt-6 italic">
              Your cold message gets the open. Glaze makes it click.
            </p>
          </div>
        </section>
      </div>

      <section className="px-6 py-16 md:py-24 bg-white">
        <div className="max-w-content mx-auto">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-3">
            <div>
              <p className="section-label mb-2 text-glaze-mute">Step 1</p>
              <h2 className="text-h1 text-glaze-ink">Cast a page.</h2>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setShowClayModal(true)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill border border-glaze-beige bg-white text-small text-glaze-ink hover:bg-glaze-cream transition-colors"
              >
                <ClayMarkIcon />
                Import from Clay
              </button>
              <button
                type="button"
                onClick={loadSample}
                className="text-small text-glaze-blue underline-offset-4 hover:underline"
              >
                Load sample data
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="card-cream space-y-5">
              <p className="section-label text-glaze-blue">Your product</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="senderName">Your name</label>
                  <input
                    id="senderName"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Carlinda"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="productUrl">Product website</label>
                  <input
                    id="productUrl"
                    type="url"
                    value={productUrl}
                    onChange={(e) => setProductUrl(e.target.value)}
                    placeholder="https://yourproduct.com"
                    required
                  />
                </div>
              </div>
              <p className="text-small text-glaze-mute">
                We pull your brand colors, fonts, and voice from your site so
                the page looks like yours, signed by you.
              </p>
            </div>

            <div className="card space-y-5">
              <p className="section-label text-glaze-ink/70">Your prospect</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="firstName">First name</label>
                  <input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Maya"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Veo"
                  />
                </div>
                <div>
                  <label htmlFor="title">Role / title</label>
                  <input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="CFO"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="companyUrl">Their company website</label>
                <p className="text-small text-glaze-mute mb-3">
                  Optional. Glaze reads their site to map your product against
                  what they actually do.
                </p>
                <input
                  id="companyUrl"
                  type="url"
                  value={companyUrl}
                  onChange={(e) => setCompanyUrl(e.target.value)}
                  placeholder="https://veo.com"
                />
              </div>
            </div>

            <div
              className="space-y-5 rounded-card p-7"
              style={{
                background:
                  "linear-gradient(135deg, #EEE9DF 0%, #DAD4C8 100%)",
              }}
            >
              <p className="section-label text-glaze-blue">The opportunity</p>
              <div>
                <label htmlFor="painPoint">
                  What are you solving for them?
                </label>
                <p className="text-small text-glaze-mute mb-3">
                  The pain point or opportunity. The whole page is built around
                  this. Be specific.
                </p>
                <textarea
                  id="painPoint"
                  value={painPoint}
                  onChange={(e) => setPainPoint(e.target.value)}
                  placeholder="e.g. Locking spend visibility before the next board cycle. They just raised a Series B and are still on Expensify, so receipts pile up and close cycle drags."
                  rows={5}
                  required
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-small text-glaze-mute hover:text-glaze-ink flex items-center gap-2"
              >
                <span>{showAdvanced ? "−" : "+"}</span>
                Extra context (optional, but better personalization)
              </button>

              {showAdvanced && (
                <div className="mt-5 card space-y-5">
                  <div>
                    <label>
                      Featured case study
                      <span className="text-small text-glaze-mute font-normal ml-2">
                        (picking one auto-fills the rest below)
                      </span>
                    </label>
                    <CaseStudyPicker
                      value={caseStudy}
                      onPick={(entry) => {
                        setCaseStudy(entry.brand);
                        setCaseStudyOutcome(entry.outcome);
                        setMutualConnection(entry.connectionName || "");
                        setCaseStudyLogoUrl(entry.logoUrl);
                        const headshot = entry.headshotImg
                          ? `https://i.pravatar.cc/300?img=${entry.headshotImg}`
                          : entry.headshotSeed
                            ? `https://i.pravatar.cc/300?u=${encodeURIComponent(entry.headshotSeed)}`
                            : "";
                        setConnectionHeadshotUrl(headshot);
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="industry">Industry</label>
                      <input
                        id="industry"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        placeholder="tech / consumer goods / marketing agency"
                      />
                    </div>
                    <div>
                      <label htmlFor="currentTool">
                        What they use today
                        <span className="text-small text-glaze-mute font-normal ml-2">
                          (the tool you&apos;d replace)
                        </span>
                      </label>
                      <input
                        id="currentTool"
                        value={currentTool}
                        onChange={(e) => setCurrentTool(e.target.value)}
                        placeholder="Expensify, Concur, NetSuite..."
                      />
                    </div>
                    <div>
                      <label htmlFor="fundingRound">Funding round</label>
                      <input
                        id="fundingRound"
                        value={fundingRound}
                        onChange={(e) => setFundingRound(e.target.value)}
                        placeholder="Series B"
                      />
                    </div>
                    <div>
                      <label htmlFor="mutualConnection">
                        Case study persona
                        <span className="text-small text-glaze-mute font-normal ml-2">
                          (the customer to feature by name)
                        </span>
                      </label>
                      <input
                        id="mutualConnection"
                        value={mutualConnection}
                        onChange={(e) => setMutualConnection(e.target.value)}
                        placeholder="Sarah Chen"
                      />
                    </div>
                    <div>
                      <label htmlFor="caseStudyOutcome">
                        Case study outcome
                      </label>
                      <input
                        id="caseStudyOutcome"
                        value={caseStudyOutcome}
                        onChange={(e) => setCaseStudyOutcome(e.target.value)}
                        placeholder="rebuilt the finance stack in 14 days"
                      />
                    </div>
                    <div>
                      <label htmlFor="caseStudyLogoUrl">
                        Customer logo URL
                        <span className="text-small text-glaze-mute font-normal ml-2">
                          (auto from library, paste to override)
                        </span>
                      </label>
                      <input
                        id="caseStudyLogoUrl"
                        type="url"
                        value={caseStudyLogoUrl}
                        onChange={(e) => setCaseStudyLogoUrl(e.target.value)}
                        placeholder="https://..."
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="connectionHeadshotUrl">
                        Customer headshot URL
                        <span className="text-small text-glaze-mute font-normal ml-2">
                          (paste any image URL)
                        </span>
                      </label>
                      <input
                        id="connectionHeadshotUrl"
                        type="url"
                        value={connectionHeadshotUrl}
                        onChange={(e) =>
                          setConnectionHeadshotUrl(e.target.value)
                        }
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div
                className="rounded-card p-5 text-small"
                style={{ background: "#FFE9E1", color: "#7A1F0E" }}
              >
                {error}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4">
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Glazing..." : "Glaze the page"}
              </button>
              <span className="text-small text-glaze-mute">
                10-15 seconds to generate.
              </span>
            </div>
          </form>
        </div>
      </section>

      <section className="px-6 py-16 md:py-24 bg-glaze-ink">
        <div className="max-w-page mx-auto">
          <p className="section-label text-white/60 mb-3">The three steps</p>
          <h2 className="text-h1 text-white mb-10 max-w-content">
            From clay to glaze, in under a minute.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className="rounded-card p-7"
              style={{ background: "#0667D9" }}
            >
              <p className="section-label mb-4 text-white/70">01 · Cast</p>
              <p className="text-h2 text-white mb-3 leading-[1.15]">
                Your brand,
                <br />
                their world.
              </p>
              <p className="text-body text-white/85">
                We pull your product&apos;s colors, type, and voice. The page
                looks like an extension of your site, shaped for one prospect.
              </p>
            </div>
            <div
              className="rounded-card p-7"
              style={{ background: "#E8497B", color: "#FFFFFF" }}
            >
              <p className="section-label mb-4 text-white/70">02 · Glaze</p>
              <p className="text-h2 mb-3 leading-[1.15]">
                Pain point
                <br />
                first.
              </p>
              <p className="text-body text-white/90">
                Every section orbits the specific opportunity you&apos;re
                solving for them. No generic copy. No filler.
              </p>
            </div>
            <div
              className="rounded-card p-7"
              style={{ background: "#3D8B58", color: "#FFFFFF" }}
            >
              <p className="section-label mb-4 text-white/70">03 · Fire</p>
              <p className="text-h2 mb-3 leading-[1.15]">
                &quot;Hey, I&apos;ve got something for you.&quot;
              </p>
              <p className="text-body text-white/90">
                Drop the URL into your InMail or email. They open a page that
                speaks to them, by name, from you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {showClayModal && (
        <ClayImportModal
          onClose={() => setShowClayModal(false)}
          onPaste={(parsed) => {
            if (parsed.firstName) setFirstName(parsed.firstName);
            if (parsed.company) setCompany(parsed.company);
            if (parsed.companyUrl) setCompanyUrl(parsed.companyUrl);
            if (parsed.title) setTitle(parsed.title);
            if (parsed.painPoint) setPainPoint(parsed.painPoint);
            if (parsed.industry) setIndustry(parsed.industry);
            if (parsed.currentTool) setCurrentTool(parsed.currentTool);
            if (parsed.fundingRound) setFundingRound(parsed.fundingRound);
            if (parsed.mutualConnection)
              setMutualConnection(parsed.mutualConnection);
            if (parsed.caseStudy) setCaseStudy(parsed.caseStudy);
            if (parsed.caseStudyOutcome)
              setCaseStudyOutcome(parsed.caseStudyOutcome);
            setShowClayModal(false);
          }}
        />
      )}

      {loading && <GlazingOverlay firstName={firstName} />}

      {showSettings && (
        <SettingsModal
          senderName={senderName}
          productUrl={productUrl}
          onSenderNameChange={setSenderName}
          onProductUrlChange={setProductUrl}
          onSave={saveProfile}
          onClose={() => setShowSettings(false)}
        />
      )}

      <footer className="px-6 py-10 border-t border-glaze-beige bg-white">
        <div className="max-w-page mx-auto flex items-center justify-between flex-wrap gap-3">
          <GlazeLogo size="small" />
          <p className="text-small text-glaze-mute">
            Built with Firecrawl + Gemini. Inspired by Clay.
          </p>
        </div>
      </footer>
    </div>
  );
}

function CaseStudyPicker({
  value,
  onPick,
}: {
  value: string;
  onPick: (entry: CaseStudyEntry) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = CASE_STUDIES.filter((cs) =>
    cs.brand.toLowerCase().includes(query.toLowerCase()),
  );

  const selected = CASE_STUDIES.find((cs) => cs.brand === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-4 py-[14px] rounded-card border border-[#E5E5E5] bg-white text-left hover:border-glaze-ink/30 transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          {selected ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selected.logoUrl}
                alt={selected.brand}
                className="w-6 h-6 object-contain flex-shrink-0"
                onError={(e) =>
                  ((e.currentTarget as HTMLImageElement).style.visibility =
                    "hidden")
                }
              />
              <span className="text-body text-glaze-ink truncate">
                {selected.brand}
              </span>
              <span className="text-small text-glaze-mute truncate hidden sm:inline">
                · {selected.outcome}
              </span>
            </>
          ) : (
            <span className="text-body text-glaze-mute">
              Pick a case study from your library ({CASE_STUDIES.length})
            </span>
          )}
        </div>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-glaze-mute flex-shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => {
              setOpen(false);
              setQuery("");
            }}
          />
          <div className="absolute top-full left-0 right-0 mt-2 z-40 bg-white rounded-card border border-glaze-beige shadow-xl max-h-[360px] overflow-hidden flex flex-col">
            <div className="p-2 border-b border-glaze-beige">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${CASE_STUDIES.length} case studies...`}
                className="text-small"
              />
            </div>
            <div className="overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="text-small text-glaze-mute italic p-4 text-center">
                  No matches.
                </p>
              ) : (
                filtered.map((cs) => (
                  <button
                    key={cs.brand}
                    type="button"
                    onClick={() => {
                      onPick(cs);
                      setOpen(false);
                      setQuery("");
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-glaze-cream transition-colors"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cs.logoUrl}
                      alt={cs.brand}
                      className="w-7 h-7 object-contain flex-shrink-0"
                      onError={(e) =>
                        ((e.currentTarget as HTMLImageElement).style.visibility =
                          "hidden")
                      }
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-body font-medium text-glaze-ink truncate">
                        {cs.brand}
                      </p>
                      <p className="text-small text-glaze-mute truncate">
                        {cs.outcome}
                      </p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function SettingsIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5h.1a1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
    </svg>
  );
}

function SettingsModal({
  senderName,
  productUrl,
  onSenderNameChange,
  onProductUrlChange,
  onSave,
  onClose,
}: {
  senderName: string;
  productUrl: string;
  onSenderNameChange: (v: string) => void;
  onProductUrlChange: (v: string) => void;
  onSave: () => void;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<"defaults" | "casestudies">("defaults");

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-glaze-ink/60"
        onClick={onClose}
        aria-hidden
      />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="min-h-full flex items-start justify-center p-4 md:p-10">
          <div
            className="relative max-w-[640px] w-full bg-white rounded-card p-8 md:p-10 shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="section-label text-glaze-blue mb-2">
              Configure your brand
            </p>
            <h3 className="text-h1 text-glaze-ink leading-[1.1] mb-6">
              Your studio.
            </h3>

        <div className="flex items-center gap-1 mb-6 p-1 bg-glaze-cream rounded-pill w-fit">
          <button
            type="button"
            onClick={() => setTab("defaults")}
            className={`px-4 py-1.5 rounded-pill text-small font-medium transition-colors ${
              tab === "defaults"
                ? "bg-white text-glaze-ink"
                : "text-glaze-mute hover:text-glaze-ink"
            }`}
          >
            Defaults
          </button>
          <button
            type="button"
            onClick={() => setTab("casestudies")}
            className={`px-4 py-1.5 rounded-pill text-small font-medium transition-colors ${
              tab === "casestudies"
                ? "bg-white text-glaze-ink"
                : "text-glaze-mute hover:text-glaze-ink"
            }`}
          >
            Case studies ({CASE_STUDIES.length})
          </button>
        </div>

        {tab === "defaults" && (
          <div className="space-y-5">
            <p className="text-body text-glaze-mute mb-2">
              Save your name and product URL once. Glaze remembers them next
              time.
            </p>
            <div>
              <label htmlFor="settings-name">Your name</label>
              <input
                id="settings-name"
                value={senderName}
                onChange={(e) => onSenderNameChange(e.target.value)}
                placeholder="Carlinda"
              />
            </div>
            <div>
              <label htmlFor="settings-product">Product website</label>
              <input
                id="settings-product"
                type="url"
                value={productUrl}
                onChange={(e) => onProductUrlChange(e.target.value)}
                placeholder="https://yourproduct.com"
              />
            </div>
          </div>
        )}

        {tab === "casestudies" && <CaseStudyManager />}

        <p className="text-small text-glaze-mute italic mt-6 pt-6 border-t border-glaze-beige">
          More fields are still on the wheel. The clay&apos;s wet, we&apos;re
          shaping fast.
        </p>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button type="button" onClick={onClose} className="btn-secondary">
                Cancel
              </button>
              <button type="button" onClick={onSave} className="btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CaseStudyManager() {
  const [custom, setCustom] = useState<CaseStudyEntry[]>([]);
  const [adding, setAdding] = useState(false);
  const [parseUrl, setParseUrl] = useState("");
  const [parsing, setParsing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [draft, setDraft] = useState({
    brand: "",
    outcome: "",
    logoUrl: "",
    customerName: "",
    customerTitle: "",
    headshotUrl: "",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("glaze.customCaseStudies");
    if (saved) {
      try {
        setCustom(JSON.parse(saved));
      } catch {}
    }
  }, []);

  function saveCustom(next: CaseStudyEntry[]) {
    setCustom(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "glaze.customCaseStudies",
        JSON.stringify(next),
      );
    }
  }

  function handleAdd() {
    if (!draft.brand.trim() || !draft.outcome.trim()) return;
    const slug = draft.brand.toLowerCase().replace(/[^a-z0-9]/g, "");
    const entry: CaseStudyEntry = {
      brand: draft.brand.trim(),
      industry: "tech",
      outcome: draft.outcome.trim(),
      domain: slug + ".com",
      logoUrl:
        draft.logoUrl.trim() || `https://cdn.simpleicons.org/${slug}/0A0A0A`,
      connectionName: draft.customerName.trim() || undefined,
      connectionRole: draft.customerTitle.trim() || undefined,
      headshotSeed: draft.headshotUrl.trim() || slug,
    };
    saveCustom([...custom, entry]);
    setDraft({
      brand: "",
      outcome: "",
      logoUrl: "",
      customerName: "",
      customerTitle: "",
      headshotUrl: "",
    });
    setAdding(false);
  }

  function handleRemove(index: number) {
    saveCustom(custom.filter((_, i) => i !== index));
  }

  async function handleParse() {
    if (!parseUrl.trim()) return;
    setParsing(true);
    setParseError(null);
    try {
      const res = await fetch("/api/parse-case-study", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: parseUrl.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Parsing failed");
      setDraft({
        brand: data.brand || "",
        outcome: data.outcome || "",
        logoUrl: data.domain
          ? `https://cdn.simpleicons.org/${data.brand.toLowerCase().replace(/[^a-z0-9]/g, "")}/0A0A0A`
          : "",
        customerName: data.customerName || "",
        customerTitle: data.customerTitle || "",
        headshotUrl: "",
      });
      setAdding(true);
      setParseUrl("");
    } catch (err) {
      setParseError(err instanceof Error ? err.message : "Parse error");
    } finally {
      setParsing(false);
    }
  }

  return (
    <div className="space-y-5">
      <p className="text-body text-glaze-mute">
        Your library auto-fills the case study picker when you build a page.
        Add your own brands with their logo, outcome, and contact.
      </p>

      {custom.length > 0 && (
        <div className="space-y-2">
          <p className="section-label text-glaze-ink/60">Your custom brands</p>
          {custom.map((cs, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-card bg-glaze-cream"
            >
              {cs.logoUrl && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={cs.logoUrl}
                  alt={cs.brand}
                  className="w-8 h-8 rounded-card object-contain bg-white p-1"
                  onError={(e) =>
                    ((e.currentTarget as HTMLImageElement).style.display =
                      "none")
                  }
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-body font-medium text-glaze-ink truncate">
                  {cs.brand}
                </p>
                <p className="text-small text-glaze-mute truncate">
                  {cs.outcome}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(i)}
                className="text-small text-glaze-mute hover:text-glaze-ink"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <p className="section-label text-glaze-ink/60">
          Pre-loaded ({CASE_STUDIES.length})
        </p>
        <div className="max-h-48 overflow-y-auto space-y-1 pr-2">
          {CASE_STUDIES.slice(0, 8).map((cs) => (
            <div
              key={cs.brand}
              className="flex items-center gap-3 px-3 py-2 rounded-card hover:bg-glaze-cream/50 transition-colors"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cs.logoUrl}
                alt={cs.brand}
                className="w-6 h-6 rounded object-contain"
                onError={(e) =>
                  ((e.currentTarget as HTMLImageElement).style.display = "none")
                }
              />
              <div className="flex-1 min-w-0">
                <p className="text-small font-medium text-glaze-ink truncate">
                  {cs.brand}
                </p>
                <p className="text-small text-glaze-mute truncate">
                  {cs.outcome}
                </p>
              </div>
            </div>
          ))}
          <p className="text-small text-glaze-mute italic px-3 pt-1">
            + {CASE_STUDIES.length - 8} more in the library
          </p>
        </div>
      </div>

      {adding ? (
        <div className="space-y-4 p-5 bg-glaze-cream rounded-card">
          <div>
            <label className="text-small">Customer brand</label>
            <input
              placeholder="e.g. Notion"
              value={draft.brand}
              onChange={(e) => setDraft({ ...draft, brand: e.target.value })}
            />
          </div>
          <div>
            <label className="text-small">What they achieved</label>
            <input
              placeholder="e.g. cut close cycle from 8 days to 2"
              value={draft.outcome}
              onChange={(e) => setDraft({ ...draft, outcome: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-small">Customer name</label>
              <input
                placeholder="The person to feature (e.g. Sarah Chen)"
                value={draft.customerName}
                onChange={(e) =>
                  setDraft({ ...draft, customerName: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-small">Their title</label>
              <input
                placeholder="e.g. VP of Finance"
                value={draft.customerTitle}
                onChange={(e) =>
                  setDraft({ ...draft, customerTitle: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-small">Customer logo URL</label>
              <input
                placeholder="Paste a transparent PNG/SVG"
                value={draft.logoUrl}
                onChange={(e) =>
                  setDraft({ ...draft, logoUrl: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-small">Customer photo URL</label>
              <input
                placeholder="Paste a headshot URL"
                value={draft.headshotUrl}
                onChange={(e) =>
                  setDraft({ ...draft, headshotUrl: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={handleAdd} className="btn-primary">
              Add to library
            </button>
            <button
              type="button"
              onClick={() => setAdding(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div
            className="p-5 rounded-card"
            style={{
              background:
                "linear-gradient(135deg, #EEE9DF 0%, #DAD4C8 100%)",
            }}
          >
            <p className="section-label text-glaze-blue mb-2">
              Have a case study somewhere?
            </p>
            <p className="text-small text-glaze-mute mb-3">
              Paste any link — your customer story page, a Notion doc, a Google
              Drive share, a Loom recap. We&apos;ll read it and fill the form
              for you.
            </p>
            <div className="flex flex-col md:flex-row gap-2">
              <input
                type="url"
                value={parseUrl}
                onChange={(e) => setParseUrl(e.target.value)}
                placeholder="Paste any URL"
                className="flex-1"
              />
              <button
                type="button"
                onClick={handleParse}
                disabled={parsing || !parseUrl.trim()}
                className="btn-primary whitespace-nowrap"
              >
                {parsing ? "Reading..." : "Parse it"}
              </button>
            </div>
            {parseError && (
              <p className="text-small mt-3" style={{ color: "#7A1F0E" }}>
                {parseError}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="btn-secondary w-full"
          >
            + Add a case study manually
          </button>
        </div>
      )}
    </div>
  );
}

function GlazingOverlay({ firstName }: { firstName: string }) {
  const stages = [
    "Wedging your brand...",
    "Reading their site...",
    "Casting the page...",
    "Pouring the glaze...",
    "Firing the kiln...",
  ];
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStage((s) => Math.min(s + 1, stages.length - 1));
    }, 2400);
    return () => clearInterval(id);
  }, []);

  const audience = firstName || "your prospect";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{
        background:
          "radial-gradient(ellipse at center, #EEE9DF 0%, #DAD4C8 100%)",
      }}
    >
      <DecorativeStones />
      <div className="relative z-10 text-center max-w-prose">
        <div className="flex justify-center mb-10">
          <GlazingPot />
        </div>
        <p className="section-label text-glaze-blue mb-4">In the kiln</p>
        <h2 className="text-display-2 text-glaze-ink mb-6 leading-[1.05]">
          Glazing a page for {audience}.
        </h2>
        <p
          key={stage}
          className="text-h2 text-glaze-mute animate-glaze-fade-in"
        >
          {stages[stage]}
        </p>
      </div>
    </div>
  );
}

function GlazingPot() {
  return (
    <svg width="140" height="160" viewBox="0 0 140 160" aria-hidden>
      <defs>
        <linearGradient id="pot-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D67D4C" />
          <stop offset="100%" stopColor="#A6552B" />
        </linearGradient>
        <linearGradient id="glaze-drop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9CC4F0" />
          <stop offset="100%" stopColor="#0667D9" />
        </linearGradient>
      </defs>

      <g className="animate-glaze-wobble">
        <ellipse cx="70" cy="140" rx="44" ry="6" fill="#0A0A0A" opacity="0.12" />
        <path
          d="M30 70 Q 30 50 70 50 Q 110 50 110 70 L 110 120 Q 110 140 70 140 Q 30 140 30 120 Z"
          fill="url(#pot-body)"
        />
        <ellipse cx="70" cy="50" rx="40" ry="8" fill="#7A3A1A" />
        <path
          d="M30 70 Q 70 88 110 70 L 110 78 Q 70 96 30 78 Z"
          fill="url(#glaze-drop)"
          opacity="0.95"
        />
      </g>

      <circle
        cx="55"
        cy="40"
        r="4"
        fill="url(#glaze-drop)"
        className="animate-glaze-drip-1"
      />
      <circle
        cx="70"
        cy="42"
        r="3.5"
        fill="url(#glaze-drop)"
        className="animate-glaze-drip-2"
      />
      <circle
        cx="86"
        cy="38"
        r="4"
        fill="url(#glaze-drop)"
        className="animate-glaze-drip-3"
      />
    </svg>
  );
}

function DecorativeStones() {
  return (
    <>
      <svg
        className="absolute -left-12 bottom-2 md:left-4 md:bottom-6 w-32 md:w-48 opacity-90 pointer-events-none"
        viewBox="0 0 200 220"
        aria-hidden
      >
        <ellipse cx="100" cy="200" rx="78" ry="14" fill="#0A0A0A" opacity="0.06" />
        <ellipse cx="100" cy="180" rx="62" ry="18" fill="#D67D4C" />
        <ellipse cx="98" cy="150" rx="44" ry="22" fill="#3D8B58" />
        <ellipse cx="102" cy="116" rx="34" ry="20" fill="#FFD93D" />
        <ellipse cx="100" cy="86" rx="28" ry="16" fill="#E8497B" />
        <ellipse cx="100" cy="62" rx="20" ry="12" fill="#0667D9" />
        <ellipse cx="100" cy="44" rx="14" ry="9" fill="#9C6CD6" />
      </svg>
      <svg
        className="absolute -right-10 top-12 md:right-6 md:top-20 w-32 md:w-44 opacity-90 pointer-events-none"
        viewBox="0 0 200 220"
        aria-hidden
      >
        <ellipse cx="100" cy="200" rx="68" ry="12" fill="#0A0A0A" opacity="0.06" />
        <ellipse cx="100" cy="180" rx="52" ry="16" fill="#9C6CD6" />
        <ellipse cx="102" cy="152" rx="40" ry="18" fill="#0667D9" />
        <ellipse cx="98" cy="124" rx="32" ry="16" fill="#FFD93D" />
        <ellipse cx="100" cy="98" rx="24" ry="13" fill="#3D8B58" />
        <ellipse cx="100" cy="76" rx="16" ry="10" fill="#E8497B" />
      </svg>
    </>
  );
}

function ClayMarkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 32 32" aria-hidden>
      <defs>
        <linearGradient id="clay-arc" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="33%" stopColor="#FFD93D" />
          <stop offset="66%" stopColor="#6BCB77" />
          <stop offset="100%" stopColor="#4D96FF" />
        </linearGradient>
      </defs>
      <path
        d="M4 24 Q 4 8 16 8 Q 28 8 28 24 Z"
        fill="url(#clay-arc)"
      />
    </svg>
  );
}

function ClayImportModal({
  onClose,
  onPaste,
}: {
  onClose: () => void;
  onPaste: (parsed: Record<string, string>) => void;
}) {
  const [raw, setRaw] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleImport() {
    if (!raw.trim()) {
      setError("Paste a Clay row first.");
      return;
    }
    try {
      const cleaned = raw.trim();
      let parsed: Record<string, unknown> = {};

      if (cleaned.startsWith("{")) {
        parsed = JSON.parse(cleaned);
      } else if (cleaned.includes("\t")) {
        const lines = cleaned.split("\n").filter((l) => l.trim());
        if (lines.length >= 2) {
          const headers = lines[0].split("\t").map((h) => h.trim());
          const values = lines[1].split("\t").map((v) => v.trim());
          headers.forEach((h, i) => {
            if (values[i]) parsed[h] = values[i];
          });
        } else if (lines.length === 1) {
          throw new Error("TSV needs a header row + a data row");
        }
      } else {
        throw new Error("Paste JSON or TSV (with header row)");
      }

      const map: Record<string, string> = {};
      const getField = (...keys: string[]) => {
        for (const k of keys) {
          const v = parsed[k] ?? parsed[k.toLowerCase()];
          if (typeof v === "string" && v.trim()) return v.trim();
        }
        return "";
      };

      map.firstName = getField("firstName", "First Name", "first_name");
      map.company = getField("company", "Company Name", "Company");
      map.companyUrl = getField(
        "companyUrl",
        "Company Domain",
        "Company URL",
        "Website",
      );
      map.title = getField("title", "Job Title", "Title");
      map.industry = getField("industry", "Industry Bucket", "Industry");
      map.currentTool = getField(
        "currentTool",
        "Spend Management Tool",
        "Current Tool",
      );
      map.fundingRound = getField(
        "fundingRound",
        "Funding Round",
        "funding_round",
      );
      map.mutualConnection = getField(
        "mutualConnection",
        "mutual LinkedIn connection",
        "Mutual LinkedIn Connection",
      );
      map.caseStudy = getField("caseStudy", "Matched Case Study", "Case Study");
      map.caseStudyOutcome = getField(
        "caseStudyOutcome",
        "case_study_outcome",
        "Case Study Outcome",
      );
      map.painPoint = getField("painPoint", "Pain Point", "Opportunity");

      const filled = Object.fromEntries(
        Object.entries(map).filter(([, v]) => v),
      );
      if (Object.keys(filled).length === 0) {
        throw new Error(
          "Could not find any known fields. Make sure your headers match Clay's column names.",
        );
      }
      onPaste(filled);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not parse the row");
    }
  }

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-glaze-ink/60"
        onClick={onClose}
        aria-hidden
      />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="min-h-full flex items-start justify-center p-4 md:p-10">
          <div
            className="relative max-w-[640px] w-full bg-white rounded-card p-8 md:p-10 shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-card flex items-center justify-center bg-glaze-cream">
                  <ClayMarkIcon />
                </div>
              </div>
              <div className="flex-1">
                <p className="section-label text-glaze-blue mb-2">
                  Post-acquisition feature
                </p>
                <h3 className="text-h1 text-glaze-ink leading-[1.1] mb-3">
                  After Clay buys us.
                </h3>
                <p className="text-body text-glaze-mute mb-2">
                  Native Clay imports ship the day the acquisition closes.
                  (Yes, we&apos;re calling it now.)
                </p>
                <p className="text-body text-glaze-mute">
                  For now, paste a row from your Clay table below. We&apos;ll
                  map the fields and fill the form.
                </p>
              </div>
            </div>

            <div>
              <label htmlFor="clay-paste">Paste a row (JSON or TSV)</label>
              <textarea
                id="clay-paste"
                value={raw}
                onChange={(e) => setRaw(e.target.value)}
                rows={8}
                spellCheck={false}
                placeholder={`Paste JSON like {"First Name":"Maya","Company Name":"Veo","Job Title":"CFO",...} or tab-separated headers + values from Clay`}
                className="font-mono text-small"
              />
              {error && (
                <p className="text-small mt-3" style={{ color: "#7A1F0E" }}>
                  {error}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-glaze-beige">
              <button type="button" onClick={onClose} className="btn-secondary">
                Cancel
              </button>
              <button
                type="button"
                onClick={handleImport}
                className="btn-primary"
              >
                Fill the form
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
