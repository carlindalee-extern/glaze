import Link from "next/link";

export function GlazeLogo({ size = "default" }: { size?: "default" | "small" }) {
  const textSize = size === "small" ? "text-[20px]" : "text-[26px]";
  const markSize = size === "small" ? 22 : 28;

  return (
    <Link href="/" className="inline-flex items-center gap-[6px] group">
      <GlazeMark size={markSize} />
      <span
        className={`${textSize} font-medium tracking-[-0.02em] text-glaze-ink lowercase leading-none`}
      >
        glaze
      </span>
    </Link>
  );
}

function GlazeMark({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className="transition-transform group-hover:rotate-6"
    >
      <defs>
        <radialGradient id="glaze-grad" cx="0.35" cy="0.3" r="0.85">
          <stop offset="0%" stopColor="#9CC4F0" />
          <stop offset="40%" stopColor="#0667D9" />
          <stop offset="100%" stopColor="#034BA1" />
        </radialGradient>
        <radialGradient id="glaze-shine" cx="0.3" cy="0.25" r="0.5">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        d="M16 2 C 9 12, 5 17, 5 22 C 5 27.5, 9.5 31, 16 31 C 22.5 31, 27 27.5, 27 22 C 27 17, 23 12, 16 2 Z"
        fill="url(#glaze-grad)"
      />
      <ellipse
        cx="11"
        cy="14"
        rx="3.5"
        ry="6"
        fill="url(#glaze-shine)"
        transform="rotate(-15 11 14)"
      />
    </svg>
  );
}
