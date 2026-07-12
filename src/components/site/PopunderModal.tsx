import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

interface FloatingAdProps {
  /** Delay before the ad slides in (ms) */
  delay?: number;
  width?: number;
  height?: number;
}

/**
 * Premium floating ad card that gracefully slides up from bottom-right.
 * Dismissible, remembers dismissal for the session, sits above the sticky
 * footer, glassmorphism styling.
 *
 * SLOT D - FLOATING POPUNDER AD WITH SCRIPT INTEGRATION.
 * This floating ad component is disabled for now and can be reused when needed.
 */
export default function FloatingAd({
  delay = 3500,
  width = 300,
  height = 250,
}: FloatingAdProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  // Handle visibility delay
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("floating-ad-dismissed") === "1") {
      setDismissed(true);
      return;
    }
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  // Handle dynamic script injection precisely when visible and container is ready
  useEffect(() => {
    if (!visible || dismissed || scriptLoaded.current || !containerRef.current) return;

    try {
      scriptLoaded.current = true;
      
      // 1. Clear placeholder text safely
      containerRef.current.innerHTML = "";

      // 2. Define standard window config array or local global configuration object
      (window as any).atOptions = {
        key: "58b13e415b520b2923f27f4d5d6a5a58",
        format: "iframe",
        height: 250,
        width: 300,
        params: {},
      };

      // 3. Create script tag and append safely to component container element
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://consciousdunkvastly.com/58b13e415b520b2923f27f4d5d6a5a58/invoke.js";
      
      containerRef.current.appendChild(script);
    } catch (err) {
      console.error("Adsterra Slot D script failed to initialize:", err);
    }
  }, [visible, dismissed]);

  if (dismissed) return null;

  const close = () => {
    // Open the link in a new tab
    window.open("https://consciousdunkvastly.com/uh4qrcst?key=f36ee9a5c8a14e25b36806eca7375ac7", "_blank");
    // Hide the popup
    setVisible(false);
    setDismissed(true);
    try {
      sessionStorage.setItem("floating-ad-dismissed", "1");
    } catch {}
  };

  return (
    <div
      className={`fixed z-40 left-1/2 -translate-x-1/2 bottom-[120px] transition-all duration-500 ease-out ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
      role="complementary"
      aria-label="Sponsored"
    >
      {/* Glow halo */}
      <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-[radial-gradient(ellipse_at_center,oklch(0.65_0.25_340/0.35),transparent_70%)] blur-2xl" />

      <div className="relative rounded-2xl border border-zinc-800/80 bg-zinc-950/85 backdrop-blur-xl p-2 pt-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9),0_0_40px_-10px_oklch(0.65_0.25_340/0.5)]">
        {/* Header bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-2.5 py-1">
          <span className="text-[9px] uppercase tracking-[0.3em] text-zinc-500 font-sans">
            Sponsored
          </span>
          <button
            onClick={close}
            aria-label="Close ad"
            className="group flex h-5 w-5 items-center justify-center rounded-full bg-zinc-800/80 hover:bg-zinc-700 transition"
          >
            <X className="h-3 w-3 text-zinc-400 group-hover:text-white" />
          </button>
        </div>

        {/* Ad content - Managed by containerRef */}
        <div
          ref={containerRef}
          className="flex items-center justify-center overflow-hidden rounded-lg bg-zinc-950/60"
          style={{ width, height }}
        >
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">
              Ad Slot D
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              {width} × {height}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
