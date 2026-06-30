import { Navbar } from "./Navbar";
import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { LiveCard } from "./LiveCard";
import { VideoCard } from "./VideoCard";
import { AdPlaceholder } from "./AdPlaceholder";
import { NativeAd } from "./NativeAd";
import { SectionHeading } from "./SectionHeading";
import type { VideoItem } from "@/lib/videos";

interface FightPageProps {
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    description: string;
    image: string;
    browseTo: "/" | "/exclusive-videos";
    browseLabel: string;
    liveButtonLabel?: string;
  };
  live: VideoItem[];
  trending: VideoItem[];
  trendingHeading: { eyebrow: string; title: string; description: string };
  monetizationUrl?: string;
  afterTrending?: ReactNode;
  showPosterOverlay?: boolean;
}

const DEFAULT_MONETIZATION_URL = "https://consciousdunkvastly.com/hu3d2ui1?key=c6dfa5e4b94e4987e31e7c7c7502de12";

export function FightPage({ 
  hero, 
  live, 
  trending, 
  trendingHeading, 
  monetizationUrl = DEFAULT_MONETIZATION_URL,
  afterTrending,
  showPosterOverlay = true,
}: FightPageProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <Hero {...hero} monetizationUrl={monetizationUrl} />

        {/* LIVE SECTION */}
        <section id="live" className="container-site scroll-mt-20 py-12 sm:py-16">
          <SectionHeading
            eyebrow="On Air Now"
            title="Live Fights"
            description="Multiple cage cams streaming right now. React in real time as the action unfolds."
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {live.slice(0, 3).map((v, index) => (
              <LiveCard key={v.id} video={v} monetizationUrl={monetizationUrl} autoPlay={index === 0} />
            ))}
          </div>
        </section>

        {/* Ad after Live */}
        <NativeAd 
          containerId="container-7d51d72e5c329b69928a15c5f0b41428" 
          scriptUrl="https://pl29786100.effectivecpmnetwork.com/7d51d72e5c329b69928a15c5f0b41428/invoke.js"
        />

        {/* TRENDING SECTION */}
        <section className="container-site py-12 sm:py-16">
          <SectionHeading {...trendingHeading} />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trending.map((v) => (
              <VideoCard
                key={v.id}
                video={v}
                monetizationUrl={monetizationUrl}
                showPosterOverlay={showPosterOverlay}
              />
            ))}
          </div>
        </section>

        {/* OPTIONAL: content rendered only on certain pages (e.g. Exclusive) */}
        {afterTrending}

        {/* Ad after Videos */}
        <NativeAd 
          containerId="container-34068a639071da7395050a7fa47db6a1" 
          scriptUrl="https://consciousdunkvastly.com/34068a639071da7395050a7fa47db6a1/invoke.js"
        />
      </main>

      <Footer />
    </div>
  );
}
