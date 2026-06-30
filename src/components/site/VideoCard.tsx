import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Play, Pause, Maximize2 } from "lucide-react";
import type { VideoItem } from "@/lib/videos";
import { PosterOverlay } from "./PosterOverlay";

const REACTIONS = ["❤️", "🔥", "😮", "👊", "😂"] as const;

interface FloatingReaction {
  id: number;
  emoji: string;
  left: number;
}

let activeVideoId: string | null = null;

const activateVideo = (id: string) => {
  if (activeVideoId === id) return;
  activeVideoId = id;
  window.dispatchEvent(new CustomEvent("video:activate", { detail: { id } }));
};

export const VideoCard = memo(function VideoCard({
  video,
  monetizationUrl = "https://consciousdunkvastly.com/hu3d2ui1?key=c6dfa5e4b94e4987e31e7c7c7502de12",
  showPosterOverlay = true,
}: {
  video: VideoItem;
  monetizationUrl?: string;
  showPosterOverlay?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [floats, setFloats] = useState<FloatingReaction[]>([]);
  const [shouldLoad, setShouldLoad] = useState(false);

  const react = (emoji: string) => {
    const id = Date.now() + Math.random();
    const left = 10 + Math.random() * 70;
    setFloats((f) => [...f, { id, emoji, left }]);
    setTimeout(() => setFloats((f) => f.filter((x) => x.id !== id)), 1600);
  };

  const play = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;

    setStarted(true);
    setShouldLoad(true);
    setPlaying(true);
    activateVideo(video.id);

    if (el.getAttribute("src") !== video.src) {
      el.src = video.src;
      el.load();
    }

    void el.play().catch(() => undefined);
  }, [video.id]);

  const pause = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    setPlaying(false);
  }, []);

  const watchFull = () => {
    window.open(monetizationUrl, "_blank");
  };

  useEffect(() => {
    const handleActivation = (event: Event) => {
      const customEvent = event as CustomEvent<{ id: string }>;
      if (customEvent.detail?.id !== video.id) {
        pause();
      }
    };

    window.addEventListener("video:activate", handleActivation as EventListener);
    return () => window.removeEventListener("video:activate", handleActivation as EventListener);
  }, [pause, video.id]);

  useEffect(() => {
    const element = mediaRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry) return;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
          if (started && playing) {
            void videoRef.current?.play().catch(() => undefined);
          }
        } else if (playing) {
          pause();
        }
      },
      { threshold: 0.7 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [pause, playing, started]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    if (!shouldLoad) {
      el.pause();
      el.removeAttribute("src");
      el.load();
      return;
    }

    if (el.getAttribute("src") !== video.src) {
      el.src = video.src;
      el.load();
    }
  }, [shouldLoad, video.src]);


  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-glow">
      <div ref={mediaRef} className="relative aspect-video overflow-hidden bg-black">
        <video
          ref={videoRef}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={shouldLoad ? video.src : ""}
          loop
          playsInline
          preload="none"
          muted
          onEnded={() => setPlaying(false)}
        />

        {/* Premium ribbon */}
        <div className="absolute left-3 top-3 rounded-md bg-gradient-primary px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-glow">
          Premium
        </div>
        <div className="absolute bottom-3 right-3 rounded bg-black/70 px-1.5 py-0.5 text-xs font-semibold text-white">
          {video.duration}
        </div>

        {/* Poster Overlay */}
        {showPosterOverlay && (
          <PosterOverlay
            posterUrl={video.poster}
            title={video.title}
            isVisible={!started}
            onPlayClick={play}
          />
        )}

        {/* floating reactions */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {floats.map((f) => (
            <span
              key={f.id}
              className="reaction-float absolute bottom-12 text-2xl"
              style={{ left: `${f.left}%` }}
            >
              {f.emoji}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <span className="section-eyebrow text-muted-foreground">{video.tag}</span>
        <h3 className="mt-1 line-clamp-2 text-base font-bold leading-snug">{video.title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {video.channel} · {video.views} views
        </p>

        <div className="mt-4 flex items-center gap-2">
          {playing ? (
            <button
              type="button"
              onClick={pause}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm font-semibold transition hover:border-primary"
            >
              <Pause className="h-4 w-4" /> Pause
            </button>
          ) : (
            <button
              type="button"
              onClick={play}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm font-semibold transition hover:border-primary"
            >
              <Play className="h-4 w-4" /> Play
            </button>
          )}

          <button
            type="button"
            onClick={watchFull}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-gradient-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90"
          >
            <Maximize2 className="h-4 w-4" /> Watch full clip
          </button>
        </div>

        {/* reaction buttons */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {REACTIONS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => react(emoji)}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-2 py-1 text-sm transition hover:scale-110 hover:border-primary active:scale-95"
            >
              <span>{emoji}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});
