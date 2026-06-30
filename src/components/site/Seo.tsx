import { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
}

/** Lightweight client-side document head manager for the static SPA. */
export function Seo({ title, description }: SeoProps) {
  useEffect(() => {
    document.title = title;
    const setMeta = (selector: string, attr: string, name: string, content: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
  }, [title, description]);

  return null;
}
