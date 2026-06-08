export type CaseStudyEntry = {
  brand: string;
  industry: "tech" | "marketing agency" | "consumer goods";
  outcome: string;
  domain: string;
  logoUrl: string;
  connectionName?: string;
  connectionRole?: string;
  headshotSeed?: string;
  headshotImg?: number;
};

function logoSlug(domainOrBrand: string) {
  return domainOrBrand
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split(".")[0]
    .replace(/[^a-z0-9]/g, "");
}

function logo(domainOrBrand: string) {
  return `https://cdn.simpleicons.org/${logoSlug(domainOrBrand)}/0A0A0A`;
}

export function logoFallback(domain: string) {
  return `https://logo.clearbit.com/${domain}`;
}

function headshot(seed: string) {
  return `https://i.pravatar.cc/300?u=${encodeURIComponent(seed)}`;
}

export function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/[^a-z]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function buildHeadshotForPerson(personName: string): string {
  return `/headshots/${nameToSlug(personName)}.png`;
}

export function buildHeadshotUrlFromEntry(entry: CaseStudyEntry): string {
  if (entry.connectionName) {
    return `/headshots/${nameToSlug(entry.connectionName)}.png`;
  }
  if (entry.headshotImg) {
    return `https://i.pravatar.cc/300?img=${entry.headshotImg}`;
  }
  if (entry.headshotSeed) {
    return `https://i.pravatar.cc/300?u=${encodeURIComponent(entry.headshotSeed)}`;
  }
  return "";
}

export function buildPravatarFallback(entry: CaseStudyEntry): string {
  if (entry.headshotImg) {
    return `https://i.pravatar.cc/300?img=${entry.headshotImg}`;
  }
  if (entry.headshotSeed) {
    return `https://i.pravatar.cc/300?u=${encodeURIComponent(entry.headshotSeed)}`;
  }
  return "";
}

export const CASE_STUDIES: CaseStudyEntry[] = [
  {
    brand: "Notion",
    industry: "tech",
    outcome: "rebuilt their finance stack in 14 days",
    domain: "notion.so",
    logoUrl: logo("notion.so"),
    connectionName: "James Park",
    connectionRole: "Finance Director",
    headshotSeed: "james-park-notion",
    headshotImg: 11,
  },
  {
    brand: "Anthropic",
    industry: "tech",
    outcome: "closed books 75% faster post-Series E",
    domain: "anthropic.com",
    logoUrl: logo("anthropic.com"),
    connectionName: "Sarah Chen",
    connectionRole: "VP of Finance",
    headshotSeed: "sarah-chen-anthropic",
    headshotImg: 5,
  },
  {
    brand: "Vercel",
    industry: "tech",
    outcome: "saved 1200 hours of accounting work annually",
    domain: "vercel.com",
    logoUrl: logo("vercel.com"),
    connectionName: "Priya Sharma",
    connectionRole: "Head of Finance",
    headshotSeed: "priya-sharma-vercel",
    headshotImg: 47,
  },
  {
    brand: "Figma",
    industry: "tech",
    outcome: "cut spend 5% in the first 90 days",
    domain: "figma.com",
    logoUrl: logo("figma.com"),
    connectionName: "Daniel Lee",
    connectionRole: "CFO",
    headshotSeed: "daniel-lee-figma",
    headshotImg: 12,
  },
  {
    brand: "Cursor",
    industry: "tech",
    outcome: "automated 40% of their receipt matching",
    domain: "cursor.com",
    logoUrl: logo("cursor.com"),
    connectionName: "Maya Patel",
    connectionRole: "VP of Finance",
    headshotSeed: "maya-patel-cursor",
    headshotImg: 38,
  },
  {
    brand: "Linear",
    industry: "tech",
    outcome: "saved their finance team 4 hours per week per person",
    domain: "linear.app",
    logoUrl: logo("linear.app"),
    connectionName: "Rebecca Tanaka",
    connectionRole: "Head of Finance",
    headshotSeed: "rebecca-tanaka-linear",
    headshotImg: 26,
  },
  {
    brand: "Shopify",
    industry: "tech",
    outcome: "cut their close cycle from 8 days to 2",
    domain: "shopify.com",
    logoUrl: logo("shopify.com"),
    connectionName: "Michael Torres",
    connectionRole: "Controller",
    headshotSeed: "michael-torres-shopify",
    headshotImg: 33,
  },
  {
    brand: "Cohere",
    industry: "tech",
    outcome: "rebuilt their stack in 21 days post-Series D",
    domain: "cohere.com",
    logoUrl: logo("cohere.com"),
    connectionName: "Alex Dubois",
    connectionRole: "VP of Finance",
    headshotSeed: "alex-dubois-cohere",
    headshotImg: 51,
  },
  {
    brand: "1Password",
    industry: "tech",
    outcome: "saved $180k per year on tool consolidation",
    domain: "1password.com",
    logoUrl: logo("1password.com"),
    connectionName: "Hannah Greene",
    connectionRole: "Director of Finance",
    headshotSeed: "hannah-greene-1password",
    headshotImg: 16,
  },
  {
    brand: "Wise",
    industry: "tech",
    outcome: "cut their close cycle 5 days",
    domain: "wise.com",
    logoUrl: logo("wise.com"),
    connectionName: "Emma Richardson",
    connectionRole: "Head of Finance",
    headshotSeed: "emma-richardson-wise",
    headshotImg: 49,
  },
  {
    brand: "Monzo",
    industry: "tech",
    outcome: "automated 40% of their AP workflow",
    domain: "monzo.com",
    logoUrl: logo("monzo.com"),
    connectionName: "Oliver Hayes",
    connectionRole: "Director of Finance",
    headshotSeed: "oliver-hayes-monzo",
    headshotImg: 15,
  },
  {
    brand: "Canva",
    industry: "tech",
    outcome: "consolidated their spend stack in 3 weeks",
    domain: "canva.com",
    logoUrl: logo("canva.com"),
    connectionName: "David Kim",
    connectionRole: "CFO",
    headshotSeed: "david-kim-canva",
    headshotImg: 22,
  },
  {
    brand: "Atlassian",
    industry: "tech",
    outcome: "cut spend 5% post-IPO",
    domain: "atlassian.com",
    logoUrl: logo("atlassian.com"),
    connectionName: "Claire Henderson",
    connectionRole: "VP of Finance",
    headshotSeed: "claire-henderson-atlassian",
    headshotImg: 20,
  },
  {
    brand: "Intercom",
    industry: "tech",
    outcome: "rebuilt their AP workflow in 14 days",
    domain: "intercom.com",
    logoUrl: logo("intercom.com"),
    connectionName: "Niamh O'Connor",
    connectionRole: "Finance Director",
    headshotSeed: "niamh-oconnor-intercom",
    headshotImg: 23,
  },
  {
    brand: "Stripe",
    industry: "tech",
    outcome: "consolidated 9 tools into 1",
    domain: "stripe.com",
    logoUrl: logo("stripe.com"),
    connectionName: "Aoife Murphy",
    connectionRole: "VP of Finance",
    headshotSeed: "aoife-murphy-stripe",
    headshotImg: 19,
  },
  {
    brand: "Grab",
    industry: "tech",
    outcome: "cut their close cycle 5 days after consolidating tools",
    domain: "grab.com",
    logoUrl: logo("grab.com"),
    connectionName: "Wei Lin",
    connectionRole: "Head of Finance",
    headshotSeed: "wei-lin-grab",
    headshotImg: 32,
  },
  {
    brand: "Anduril",
    industry: "tech",
    outcome: "consolidated 7 tools into 1",
    domain: "anduril.com",
    logoUrl: logo("anduril.com"),
    connectionName: "Jonathan Reed",
    connectionRole: "Controller",
    headshotSeed: "jonathan-reed-anduril",
    headshotImg: 13,
  },
  {
    brand: "Sea Group",
    industry: "tech",
    outcome: "automated 60% of their expense reporting",
    domain: "seagroup.com",
    logoUrl: logo("seagroup.com"),
    connectionName: "Mei Tan",
    connectionRole: "Director of Finance",
    headshotSeed: "mei-tan-seagroup",
    headshotImg: 41,
  },
  {
    brand: "Xero",
    industry: "tech",
    outcome: "rebuilt their finance ops at 4000+ headcount",
    domain: "xero.com",
    logoUrl: logo("xero.com"),
    connectionName: "Charlotte Mills",
    connectionRole: "Controller",
    headshotSeed: "charlotte-mills-xero",
    headshotImg: 24,
  },
  {
    brand: "VaynerMedia",
    industry: "marketing agency",
    outcome: "cut their close cycle from 9 days to 3",
    domain: "vaynermedia.com",
    logoUrl: logo("vaynermedia.com"),
    connectionName: "Jessica Ruiz",
    connectionRole: "CFO",
    headshotSeed: "jessica-ruiz-vaynermedia",
    headshotImg: 34,
  },
  {
    brand: "Wieden+Kennedy",
    industry: "marketing agency",
    outcome: "saved 1500 hours annually on receipt matching",
    domain: "wk.com",
    logoUrl: logo("wk.com"),
    connectionName: "Mark Stevens",
    connectionRole: "CFO",
    headshotSeed: "mark-stevens-wk",
    headshotImg: 53,
  },
  {
    brand: "Mother",
    industry: "marketing agency",
    outcome: "cut their billables-to-spend reporting time 70%",
    domain: "motherlondon.com",
    logoUrl: logo("motherlondon.com"),
    connectionName: "Hugo Bennett",
    connectionRole: "Finance Director",
    headshotSeed: "hugo-bennett-mother",
    headshotImg: 7,
  },
  {
    brand: "AKQA",
    industry: "marketing agency",
    outcome: "rebuilt their spend stack in 4 weeks",
    domain: "akqa.com",
    logoUrl: logo("akqa.com"),
    connectionName: "Nadia Patel",
    connectionRole: "VP of Finance",
    headshotSeed: "nadia-patel-akqa",
    headshotImg: 47,
  },
  {
    brand: "Sid Lee",
    industry: "marketing agency",
    outcome: "cut close cycle 4 days after rebuilding the spend stack",
    domain: "sidlee.com",
    logoUrl: logo("sidlee.com"),
    connectionName: "Olivier Tremblay",
    connectionRole: "Controller",
    headshotSeed: "olivier-tremblay-sidlee",
    headshotImg: 14,
  },
  {
    brand: "The Monkeys",
    industry: "marketing agency",
    outcome: "automated 50% of their expense reporting",
    domain: "themonkeys.com.au",
    logoUrl: logo("themonkeys.com.au"),
    connectionName: "Liam O'Brien",
    connectionRole: "Head of Finance",
    headshotSeed: "liam-obrien-themonkeys",
    headshotImg: 8,
  },
  {
    brand: "Glossier",
    industry: "consumer goods",
    outcome: "saved $250k annually on vendor consolidation",
    domain: "glossier.com",
    logoUrl: logo("glossier.com"),
    connectionName: "Rachel Cohen",
    connectionRole: "VP of Finance",
    headshotSeed: "rachel-cohen-glossier",
    headshotImg: 36,
  },
  {
    brand: "Warby Parker",
    industry: "consumer goods",
    outcome: "rebuilt their finance ops at scale",
    domain: "warbyparker.com",
    logoUrl: logo("warbyparker.com"),
    connectionName: "Marcus Thompson",
    connectionRole: "CFO",
    headshotSeed: "marcus-thompson-warby",
    headshotImg: 44,
  },
  {
    brand: "Liquid Death",
    industry: "consumer goods",
    outcome: "cut spend 5% during their last raise",
    domain: "liquiddeath.com",
    logoUrl: logo("liquiddeath.com"),
    connectionName: "Brooke Williams",
    connectionRole: "Director of Finance",
    headshotSeed: "brooke-williams-liquiddeath",
    headshotImg: 25,
  },
  {
    brand: "Gymshark",
    industry: "consumer goods",
    outcome: "rebuilt their finance stack in 3 weeks post-General Atlantic",
    domain: "gymshark.com",
    logoUrl: logo("gymshark.com"),
    connectionName: "Tom Bradley",
    connectionRole: "Finance Director",
    headshotSeed: "tom-bradley-gymshark",
    headshotImg: 15,
  },
  {
    brand: "Lululemon",
    industry: "consumer goods",
    outcome: "cut their close cycle by 4 days",
    domain: "lululemon.com",
    logoUrl: logo("lululemon.com"),
    connectionName: "Anna Wong",
    connectionRole: "Controller",
    headshotSeed: "anna-wong-lululemon",
    headshotImg: 26,
  },
  {
    brand: "Athletic Greens",
    industry: "consumer goods",
    outcome: "consolidated 6 tools into 1",
    domain: "drinkag1.com",
    logoUrl: logo("drinkag1.com"),
    connectionName: "Riley Carter",
    connectionRole: "VP of Finance",
    headshotSeed: "riley-carter-ag1",
    headshotImg: 16,
  },
  {
    brand: "Olipop",
    industry: "consumer goods",
    outcome: "automated their AP in 21 days",
    domain: "drinkolipop.com",
    logoUrl: logo("drinkolipop.com"),
    connectionName: "Sasha Bennett",
    connectionRole: "Head of Finance",
    headshotSeed: "sasha-bennett-olipop",
    headshotImg: 27,
  },
  {
    brand: "Allbirds",
    industry: "consumer goods",
    outcome: "cut their close cycle from 7 days to 2",
    domain: "allbirds.com",
    logoUrl: logo("allbirds.com"),
    connectionName: "Mei Lin",
    connectionRole: "Controller",
    headshotSeed: "mei-lin-allbirds",
    headshotImg: 32,
  },
  {
    brand: "Huel",
    industry: "consumer goods",
    outcome: "automated 40% of their receipt matching",
    domain: "huel.com",
    logoUrl: logo("huel.com"),
    connectionName: "Sophie Walker",
    connectionRole: "Head of Finance",
    headshotSeed: "sophie-walker-huel",
    headshotImg: 24,
  },
  {
    brand: "Knix",
    industry: "consumer goods",
    outcome: "saved $200k on tool consolidation",
    domain: "knix.com",
    logoUrl: logo("knix.com"),
    connectionName: "Priya Singh",
    connectionRole: "VP of Finance",
    headshotSeed: "priya-singh-knix",
    headshotImg: 47,
  },
  {
    brand: "Frank Body",
    industry: "consumer goods",
    outcome: "consolidated their spend stack in 3 weeks",
    domain: "frankbody.com",
    logoUrl: logo("frankbody.com"),
    connectionName: "Olivia Chen",
    connectionRole: "Director of Finance",
    headshotSeed: "olivia-chen-frankbody",
    headshotImg: 5,
  },
  {
    brand: "Charles & Keith",
    industry: "consumer goods",
    outcome: "rebuilt their finance ops across 6 markets",
    domain: "charleskeith.com",
    logoUrl: logo("charleskeith.com"),
    connectionName: "Hui Lin",
    connectionRole: "Head of Finance",
    headshotSeed: "hui-lin-charleskeith",
    headshotImg: 41,
  },
];

export function findCaseStudy(brand: string): CaseStudyEntry | undefined {
  const needle = brand.trim().toLowerCase();
  if (!needle) return undefined;
  return CASE_STUDIES.find((c) => c.brand.toLowerCase() === needle);
}

export function buildHeadshotUrl(seed: string) {
  return headshot(seed);
}
