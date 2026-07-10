import { useEffect } from "react";

interface NativeAdProps {
  containerId: string;
  scriptUrl: string;
}

export function NativeAd({ containerId, scriptUrl }: NativeAdProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const renderAd = () => {
      const container = document.getElementById(containerId);
      if (!container) return;

      container.innerHTML = "";

      const existingScripts = Array.from(
        document.querySelectorAll(`script[data-native-ad-slot="${containerId}"]`)
      );
      existingScripts.forEach((script) => script.remove());

      const script = document.createElement("script");
      script.src = scriptUrl;
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.setAttribute("data-native-ad-slot", containerId);
      document.body.appendChild(script);
    };

    renderAd();
    const intervalId = window.setInterval(renderAd, 30000 + Math.floor(Math.random() * 5000));

    return () => {
      window.clearInterval(intervalId);
      const existingScripts = Array.from(
        document.querySelectorAll(`script[data-native-ad-slot="${containerId}"]`)
      );
      existingScripts.forEach((script) => script.remove());
    };
  }, [containerId, scriptUrl]);

  return (
    <div className="relative py-10">
      <div className="container-site">
        <div className="flex w-full flex-col items-center justify-center rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm">
          <div id={containerId} className="min-h-[240px] w-full flex items-center justify-center">
            <p className="text-xs text-muted-foreground">Loading premium ad...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
