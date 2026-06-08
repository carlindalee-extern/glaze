import Link from "next/link";
import { GlazeLogo } from "@/components/GlazeLogo";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 pt-6">
        <div className="max-w-page mx-auto">
          <GlazeLogo />
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-prose text-center">
          <p className="section-label mb-6 text-glaze-mute">404</p>
          <h1 className="text-display-2 text-glaze-ink mb-6">
            This page hasn't been glazed yet.
          </h1>
          <p className="text-body text-glaze-mute mb-10">
            Generate a new one from the dashboard.
          </p>
          <Link href="/" className="btn-primary">
            Glaze a new page
          </Link>
        </div>
      </main>
    </div>
  );
}
