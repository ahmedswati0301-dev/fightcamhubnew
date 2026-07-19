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
            {liveStreams.map((stream) => (
              <div key={stream.id} className="flex shrink-0 flex-col items-center gap-2 text-center">
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-[6px] border-red-500/90 bg-black/40 p-1 shadow-[0_0_40px_rgba(239,68,68,0.35)] transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.05]">
                  <img
                    src={stream.poster}
                    alt={stream.title}
                    className="h-full w-full rounded-full object-cover"
                  />
                  <span className="pointer-events-none absolute inset-0 rounded-full border border-white/10 bg-gradient-to-b from-transparent via-transparent to-black/20" />
                </div>
                <span className="max-w-[78px] text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-slate-300">
                  {stream.id.replace("live-", "Fighter ")}
                </span>
              </div>
            ))}
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
                <div className="mx-auto flex max-w-3xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <a
                    href={monetizationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-red-700 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-[0_18px_70px_rgba(239,68,68,0.35)] transition hover:from-red-700 hover:to-red-800"
                  >
                    Watch Live Stream
                  </a>
                  <a
                    href={browseTo}
                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white/10"
                  >
                    {browseLabel}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
