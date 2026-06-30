import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface AdLeaderboardProps {
  className?: string;
  containerId?: string;
  adKey?: string;
  scriptSrc?: string;
}

export function AdLeaderboard({ 
  className, 
  containerId = "at-ad-container",
  adKey = "591e31908d117513a5daf867dcb90455",
  scriptSrc = "https://consciousdunkvastly.com/591e31908d117513a5daf867dcb90455/invoke.js"
}: AdLeaderboardProps) {
  useEffect(() => {
    // Load and execute the ad script
    const script = document.createElement("script");
    script.innerHTML = `
      atOptions = {
        'key' : '${adKey}',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    `;
    document.head.appendChild(script);

    // Load the invoke script
    const invokeScript = document.createElement("script");
    invokeScript.src = scriptSrc;
    invokeScript.async = true;
    document.head.appendChild(invokeScript);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
      if (invokeScript.parentNode) invokeScript.parentNode.removeChild(invokeScript);
    };
  }, [adKey, scriptSrc]);

  return (
    <div className={cn("container-site py-6 sm:py-8", className)}>
      <div className="flex w-full justify-center rounded-lg bg-card/40 p-4 backdrop-blur-sm border border-border/50">
        <div id={containerId} className="flex items-center justify-center min-h-[100px]">
          <p className="text-xs text-muted-foreground">Loading ad...</p>
        </div>
      </div>
    </div>
  );
}
