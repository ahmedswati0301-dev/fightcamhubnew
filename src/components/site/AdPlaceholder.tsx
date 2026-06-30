import { Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdPlaceholderProps {
  label?: string;
  variant?: "banner" | "box" | "native";
  className?: string;
}

/**
 * Drop-in ad slot. Replace the inner markup with real ad network code later.
 * The "Sponsored" labelling and sizing stay consistent across the whole site.
 */
export function AdPlaceholder({
  label = "Advertisement",
  variant = "banner",
  className,
}: AdPlaceholderProps) {
  const height =
    variant === "banner"
      ? "min-h-[110px] sm:min-h-[120px]"
      : variant === "box"
        ? "min-h-[260px]"
        : "min-h-[180px]";

  return (
    <div className={cn("container-site", className)}>
      <div
        className={cn(
          "flex w-full flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border bg-muted/40 px-4 py-6 text-center",
          height,
        )}
        data-ad-slot={variant}
      >
        <span className="section-eyebrow text-muted-foreground">
          <Megaphone className="h-3.5 w-3.5" /> Sponsored
        </span>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-xs text-muted-foreground/70">Ad space — ready for your network code</p>
      </div>
    </div>
  );
}
