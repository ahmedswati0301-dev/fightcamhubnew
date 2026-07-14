import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

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

interface HeroProps {
  image: string;
  browseTo: "/" | "/exclusive-videos";
  monetizationUrl?: string;
}

export function Hero({
  image,
  browseTo,
  monetizationUrl = "https://consciousdunkvastly.com/hu3d2ui1?key=c6dfa5e4b94e4987e31e7c7c7502de12",
}: HeroProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const adSlotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = image;
  }, [image]);

  useEffect(() => {
    if (!adSlotRef.current) return;

    adSlotRef.current.innerHTML = "";

    const optionsScript = document.createElement("script");
    optionsScript.type = "text/javascript";
    optionsScript.text = `window.atOptions = ${JSON.stringify({
      key: "27b27fef752e1fb17d505105a33cd700",
      format: "iframe",
      height: 90,
      width: 728,
      params: {},
    })};`;

    const externalScript = document.createElement("script");
    externalScript.type = "text/javascript";
    externalScript.src = "https://www.highperformanceformat.com/27b27fef752e1fb17d505105a33cd700/invoke.js";
    externalScript.async = true;
    externalScript.setAttribute("data-cfasync", "false");

    document.body.appendChild(optionsScript);
    adSlotRef.current.appendChild(externalScript);

    return () => {
      if (document.body.contains(optionsScript)) {
        document.body.removeChild(optionsScript);
      }
      if (adSlotRef.current && adSlotRef.current.contains(externalScript)) {
        adSlotRef.current.removeChild(externalScript);
      }
      delete window.atOptions;
    };
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={image}
          alt="Hero background"
          width={1600}
          height={900}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          onLoad={() => setImageLoaded(true)}
          className={`h-full w-full object-cover object-center transition-opacity duration-700 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-black/75" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 15%, rgba(248,113,113,0.2), transparent 22%), radial-gradient(circle at 85% 20%, rgba(59,130,246,0.14), transparent 18%)",
          }}
        />
      </div>

      <div className="container-site relative mt-16 py-8 sm:mt-0 sm:py-10 lg:py-14">
        <div className="mx-auto w-full max-w-[1000px] px-4 sm:px-6">
          <div className="mb-6 flex justify-center">
            <div className="flex h-[90px] w-full max-w-[728px] items-center justify-center rounded-2xl border border-white/10 bg-slate-900/90 px-4 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:text-base">
              <div ref={adSlotRef} className="flex h-full w-full items-center justify-center" />
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 shadow-[0_40px_120px_rgba(0,0,0,0.65)] backdrop-blur-xl">
            <div className="relative aspect-[16/9]">
              <img
                src={image}
                alt="Video preview"
                className="absolute inset-0 h-full w-full object-cover object-center brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute inset-x-0 top-4 px-4 sm:px-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-red-600/95 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-red-500/25 sm:px-4">
                  <span className="h-2.5 w-2.5 rounded-full bg-white animate-pulse" />
                  Live Event Running Now
                </div>
              </div>

              <a
                href={monetizationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-x-0 top-1/2 mx-auto flex h-24 w-24 -translate-y-1/2 items-center justify-center rounded-full bg-red-600 text-white shadow-[0_0_70px_rgba(239,68,68,0.55)] transition-transform duration-300 hover:scale-105 sm:h-28 sm:w-28"
              >
                <span className="absolute inset-0 rounded-full bg-red-500/30 blur-2xl" />
                <span className="relative text-[2.3rem] font-black sm:text-[3rem]">▶</span>
              </a>
            </div>
            <div className="border-t border-white/10 bg-[#09050a]/90 p-5 sm:p-6">
              <div className="flex flex-col items-center gap-4">
                <p className="text-xs uppercase tracking-[0.3em] text-red-400 sm:text-sm">
                  Live Stream
                </p>
                <a
                  href={monetizationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full max-w-[420px] items-center justify-center rounded-[1.5rem] bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 text-center text-base font-black uppercase tracking-[0.16em] text-white shadow-[0_24px_70px_rgba(239,68,68,0.45)] transition hover:from-red-700 hover:to-red-800 active:scale-[0.98] sm:text-lg"
                >
                  Watch Live Stream
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
