import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Glaze. Glaze every prospect.",
  description:
    "Cast a personalized landing page for every prospect. Matched to their brand, their stage, and their story.",
  openGraph: {
    title: "Glaze. Glaze every prospect.",
    description:
      "Cast a personalized landing page for every prospect. Matched to their brand, their stage, and their story.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
