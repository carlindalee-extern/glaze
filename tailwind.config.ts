import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        glaze: {
          blue: "#0667D9",
          beige: "#DAD4C8",
          cream: "#EEE9DF",
          black: "#000000",
          white: "#FFFFFF",
          ink: "#0A0A0A",
          mute: "#6B6B6B",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "Arial", "sans-serif"],
      },
      fontSize: {
        "display-1": ["80px", { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "500" }],
        "display-2": ["56px", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "500" }],
        "h1": ["44px", { lineHeight: "1.1", letterSpacing: "-0.015em", fontWeight: "500" }],
        "h2": ["28px", { lineHeight: "1.15", letterSpacing: "-0.01em", fontWeight: "500" }],
        "body": ["16px", { lineHeight: "1.55" }],
        "small": ["14px", { lineHeight: "1.5" }],
        "label": ["11px", { lineHeight: "1.2", letterSpacing: "0.12em", fontWeight: "500" }],
      },
      borderRadius: {
        card: "11px",
        btn: "12px",
        pill: "999px",
      },
      maxWidth: {
        page: "1120px",
        content: "920px",
        prose: "640px",
      },
    },
  },
  plugins: [],
};

export default config;
