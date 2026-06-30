import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const POPUNDER_SCRIPT_URL =
  "https://consciousdunkvastly.com/79/7d/b0/797db0781a89da82e23e454fdda499db.js";
let popunderInjected = false;

export default function PopunderModal({ delayMs = 25000 }: { delayMs?: number }) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const timerRef = useRef<number | null>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  const SESSION_KEY = "premium_popunder_seen";
  const triggerDelayMs = Math.max(delayMs, 25000);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;

    if (popunderInjected) return;
    if (sessionStorage.getItem(SESSION_KEY)) {
      popunderInjected = true;
      return;
    }

    const cleanupTimer = () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    // Open popunder after 25 seconds of the user being on the site
    timerRef.current = window.setTimeout(() => {
      if (popunderInjected) return;
      setIsVisible(true);
    }, triggerDelayMs);

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        cleanupTimer();
      }
    });
    window.addEventListener("beforeunload", cleanupTimer);

    return () => {
      window.removeEventListener("beforeunload", cleanupTimer);
      cleanupTimer();
    };
  }, [delayMs]);

  useEffect(() => {
    if (!isVisible || typeof window === "undefined") return;
    if (popunderInjected) return;

    const existing = Array.from(document.scripts).find((script) =>
      Boolean(script.src && script.src.includes("797db0781a89da82e23e454fdda499db.js"))
    );
    if (existing) {
      popunderInjected = true;
      sessionStorage.setItem(SESSION_KEY, "1");
      return;
    }

    const script = document.createElement("script");
    script.src = POPUNDER_SCRIPT_URL;
    script.async = true;
    script.type = "text/javascript";
    script.dataset.popunder = "true";
    scriptRef.current = script;

    const appendScript = () => {
      if (scriptRef.current && !document.body.contains(scriptRef.current)) {
        document.body.appendChild(scriptRef.current);
      }
    };

    appendScript();

    return () => {
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
    };
  }, [isVisible]);

  const closeModal = () => {
    setIsClosing(true);
    if (!popunderInjected) {
      popunderInjected = true;
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch (error) {}
    }
    window.setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
    }, 300);
  };

  const handleClaim = () => {
    closeModal();
  };

  if (!mounted) return null;
  if (!isVisible) return null;

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center px-4 py-6 font-sans">
      {/* Dark Blur Overlay matching the site's dark aesthetic */}
      <div
        className={`absolute inset-0 bg-neutral-950/70 backdrop-blur-sm transition-opacity duration-300 ${
          isClosing ? "opacity-0" : "opacity-100"
        }`}
        onClick={closeModal}
      />
      
      {/* Container Card with fully transparent background and glassmorphic blur */}
      <div
        className={`relative w-full max-w-xl transform transition-all duration-300 ${
          isClosing ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
      >
        {/* Modal Main Body: Changed to high-end transparent bg-neutral-950/40 */}
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-neutral-950/40 px-6 py-10 sm:px-10 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.8)] backdrop-blur-md">
          
          {/* Subtle Red Ambient Light in the background */}
          <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-red-600/15 blur-3xl pointer-events-none" />

          {/* Clean Circular Close Button */}
          <button
            onClick={closeModal}
            aria-label="Close offer"
            className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-400 transition-all hover:bg-white/10 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Live Status Pill Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-900 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
              STREAMING LIVE 24/7
            </div>
          </div>

          {/* Heading using the signature bold accent split */}
          <h2 className="mb-4 text-center text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
            EVERY STREAM . <span className="text-red-600">EVERY FINISH</span>
          </h2>
          
          <p className="mx-auto mb-8 max-w-sm text-center text-xs leading-relaxed text-neutral-200 sm:text-sm">
            Unlock cage-side access for live fight feeds, instant replays, and binge premium highlight reels in stunning high-bitrate quality.
          </p>

          {/* Action Row replicating the round pill button shapes exactly */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            {/* Primary Action Button - Matches "Live Fights" button style */}
            <button
              onClick={handleClaim}
              className="inline-flex items-center justify-center rounded-full bg-red-600 px-8 py-3.5 text-sm font-bold tracking-wide text-white transition-all duration-200 hover:bg-red-700 active:scale-[0.99] w-full sm:w-auto min-w-[170px]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653Z" />
              </svg>
              Watch Live
            </button>
            
            {/* Secondary Action Button - Matches "Browse More" button style */}
            <button
              onClick={closeModal}
              className="inline-flex items-center justify-center rounded-full bg-white/90 px-8 py-3.5 text-sm font-bold tracking-wide text-neutral-900 transition-all duration-200 hover:bg-white w-full sm:w-auto min-w-[170px]"
            >
              Browse More
            </button>
          </div>

          {/* Clean, Non-intrusive Verification Subtext */}
          <div className="mt-8 flex items-center justify-center gap-1.5 text-[11px] text-neutral-400">
            <span>🔥</span>
            <span>More Viral Clips Below</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}