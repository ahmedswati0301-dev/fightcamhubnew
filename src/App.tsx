import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/lib/theme";
import StickyBottomAd from "@/components/site/StickyBottomAd";
import Home from "@/pages/Home";
import Exclusive from "@/pages/Exclusive";
import NotFound from "@/pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <div className="min-h-screen pb-[90px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exclusive-videos" element={<Exclusive />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <StickyBottomAd />
      <Analytics />
    </ThemeProvider>
  );
}
