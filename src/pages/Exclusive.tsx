import { FightPage } from "@/components/site/FightPage";
import { LiveChat } from "@/components/site/LiveChat";
import { Seo } from "@/components/site/Seo";
import { exclusiveLive, exclusiveTrending } from "@/lib/videos";
import heroImage from "@/assets/ehero.jfif";

export default function Exclusive() {
  return (
    <>
      <Seo
        title="Exclusive Videos — FightCam Hub"
        description="Members-only fight content on FightCam Hub: PPV vault, director's cut highlights and behind-the-cage access you won't find anywhere else."
      />
      <FightPage
        hero={{
          eyebrow: "Members Exclusive",
          title: "Private Frames.",
          highlight: "Unlimited Access.",
          description:
            "Premium 18+ exclusive videos and uncensored content for verified members. Must be 18 years or older to access.",
          image: heroImage,
          browseTo: "/",
          browseLabel: "Back to Home",
          liveButtonLabel: "Live Call",
        }}
        live={exclusiveLive}
        liveLimit={5}
        trending={exclusiveTrending}
        showPosterOverlay={true}
        trendingHeading={{
          eyebrow: "Exclusive Drops",
          title: "Top Trending Exclusives",
          description: "Premium clips reserved for the Exclusive Hub community.",
        }}
        monetizationUrl="https://www.effectivecpmnetwork.com/nsi7cseg?key=00a0faf43d9814220bf1d3cbc06892fa"
        afterTrending={<LiveChat monetizationUrl="https://www.effectivecpmnetwork.com/nsi7cseg?key=00a0faf43d9814220bf1d3cbc06892fa" />}
      />
    </>
  );
}
