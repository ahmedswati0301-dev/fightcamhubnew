import { memo, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, MessageCircle, Bookmark, Heart, Repeat, Send, Download, Play } from "lucide-react";
import type { VideoItem } from "@/lib/videos";

interface FloatingHeart {
  id: string;
  left: number;
  scale: number;
  duration: number;
  delay: number;
}

export const LiveCard = memo(function LiveCard({ video, monetizationUrl = "https://consciousdunkvastly.com/hu3d2ui1?key=c6dfa5e4b94e4987e31e7c7c7502de12", autoPlay = false }: { video: VideoItem; monetizationUrl?: string; autoPlay?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [saved, setSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(autoPlay);
  const [hasLoaded, setHasLoaded] = useState(false);
  
  const formattedLikes = "12K";

  // Get poster from video data
  const posterImage = video.poster; 

  const triggerHeartsBurst = () => {
    const burstCount = Math.floor(Math.random() * 4) + 5;
    const newHearts: FloatingHeart[] = [];

    for (let i = 0; i < burstCount; i++) {
      // Created a perfectly safe unique crypto-style string fallback ID
      const uniqueId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${i}`;
      newHearts.push({
        id: uniqueId,
        left: 75 + (Math.random() * 16 - 8), 
        scale: 0.7 + Math.random() * 0.5,
        duration: 2.0 + Math.random() * 0.8, 
        delay: i * 0.12 
      });
    }

    setHearts((prev) => [...prev, ...newHearts]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.some((nh) => nh.id === h.id)));
    }, 3500);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerHeartsBurst();
    setIsLiked(!isLiked);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    if (!shouldLoad) {
      el.pause();
      if (el.getAttribute("src") !== video.src) {
        el.src = video.src;
      }
      return;
    }

    if (el.getAttribute("src") !== video.src) {
      el.src = video.src;
    }

    void el.play().catch(() => undefined);
  }, [shouldLoad, video.src]);

  useEffect(() => {
    const handleActivation = (event: Event) => {
      const customEvent = event as CustomEvent<{ id: string }>;
      if (customEvent.detail?.id === video.id) return;

      const el = videoRef.current;
      if (!el) return;

      el.pause();
      setShouldLoad(false);
    };

    window.addEventListener("livecard:activate", handleActivation as EventListener);
    return () => window.removeEventListener("livecard:activate", handleActivation as EventListener);
  }, [video.id]);

  const handlePlay = () => {
    const el = videoRef.current;
    if (!el) return;

    window.dispatchEvent(new CustomEvent("livecard:activate", { detail: { id: video.id } }));
    setShouldLoad(true);
    setHasLoaded(true);

    if (el.getAttribute("src") !== video.src) {
      el.src = video.src;
    }

    void el.play().catch(() => undefined);
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-md w-full max-w-[400px] h-[540px] sm:h-[610px] transition hover:-translate-y-1">
      
      {/* Pure CSS Keyframes injection */}
      <style>{`
        @keyframes fbLiveHeart {
          0% { 
            transform: translateY(0) scale(0.6); 
            opacity: 0; 
          }
          10% { 
            opacity: 0.95; 
          }
          30% { 
            transform: translateY(-100px) translateX(-15px) scale(1.1); 
          }
          60% { 
            transform: translateY(-220px) translateX(15px) scale(0.95); 
          }
          100% { 
            transform: translateY(-340px) translateX(-5px) scale(0.7); 
            opacity: 0; 
          }
        }
        .fb-heart-element {
          animation-name: fbLiveHeart;
          animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
          animation-fill-mode: forwards;
        }
      `}</style>

      {/* Tall Media Feed Container */}
      <div className="relative w-full h-[430px] sm:h-[490px] overflow-hidden bg-black">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={video.src}
          muted
          loop
          playsInline
          preload="none"
        />

        {!shouldLoad ? (
          posterImage ? (
            <button
              type="button"
              onClick={handlePlay}
              aria-label={`Play ${video.title}`}
              className="absolute inset-0 overflow-hidden bg-black/20 transition hover:bg-black/30 group-hover:bg-black/40"
            >
              {/* Poster Image */}
              <img
                src={posterImage}
                alt={video.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

              {/* Play Button */}
              <div className="absolute inset-0 grid place-items-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-white/90 text-black shadow-lg transition group-hover:scale-110">
                  <Play className="ml-0.5 h-6 w-6" />
                </span>
              </div>
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePlay}
              aria-label={`Play ${video.title}`}
              className="absolute inset-0 grid place-items-center bg-black/30 transition hover:bg-black/40"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full bg-white/90 text-black shadow-lg">
                <Play className="ml-0.5 h-6 w-6" />
              </span>
            </button>
          )
        ) : null}

        {/* Live status badge */}
        <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
          <span className="h-2 w-2 rounded-full bg-white animate-pulse" /> Live
        </div>

        {/* Viewers layer */}
        <div className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
          {video.views} watching
        </div>

        {/* Mute controller toggle */}
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
          className="absolute bottom-3 left-3 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-primary z-10"
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>

        {/* Facebook Live-Style Floating Layer */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-20">
          {hearts.map((heart) => (
            <span
              key={heart.id}
              className="absolute bottom-6 text-2xl fb-heart-element drop-shadow-lg select-none"
              style={{
                left: `${heart.left}%`,
                transform: `scale(${heart.scale})`,
                animationDuration: `${heart.duration}s`,
                animationDelay: `${heart.delay}s`,
                opacity: 0
              }}
            >
              ❤️
            </span>
          ))}
        </div>
      </div>

      {/* Action Bar Layout Bundle */}
      <div className="px-4 pt-4 flex items-center justify-between bg-card">
        {/* Left Side Icons Bundle */}
        <div className="flex items-center gap-5">
          <button 
            type="button" 
            onClick={handleLikeClick}
            className="transition hover:scale-110 active:scale-90 text-foreground"
          >
            <Heart className={`h-6 w-6 transition-colors ${isLiked ? "fill-destructive text-destructive" : ""}`} />
          </button>
          
          <button 
            type="button" 
            className="transition hover:scale-110 active:scale-90 text-foreground"
          >
            <MessageCircle className="h-6 w-6" />
          </button>

          <button 
            type="button" 
            className="transition hover:scale-110 active:scale-90 text-foreground"
          >
            <Repeat className="h-5 w-5" />
          </button>

          <button 
            type="button" 
            className="transition hover:scale-110 active:scale-90 text-foreground -rotate-12"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>

        {/* Right Side Icons Bundle (Bookmark + Monetized Download Link) */}
        <div className="flex items-center gap-4">
          <a
            href={monetizationUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="transition hover:scale-110 active:scale-90 text-foreground"
            aria-label="Download Content"
          >
            <Download className="h-6 w-6" />
          </a>

          <button 
            type="button" 
            onClick={(e) => {
              e.stopPropagation();
              setSaved(!saved);
            }}
            className="transition hover:scale-110 active:scale-90 text-foreground"
          >
            <Bookmark className={`h-6 w-6 transition-colors ${saved ? "fill-primary text-primary" : ""}`} />
          </button>
        </div>
      </div>

      {/* Counter block */}
      <div className="px-4 pb-4 pt-2 bg-card">
        <span className="text-sm font-bold text-foreground">
          {formattedLikes} likes
        </span>
      </div>

    </div>
  );
});