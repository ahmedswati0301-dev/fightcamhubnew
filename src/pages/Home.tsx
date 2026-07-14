import React, { Suspense } from "react";
import { Seo } from "@/components/site/Seo";
import { liveVideos, trendingVideos } from "@/lib/videos";
import heroImage from "@/assets/hero-fight.jpg";

// React.lazy se hum FightPage ko dynamic import kar rahe hain 
// Is se dynamic mounting bilkul pure client-side par fast processing ke sath hogi
const FightPage = React.lazy(() =>
  import("@/components/site/FightPage").then((module) => ({
    default: module.FightPage,
  }))
);

export default function Home() {
  return (
    <>
      <Seo
        title="FightCam Hub — Live Fights, Knockouts & Premium Highlights"
        description="Stream live cage cams, top trending knockouts and exclusive fight highlights on FightCam Hub. Your front-row seat to the fight."
      />

      {/* Suspense lagana zaroori hai lazy loading ke liye */}
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <FightPage
          hero={{
            eyebrow: "LIVE EVENT RUNNING NOW",
            title: "STREET FIGHT. ",
            highlight: " VIRAL KNOCKOUTS",
            description:
              "FightCam Hub puts you cage-side for live fights, replay the biggest knockouts, and binge premium highlight reels — all in one place.",
            image: heroImage,
            browseTo: "/exclusive-videos",
            browseLabel: "Browse More",
          }}
          live={liveVideos}
          trending={trendingVideos}
          showPosterOverlay={true}
          trendingHeading={{
            eyebrow: "Most Watched",
            title: "Top Trending Videos",
            description:
              "The clips everyone's talking about right now — finishes, comebacks and chaos.",
          }}
        />
      </Suspense>
    </>
  );
}