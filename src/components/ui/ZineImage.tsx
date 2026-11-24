import { useState } from "react";
import { cn } from "../../lib/utils";

export interface ZineImageProps {
  src: string;
  alt: string;
  aspectClass?: string;
  frameClassName?: string;
  imgClassName?: string;
  tapePosition?: "top-left" | "top-right" | "both" | "none";
  priority?: boolean;
}

const FALLBACK_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <rect width="800" height="600" fill="#2E2E2E"/>
      <rect x="24" y="24" width="752" height="552" fill="none" stroke="#E9E1D4" stroke-width="4" stroke-dasharray="14 10"/>
      <text x="400" y="288" text-anchor="middle" fill="#B5A642" font-family="Courier New, monospace" font-weight="bold" font-size="32">SUBSONIC NOISE</text>
      <text x="400" y="330" text-anchor="middle" fill="#E9E1D4" font-family="Courier New, monospace" font-size="18">BALLARD ANALOG ARCHIVE</text>
    </svg>`
  );

export function ZineImage({
  src,
  alt,
  aspectClass = "aspect-[4/3]",
  frameClassName,
  imgClassName,
  tapePosition = "top-right",
  priority = false,
}: ZineImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        "relative bg-paper-light p-2 zine-offset-red",
        frameClassName
      )}
    >
      {(tapePosition === "top-right" || tapePosition === "both") && (
        <span
          aria-hidden="true"
          className="zine-tape pointer-events-none absolute -top-3 right-5 z-20 h-6 w-20 rotate-[12deg]"
        />
      )}
      {(tapePosition === "top-left" || tapePosition === "both") && (
        <span
          aria-hidden="true"
          className="zine-tape pointer-events-none absolute -top-3 left-5 z-20 h-6 w-20 -rotate-[10deg]"
        />
      )}

      <div className={cn("relative overflow-hidden bg-ink border border-ink", aspectClass)}>
        <img
          src={failed ? FALLBACK_SVG : src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          onError={() => setFailed(true)}
          className={cn(
            "h-full w-full object-cover grayscale contrast-[1.18] brightness-[0.92] transition-transform duration-300",
            imgClassName
          )}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(46,46,46,0.35)_100%)]"
        />
      </div>
    </div>
  );
}
