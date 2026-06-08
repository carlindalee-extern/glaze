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

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "pages.json");

async function ensureFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "{}", "utf8");
  }
}

async function readAll(): Promise<Record<string, GeneratedPage>> {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, "utf8");
  try {
    return JSON.parse(raw) as Record<string, GeneratedPage>;
  } catch {
    return {};
  }
}

async function writeAll(data: Record<string, GeneratedPage>) {
  await ensureFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

export async function savePage(page: GeneratedPage) {
  const all = await readAll();
  all[page.slug] = page;
  await writeAll(all);
}

export async function getPage(slug: string): Promise<GeneratedPage | null> {
  const all = await readAll();
  return all[slug] ?? null;
}

export async function listPages(): Promise<GeneratedPage[]> {
  const all = await readAll();
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
