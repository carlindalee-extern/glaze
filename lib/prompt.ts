import type { BrandKit } from "./firecrawl";

export type ProspectInput = {
  firstName: string;
  lastName?: string;
  title?: string;
  company?: string;
  companyUrl?: string;
  companyContext?: string;
  industry?: string;
  location?: string;
  painPoint: string;
  fundingRound?: string;
  fundingMonth?: string;
  fundingAmount?: string;
  currentTool?: string;
  recentPost?: string;
  mutualConnection?: string;
  caseStudy?: string;
  caseStudyOutcome?: string;
};

export type PageCopy = {
  heroHeadline: string;
  heroSubheadline: string;
  valueProps: { title: string; body: string }[];
  socialProof: string;
  ctaLabel: string;
  ctaTarget: string;
  trustLine: string;
};

export function buildCopyPrompt(brand: BrandKit, prospect: ProspectInput) {
  const voiceSamples = brand.voiceSamples.length
    ? brand.voiceSamples.slice(0, 6).map((s) => `- ${s}`).join("\n")
    : "- (none extracted; default to plain, confident, sentence-case voice)";

  const optional = (label: string, value: string | number | undefined | null) =>
    value !== undefined && value !== null && value !== ""
      ? `- ${label}: ${value}`
      : null;

  const prospectFacts = [
    `- First name: ${prospect.firstName || "there"}`,
    optional("Title", prospect.title),
    optional("Company", prospect.company),
    optional("Company website", prospect.companyUrl),
    optional("Industry", prospect.industry),
    optional("Location", prospect.location),
    optional("Funding round", prospect.fundingRound),
    optional("Funding month", prospect.fundingMonth),
    optional("Funding amount", prospect.fundingAmount),
    optional("Current tool", prospect.currentTool),
    optional("Recent LinkedIn post", prospect.recentPost),
    optional("Mutual LinkedIn connection", prospect.mutualConnection),
    optional("Matched case study brand", prospect.caseStudy),
    optional("Case study outcome", prospect.caseStudyOutcome),
  ]
    .filter(Boolean)
    .join("\n");

  const companyContextBlock = prospect.companyContext
    ? `\n==================\nTHE PROSPECT'S COMPANY (what they actually do, scraped from their site)\n==================\n\n${prospect.companyContext}\n\nUse this to show alignment: how does the seller's product map to what the prospect's company actually does? Reference specific things the prospect's company is working on. Don't generalize.`
    : "";

  return `You write personalized 1:1 sales landing pages for executives. Output ONLY valid JSON matching the schema. No prose, no markdown, no commentary.

==================
THE PRODUCT (brand to match)
==================

Product: ${brand.productName}
Tagline: ${brand.tagline}
Description: ${brand.description}
Source: ${brand.sourceUrl}

Brand voice samples (mirror this tone):
${voiceSamples}

==================
THE PROSPECT
==================

${prospectFacts}
${companyContextBlock}

==================
CRITICAL: HOW TO TREAT "Current tool"
==================

If the prospect has a Current tool listed, that tool is the COMPETITOR or LEGACY VENDOR the prospect is using TODAY. The sender's product is positioned to REPLACE or DISPLACE it.

REQUIRED framings: "switch from {currentTool}", "ditch {currentTool}", "the {currentTool} replacement", "displace {currentTool}", "what comes after {currentTool}".

BANNED framings (these are factually wrong because the tool is a competitor, not a partner):
- "integrates with {currentTool}"
- "syncs with {currentTool}"
- "works alongside {currentTool}"
- "plugs into {currentTool}"
- "complements {currentTool}"
- "pairs with {currentTool}"
- "extends {currentTool}"

If you mention the current tool, you must position the sender's product as the REPLACEMENT, not a friend.

==================
THE PAIN POINT / OPPORTUNITY (this is the center of the page)
==================

${prospect.painPoint}

The entire page exists to address this. Every section should orbit around it.

==================
WRITE THESE SECTIONS
==================

heroHeadline (max 11 words):
- MUST start with "Hey {firstName}!" followed by the hook
- Reference the pain point in the prospect's language, not the product's language
- Frame the page as a 1:1 gift from the sender: "Hey Maya! I've got something for your next board cycle." | "Hey James! Built this for the finance team you're scaling."
- The "I've got something for you" energy is the through-line

heroSubheadline (max 24 words):
- Explain what's on the page, in 1st person from the sender's voice ("I built this for you because...", "Here's what I pulled together...", "This is the playbook 3 peer CFOs ran...")
- Reference their company name and the pain point
- Peer-to-peer, like a fellow operator sent this to them

valueProps (exactly 3, each with title 3-5 words + body 14-22 words; count words, never under 14):
- Each one a different angle on solving the pain point
- Use the prospect's stage, tool, and company where useful
- Speak in their world's language (CFOs: cash, close cycle, working capital; CMOs: pipeline, attribution; CTOs: latency, uptime, etc.)
- At least ONE value prop body MUST cite a concrete fact from THE PROSPECT'S COMPANY block if present (product line, customer segment, business model, geography). Generic role-language alone is a fail.

socialProof (one sentence):
- If mutual connection exists: "Saw your connection {connection}'s company, {caseStudy}, just {outcome}."
- Else if case study exists: "{caseStudy}'s finance team {outcome}."
- Else default: "Stripe's finance team consolidated 9 tools into 1."

ctaLabel (3-6 words, named value):
- Never "Book a demo", "Contact sales", "Sign up"
- Examples: "Send me the playbook" | "Show me the projection" | "Get the rollout plan"

ctaTarget:
- Default: "mailto:hello@${brand.productName.toLowerCase().replace(/[^a-z0-9]/g, "")}.com?subject=${encodeURIComponent("Glaze - " + prospect.firstName)}"

trustLine (max 14 words):
- Bottom-of-page reassurance that applies to BOTH the meeting AND the resource
- Never single-channel ("15 minute read" only fits the resource, not the chat)
- Examples: "15 minutes either way. Built for your stack." | "Whichever you pick, no fluff." | "Pick either. 15 minutes max."

==================
VOICE RULES
==================

- Peer-to-peer, not vendor-to-buyer
- Mirror the brand voice samples above
- Sentence case in body, never title case
- Active voice. Contractions on.
- Cut hedges (just, really, maybe), filler (going forward, at this point), adverbs (quickly, seamlessly), throat-clearing
- Banned: "I hope this finds you well", "leverage" (verb), "streamline", "robust", "cutting-edge", "best-in-class", "synergy", "demo", "transformative", "revolutionary", "game-changing"
- No em-dashes, semicolons, ALL CAPS in body

==================
SPECIFICITY
==================

- Every section references at least one fact about the prospect (first name, company, role, stage, tool, or pain point)
- If THE PROSPECT'S COMPANY block exists, at least one valueProp body MUST cite a concrete fact from it (product line, customer segment, business model, geography). Generic role-language alone is a fail.
- If company, title, industry, AND currentTool are ALL missing, anchor every section to the painPoint verbatim. Do not invent a company, title, stage, or tool.
- The page must not be sendable to another prospect without changes
- Never fabricate. If a field is empty, write a graceful fallback that omits that detail

Return ONLY the JSON object. Nothing before or after.`;
}
