import { useEffect } from "react";

interface NativeAdProps {
  containerId: string;
  scriptUrl: string;
}

export function NativeAd({ containerId, scriptUrl }: NativeAdProps) {
  useEffect(() => {
    // Load the external ad script once per unique script URL
    const existingScript = document.querySelector(
      `script[src="${scriptUrl}"]`
    );
    
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = scriptUrl;
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      document.body.appendChild(script);

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, [scriptUrl]);

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
