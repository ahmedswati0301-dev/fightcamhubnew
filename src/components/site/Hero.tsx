import { useEffect, useState } from "react";

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
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  browseTo: "/" | "/exclusive-videos";
  browseLabel: string;
  monetizationUrl?: string;
  liveStreams: Array<{ id: string; title: string; poster: string }>;
}

// Neon color combinations for circular cards
const neonColors = [
  { border: "rgba(0, 255, 136, 0.9)", glow: "rgba(0, 255, 136, 0.5)", gradient: "from-cyan-400 to-teal-500" }, // Neon Cyan/Teal
  { border: "rgba(255, 0, 255, 0.9)", glow: "rgba(255, 0, 255, 0.5)", gradient: "from-fuchsia-500 to-purple-600" }, // Neon Magenta
  { border: "rgba(255, 0, 102, 0.9)", glow: "rgba(255, 0, 102, 0.5)", gradient: "from-pink-500 to-rose-600" }, // Neon Pink
  { border: "rgba(0, 255, 255, 0.9)", glow: "rgba(0, 255, 255, 0.5)", gradient: "from-cyan-400 to-blue-500" }, // Neon Aqua
  { border: "rgba(255, 51, 255, 0.9)", glow: "rgba(255, 51, 255, 0.5)", gradient: "from-purple-500 to-pink-500" }, // Neon Purple
  { border: "rgba(0, 255, 51, 0.9)", glow: "rgba(0, 255, 51, 0.5)", gradient: "from-lime-400 to-green-500" }, // Neon Lime
  { border: "rgba(255, 102, 0, 0.9)", glow: "rgba(255, 102, 0, 0.5)", gradient: "from-orange-500 to-red-500" }, // Neon Orange
  { border: "rgba(0, 102, 255, 0.9)", glow: "rgba(0, 102, 255, 0.5)", gradient: "from-blue-500 to-purple-500" }, // Neon Blue
];

export function Hero({
  image,
  eyebrow,
  title,
  highlight,
  description,
  browseTo,
  browseLabel,
  monetizationUrl = "https://consciousdunkvastly.com/hu3d2ui1?key=c6dfa5e4b94e4987e31e7c7c7502de12",
  liveStreams,
}: HeroProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = image;
  }, [image]);

  return (
    <section className="relative overflow-hidden pt-14">
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
        <div className="absolute inset-0 bg-black/85" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 15%, rgba(248,113,113,0.18), transparent 18%), radial-gradient(circle at 80% 25%, rgba(239,68,68,0.15), transparent 20%)",
          }}
        />
      </div>

      <div className="container-site relative py-10 sm:py-16">
        <div className="mx-auto flex flex-col gap-10 px-4 sm:px-6 lg:max-w-[1300px]">
          <div className="flex items-center gap-3 overflow-x-auto pb-4">
            {liveStreams.map((stream, index) => {
              const isExclusive = stream.id.startsWith("xlive-");
              const neonColor = neonColors[index % neonColors.length];
              return (
              <div key={stream.id} className="flex shrink-0 flex-col items-center gap-2 text-center">
                <div className={`relative flex h-24 w-24 items-center justify-center rounded-full bg-black/40 p-1 transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.05] ${isExclusive ? "exclusive-hero-rotate" : "live-hero-rotate"}`} style={{
                  border: `4px solid ${neonColor.border}`,
                  boxShadow: `0 0 50px ${neonColor.glow}, 0 0 80px ${neonColor.glow}80, inset 0 0 20px ${neonColor.glow}40`
                }}>
                  <img
                    src={stream.poster}
                    alt={stream.title}
                    className="h-full w-full rounded-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-full border border-white/20 bg-gradient-to-b from-white/10 via-transparent to-black/30" />
                  {isExclusive && (
                    <div className="pointer-events-none absolute -inset-1 rounded-full opacity-70" style={{
                      background: `conic-gradient(from 0deg, ${neonColor.border}, ${neonColor.glow}40, ${neonColor.border})`,
                      animation: "rotate-circle 4s linear infinite"
                    }} />
                  )}
                </div>
                <span className={`max-w-[78px] text-[0.7rem] font-bold uppercase tracking-[0.24em] ${isExclusive ? "text-red-300" : "text-slate-300"}`}>
                  {isExclusive ? stream.title.split(" ")[0] : `FIGHTER ${index + 1}`}
                </span>
              </div>
              );
            })}
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 shadow-[0_40px_120px_rgba(0,0,0,0.65)] backdrop-blur-xl">
            <div className="relative aspect-[16/9] bg-black">
              <img
                src={image}
                alt="Fight hero preview"
                className="absolute inset-0 h-full w-full object-cover object-center brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              <div className="absolute inset-x-0 top-6 px-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-red-200 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" /> Live Event Running Now
                </div>
              </div>

              <div className="absolute inset-x-0 top-1/4 px-6 text-center">
                <p className="text-sm uppercase tracking-[0.35em] text-red-300">{eyebrow}</p>
                <h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                  {title} <span className="text-red-500">{highlight}</span>
                </h1>
                <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                  {description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => window.open(monetizationUrl, "_blank")}
                className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-red-600/95 p-6 text-white shadow-[0_0_80px_rgba(239,68,68,0.45)] transition hover:scale-105"
              >
                <span className="text-4xl font-black">▶</span>
              </button>

              <div className="absolute inset-x-0 bottom-6 px-6">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
