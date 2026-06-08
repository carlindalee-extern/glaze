# Glaze

> Glaze every prospect.

A 1:1 personalized landing page generator. Paste a product URL + a prospect's
data, and Glaze casts a landing page that matches the product's brand styling
and personalizes every section to the prospect's role, stage, and trigger.

Built for Clay's Alpha Forge.

## How it works

1. You paste a product URL (e.g., `https://www.clay.com/`) and a prospect's
   data as JSON.
2. Glaze calls **Firecrawl** to extract the product's brand kit (colors,
   typography, voice samples) from the website.
3. Glaze calls **Google Gemini (2.5 Flash)** with the brand kit + prospect data to
   generate a 1:1 personalized page copy.
4. The page is saved to `data/pages.json` and rendered at `/p/{slug}`.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Firecrawl JS SDK (`@mendable/firecrawl-js`)
- Google Gemini SDK (`@google/generative-ai`)
- Netlify deploy with `@netlify/plugin-nextjs`

## Local dev

```bash
npm install
cp .env.local.example .env.local
# fill in your Firecrawl + Gemini API keys

npm run dev
```

Open http://localhost:3000, paste a product URL, paste prospect JSON, click
"Glaze the page". You'll be redirected to `/p/{slug}`.

## Required env vars

```
FIRECRAWL_API_KEY=fc-...
GEMINI_API_KEY=AIza...
```

Get keys at:
- Firecrawl: https://firecrawl.dev (free tier covers dev)
- Gemini: https://aistudio.google.com/apikey (free tier covers dev)

## Prospect JSON shape

Only `firstName` is required. Everything else is optional but improves
personalization.

```json
{
  "firstName": "Maya",
  "title": "CFO",
  "company": "Veo",
  "industry": "tech",
  "location": "San Francisco",
  "tenureMonths": 2,
  "fundingRound": "Series B",
  "fundingMonth": "March",
  "fundingAmount": "$42M",
  "currentTool": "Expensify",
  "recentPost": "scaling the finance team for the next 18 months",
  "mutualConnection": "Sarah Chen",
  "caseStudy": "Notion",
  "caseStudyOutcome": "rebuilt the finance stack in 14 days"
}
```

## File map

```
app/
  layout.tsx              Inter font, base metadata
  globals.css             Glaze color tokens + button + card styles
  page.tsx                Input form (homepage)
  p/[slug]/page.tsx       Personalized landing page (dynamic SSR)
  api/generate/route.ts   POST endpoint: Firecrawl + Gemini + save
components/
  GlazeLogo.tsx           Wordmark with sheen dot
  Hero.tsx                Hero section
  ValueProps.tsx          3-column value prop cards
  SocialProof.tsx         Big social proof line on cream background
  CTA.tsx                 Dark band CTA at bottom
lib/
  firecrawl.ts            extractBrand() — calls Firecrawl Branding format
  llm.ts                  generateCopy() — calls Google Gemini SDK
  prompt.ts               buildCopyPrompt() — the master copy prompt
  storage.ts              File-based persistence at data/pages.json
data/
  pages.json              Generated pages (gitignored)
```

## Deploy to Netlify

```bash
# Commit and push to GitHub
git init && git add . && git commit -m "init Glaze"
gh repo create glaze --public --source=.

# Then in Netlify dashboard:
# 1. New site from Git -> pick your repo
# 2. Build command: npm run build
# 3. Publish directory: .next
# 4. Add env vars: FIRECRAWL_API_KEY, GEMINI_API_KEY
# 5. Deploy
```

The `netlify.toml` and `@netlify/plugin-nextjs` handle the rest.

### Storage caveat for prod

`lib/storage.ts` uses the local file system. That works for local dev but
NOT for Netlify Functions (read-only filesystem). For prod, swap `storage.ts`
to use Netlify Blobs or Upstash Redis. Keep the same interface
(`savePage`, `getPage`, `listPages`).

## Connecting to Clay

Two ways to drive Glaze from Clay:

1. **Manual paste**: from a Clay row, export the relevant fields as JSON,
   paste into the form. Good for spot-checking.

2. **HTTP API column in Clay**: add a column in your Clay table that calls
   `POST /api/generate` with the prospect row, get back the slug URL, and
   embed the URL in your outreach (InMail, email, slack).

   ```javascript
   // Clay HTTP API column
   const res = await fetch("https://your-glaze.netlify.app/api/generate", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
       productUrl: "https://yourproduct.com",
       prospect: {
         firstName: input["First Name"],
         title: input["Job Title"],
         company: input["Company Name"],
         industry: input["Industry Bucket"],
         location: input["Location"],
         currentTool: input["Spend Management Tool"],
         caseStudy: input["Matched Case Study"],
         caseStudyOutcome: input["case_study_outcome"],
         mutualConnection: input["mutual LinkedIn connection"],
         // ... add any other fields
       },
     }),
   });
   const data = await res.json();
   return `https://your-glaze.netlify.app${data.url}`;
   ```

   That column gives you a unique Glaze URL per prospect that you can drop
   into the InMail body or email signature.

## Why Glaze

- **Glaze** = the finish layer on pottery. Clay shapes the foundation, Glaze adds the personalized finish.
- **Glaze** = Gen Z slang for openly hyping someone up. Every page glazes its prospect.

## Cost per page

- Firecrawl Branding extract: ~$0.005
- Gemini 2.5 Flash generation: ~$0.002
- Total: ~$0.007 per page

50 prospects/month = ~$0.35. 1000 prospects/month = ~$7.
