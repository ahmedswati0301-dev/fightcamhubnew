import { memo } from "react";
import { Play } from "lucide-react";

interface PosterOverlayProps {
  posterUrl: string;
  title: string;
  isVisible: boolean;
  onPlayClick: () => void;
}

export const PosterOverlay = memo(function PosterOverlay({
  posterUrl,
  title,
  isVisible,
  onPlayClick,
}: PosterOverlayProps) {
  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={onPlayClick}
      aria-label={`Play ${title}`}
      className="absolute inset-0 overflow-hidden bg-black/20 transition-all duration-300 hover:bg-black/30 group-hover:bg-black/40"
    >
      {/* Poster Image */}
      <img
        src={posterUrl}
        alt={title}
        className="h-full w-full object-cover"
        loading="lazy"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

      {/* Play Button */}
      <div className="absolute inset-0 grid place-items-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow transition group-hover:scale-110">
          <Play className="ml-0.5 h-6 w-6" />
        </span>
      </div>
    </button>
  );
});
