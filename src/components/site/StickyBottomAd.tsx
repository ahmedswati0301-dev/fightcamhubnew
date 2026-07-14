import { useEffect, useRef } from "react";

declare global {
  interface Window {
    atOptions?: {
      key: string;
      format: string;
      height: number;
      width: number;
      params: Record<string, unknown>;
    };
  }
}

export default function StickyBottomAd() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.atOptions = {
      key: "b5731697b8cac80dbc7bbc2d1836fe4c",
      format: "iframe",
      height: 50,
      width: 320,
      params: {},
    };

    const script = document.createElement("script");
    script.src = "https://www.highperformanceformat.com/b5731697b8cac80dbc7bbc2d1836fe4c/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      if (containerRef.current && containerRef.current.contains(script)) {
        containerRef.current.removeChild(script);
      }
      delete window.atOptions;
    };
  }, []);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 12px)" }}
    >
      <div className="h-[50px] w-[320px] overflow-hidden rounded-2xl border border-border bg-card/95 shadow-2xl shadow-black/10 backdrop-blur-sm">
        <div ref={containerRef} className="h-full w-full" />
      </div>
    </div>
  );
}
