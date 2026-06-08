import { getStore } from "@netlify/blobs";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { BrandKit } from "./firecrawl";
import type { PageCopy, ProspectInput } from "./prompt";

export type GeneratedPage = {
  slug: string;
  createdAt: string;
  senderName: string;
  caseStudyLogoUrl?: string;
  connectionHeadshotUrl?: string;
  connectionHeadshotFallbackUrl?: string;
  brand: BrandKit;
  prospect: ProspectInput;
  copy: PageCopy;
};

// Use Netlify Blobs in production, local filesystem in dev.
// Evaluated at runtime, not module load, so esbuild can't inline a stale value.
function useNetlifyBlobs(): boolean {
  if (process.env.NODE_ENV === "production") return true;
  return Boolean(
    process.env.NETLIFY ||
      process.env.NETLIFY_LOCAL ||
      process.env.NETLIFY_DEV,
  );
}

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "pages.json");

function getBlobStore() {
  return getStore({ name: "glaze-pages", consistency: "strong" });
}

async function ensureLocalFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "{}", "utf8");
  }
}

async function readAllLocal(): Promise<Record<string, GeneratedPage>> {
  await ensureLocalFile();
  const raw = await fs.readFile(DATA_FILE, "utf8");
  try {
    return JSON.parse(raw) as Record<string, GeneratedPage>;
  } catch {
    return {};
  }
}

async function writeAllLocal(data: Record<string, GeneratedPage>) {
  await ensureLocalFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

export async function savePage(page: GeneratedPage) {
  if (useNetlifyBlobs()) {
    const store = getBlobStore();
    await store.setJSON(page.slug, page);
    return;
  }
  const all = await readAllLocal();
  all[page.slug] = page;
  await writeAllLocal(all);
}

export async function getPage(slug: string): Promise<GeneratedPage | null> {
  if (useNetlifyBlobs()) {
    const store = getBlobStore();
    const data = (await store.get(slug, { type: "json" })) as
      | GeneratedPage
      | null;
    return data ?? null;
  }
  const all = await readAllLocal();
  return all[slug] ?? null;
}

export async function listPages(): Promise<GeneratedPage[]> {
  if (useNetlifyBlobs()) {
    const store = getBlobStore();
    const { blobs } = await store.list();
    const pages = await Promise.all(
      blobs.map(async (b) => (await store.get(b.key, { type: "json" })) as GeneratedPage),
    );
    return pages
      .filter(Boolean)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
  const all = await readAllLocal();
  return Object.values(all).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
}

export function makeSlug(prospect: ProspectInput): string {
  const first = (prospect.firstName || "guest").toLowerCase().replace(/[^a-z0-9]/g, "");
  const co = (prospect.company || "prospect").toLowerCase().replace(/[^a-z0-9]/g, "");
  const stamp = Date.now().toString(36).slice(-4);
  return `${first}-${co}-${stamp}`;
}
