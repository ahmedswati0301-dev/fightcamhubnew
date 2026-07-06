const VIBRATION_DURATION_MS = 100;
const CANDIDATE_TAGS = new Set(["div", "span", "iframe", "a", "section", "aside"]);
const SOCIAL_AD_HINTS = /social|adsterra|ad|bar|widget|banner/i;

function isLikelySocialBarAd(element: HTMLElement): boolean {
  const text = [
    element.id,
    element.className,
    element.getAttribute("data-ad"),
    element.getAttribute("aria-label"),
    element.getAttribute("title"),
    element.getAttribute("src"),
    element.getAttribute("style"),
  ]
    .filter(Boolean)
    .join(" ");

  if (!text) return false;

  const tagName = element.tagName.toLowerCase();
  const isCandidateTag = CANDIDATE_TAGS.has(tagName);
  const hasSocialHint = /social/i.test(text) || /adsterra/i.test(text);
  const hasBarHint = /bar/i.test(text);
  const hasAdHint = /ad/i.test(text);
  const hasBannerHint = /banner|widget/i.test(text);
  const looksLikeFixedAd = /position:\s*(fixed|sticky)/i.test(text) || /bottom:\s*\d/i.test(text);

  return (
    isCandidateTag &&
    (hasSocialHint || hasBarHint || hasBannerHint || looksLikeFixedAd) &&
    (hasAdHint || hasSocialHint || hasBarHint || hasBannerHint || looksLikeFixedAd)
  );
}

function isElementVisible(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  const isRectVisible =
    rect.width > 0 &&
    rect.height > 0 &&
    rect.top < window.innerHeight &&
    rect.bottom > 0 &&
    rect.left < window.innerWidth &&
    rect.right > 0;

  if (!isRectVisible) return false;

  const style = window.getComputedStyle(element);
  return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0";
}

export function initAdVibration(): void {
  if (typeof window === "undefined" || typeof navigator === "undefined") return;
  if (typeof navigator.vibrate !== "function") return;

  const alreadyTriggered = new WeakSet<HTMLElement>();

  const triggerVibration = (element: HTMLElement) => {
    if (alreadyTriggered.has(element)) return;

    alreadyTriggered.add(element);

    try {
      navigator.vibrate(VIBRATION_DURATION_MS);
    } catch {
      // Fail silently when vibration is unavailable or blocked.
    }
  };

  const handleElement = (element: HTMLElement) => {
    if (!isLikelySocialBarAd(element)) return;

    if (isElementVisible(element)) {
      triggerVibration(element);
      return;
    }

    if (typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0) {
              triggerVibration(entry.target as HTMLElement);
              observer.disconnect();
            }
          });
        },
        { threshold: [0.01, 0.1] },
      );

      observer.observe(element);
    }
  };

  const scanNode = (root: ParentNode | null) => {
    if (!root || !(root instanceof HTMLElement)) return;

    root.querySelectorAll<HTMLElement>("div, span, iframe, a, section, aside").forEach(handleElement);
  };

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;

        handleElement(node);
        node.querySelectorAll<HTMLElement>("div, span, iframe, a, section, aside").forEach(handleElement);
      });
    });
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
  scanNode(document.body);

  window.setTimeout(() => scanNode(document.body), 500);
  window.setTimeout(() => scanNode(document.body), 1500);
}
