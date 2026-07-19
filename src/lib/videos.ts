import live1Video from "@/assets/data/fight/live1.mp4";
import live2Video from "@/assets/data/fight/live2.mp4";
import live3Video from "@/assets/data/fight/live3.mp4";
import v1Video from "@/assets/data/fight/v1.mp4";
import v2Video from "@/assets/data/fight/v2.mp4";
import v3Video from "@/assets/data/fight/v3.mp4";
import v4Video from "@/assets/data/fight/v4.mp4";
import v5Video from "@/assets/data/fight/v5.mp4";
import v6Video from "@/assets/data/fight/v6.mp4";
import exlive1Video from "@/assets/data/exclusive/exlive1.mp4";
import exlive2Video from "@/assets/data/exclusive/exlive2.mp4";
import exlive3Video from "@/assets/data/exclusive/exlive3.mp4";
import exv1Video from "@/assets/data/exclusive/v1.mp4";
import exv2Video from "@/assets/data/exclusive/v2.mp4";
import exv3Video from "@/assets/data/exclusive/v3.mp4";
import exv4Video from "@/assets/data/exclusive/v4.mp4";
import exv5Video from "@/assets/data/exclusive/v5.mp4";
import exv6Video from "@/assets/data/exclusive/v6.mp4";

// Import poster images
import poster1 from "@/assets/data/fight/poster9.jpeg";
import poster2 from "@/assets/data/fight/poster8.jpeg";
import poster3 from "@/assets/data/fight/poster4.jpeg";
import poster4 from "@/assets/data/fight/poster5.jpeg";
import poster5 from "@/assets/data/fight/poster1.jpeg";
import poster7 from "@/assets/data/fight/poster3.jpeg";
import poster8 from "@/assets/data/fight/poster4.jpeg";
import poster9 from "@/assets/data/fight/poster1.jpeg";
import livePoster1 from "@/assets/data/fight/liveposter1.jpeg";
import livePoster2 from "@/assets/data/fight/liveposter2.jpeg";

// Import exclusive poster images
import exPoster1 from "@/assets/data/exclusive/a2.webp";
import exPoster2 from "@/assets/data/exclusive/a3.jpg";
import exPoster3 from "@/assets/data/exclusive/a4.jpg";
import exPoster4 from "@/assets/data/exclusive/a6.jpg";
import exPoster5 from "@/assets/data/exclusive/a8.jpg";
import exPoster6 from "@/assets/data/exclusive/a9.jpg";
import exPoster7 from "@/assets/data/exclusive/a10.jpg";
import exPoster8 from "@/assets/data/exclusive/a12.jpg";
import exPoster9 from "@/assets/data/exclusive/a13.jpg";


const BASE = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/";

export interface VideoItem {
  id: string;
  title: string;
  channel: string;
  duration: string;
  views: string;
  tag: string;
  src: string;
  poster: string;
  link: string;
  reactions?: Record<string, number>;
}

const sources = [
  "BigBuckBunny.mp4",
  "ElephantsDream.mp4",
  "ForBiggerBlazes.mp4",
  "ForBiggerEscapes.mp4",
  "ForBiggerFun.mp4",
  "ForBiggerJoyrides.mp4",
  "ForBiggerMeltdowns.mp4",
  "Sintel.mp4",
  "SubaruOutbackOnStreetAndDirt.mp4",
  "TearsOfSteel.mp4",
  "VolkswagenGTIReview.mp4",
  "WeAreGoingOnBullrun.mp4",
  "WhatCarCanYouGetForAGrand.mp4",
];

// Professional poster images array
const posterImages = [
  poster1,
  poster2,
  poster3,
  poster4,
  poster5,
  poster7,
  poster8,
  poster9,
];

// Exclusive poster images array
const exclusivePosterImages = [
  exPoster1,
  exPoster2,
  exPoster3,
  exPoster4,
  exPoster5,
  exPoster6,
  exPoster7,
  exPoster8,
  exPoster9,
];

const poster = (seed: string, index: number = 0) => {
  // Use local poster images, cycling through available posters
  return posterImages[index % posterImages.length];
};

const exclusivePoster = (seed: string, index: number = 0) => {
  // Use exclusive poster images, cycling through available posters
  return exclusivePosterImages[index % exclusivePosterImages.length];
};

function make(seed: string, i: number, data: Partial<VideoItem>): VideoItem {
  return {
    id: seed,
    title: data.title ?? "Untitled Clip",
    channel: data.channel ?? "FightCam",
    duration: data.duration ?? "12:04",
    views: data.views ?? "128K",
    tag: data.tag ?? "Highlight",
    src: BASE + sources[i % sources.length],
    poster: poster(seed, i),
    link: "#",
    ...data,
  };
}

export const liveVideos: VideoItem[] = [
  {
    id: "live-1",
    title: "Title Fight — Round 3 LIVE",
    channel: "Main Card",
    duration: "12:04",
    views: "42.1K",
    tag: "Main Event",
    src: live1Video,
    poster: poster("live-1", 0),
    link: "#",
    reactions: { "❤️": 10400, "🔥": 8900, "😮": 5600, "👊": 12100, "😂": 1200 },
  },
  {
    id: "live-2",
    title: "Co-Main Brawl Streaming Now",
    channel: "Octagon One",
    duration: "12:04",
    views: "31.7K",
    tag: "Co-Main",
    src: live2Video,
    poster: livePoster1,
    link: "#",
    reactions: { "❤️": 8600, "🔥": 9800, "😮": 3200, "👊": 11500, "😂": 950 },
  },
  {
    id: "live-3",
    title: "Prelims Knockout Cam LIVE",
    channel: "Cage Side",
    duration: "12:04",
    views: "18.9K",
    tag: "Prelims",
    src: live3Video,
    poster: livePoster2,
    link: "#",
    reactions: { "❤️": 5200, "🔥": 6700, "😮": 2100, "👊": 8900, "😂": 680 },
  },
  {
    id: "live-4",
    title: "Undercard Spotlight LIVE",
    channel: "Fight Card",
    duration: "12:04",
    views: "14.3K",
    tag: "Undercard",
    src: v4Video,
    poster: poster("live-4", 3),
    link: "#",
    reactions: { "❤️": 3100, "🔥": 4200, "😮": 1800, "👊": 5600, "😂": 420 },
  },
  {
    id: "live-5",
    title: "Interim Title Match LIVE",
    channel: "Prime Time",
    duration: "12:04",
    views: "22.5K",
    tag: "Interim Title",
    src: v5Video,
    poster: poster("live-5", 4),
    link: "#",
    reactions: { "❤️": 9200, "🔥": 11300, "😮": 4700, "👊": 14200, "😂": 1500 },
  },
  {
    id: "live-6",
    title: "Champions League Finals LIVE",
    channel: "Elite Fighters",
    duration: "12:04",
    views: "35.8K",
    tag: "Championship",
    src: v6Video,
    poster: poster("live-6", 5),
    link: "#",
    reactions: { "❤️": 15600, "🔥": 18900, "😮": 7200, "👊": 21100, "😂": 2800 },
  },
];

export const trendingVideos: VideoItem[] = [
  {
    id: "trend-1",
    title: "Brutal Spinning Back Kick KO",
    channel: "Fight Zone",
    duration: "08:32",
    views: "1.2M",
    tag: "Knockout",
    src: v1Video,
    poster: poster("trend-1", 6),
    link: "#",
  },
  {
    id: "trend-2",
    title: "Comeback of the Year — Round 5",
    channel: "Main Event",
    duration: "14:10",
    views: "904K",
    tag: "Highlight",
    src: v2Video,
    poster: poster("trend-2", 7),
    link: "#",
  },
  {
    id: "trend-3",
    title: "Submission Masterclass",
    channel: "Cage Control",
    duration: "10:45",
    views: "756K",
    tag: "Submission",
    src: v3Video,
    poster: poster("trend-3", 8),
    link: "#",
  },
  {
    id: "trend-4",
    title: "Ground Game Genius",
    channel: "Grappling Elite",
    duration: "09:15",
    views: "645K",
    tag: "Grappling",
    src: v4Video,
    poster: poster("trend-4", 9),
    link: "#",
  },
  {
    id: "trend-5",
    title: "Striking Combination Breakdown",
    channel: "Combat Strikes",
    duration: "11:20",
    views: "892K",
    tag: "Striking",
    src: v5Video,
    poster: poster("trend-5", 10),
    link: "#",
  },
  {
    id: "trend-6",
    title: "Championship Finals Highlights",
    channel: "Elite Moments",
    duration: "13:45",
    views: "1.5M",
    tag: "Finals",
    src: v6Video,
    poster: poster("trend-6", 11),
    link: "#",
  },
];


export interface Category {
  name: string;
  blurb: string;
  videos: VideoItem[];
}

export const categories: Category[] = [
  {
    name: "Knockouts",
    blurb: "Lights-out finishes you can't look away from.",
    videos: Array.from({ length: 6 }, (_, i) =>
      make(`ko-${i}`, i + 1, {
        title: `Knockout Reel #${i + 1}`,
        tag: "Knockout",
        views: `${300 + i * 37}K`,
      }),
    ),
  },
  {
    name: "Submissions",
    blurb: "Technical finishes and slick ground game.",
    videos: Array.from({ length: 6 }, (_, i) =>
      make(`sub-${i}`, i + 3, {
        title: `Submission Reel #${i + 1}`,
        tag: "Grappling",
        views: `${210 + i * 29}K`,
      }),
    ),
  },
  {
    name: "Striking Clinics",
    blurb: "Pure stand-up wizardry from the elite.",
    videos: Array.from({ length: 6 }, (_, i) =>
      make(`str-${i}`, i + 5, {
        title: `Striking Clinic #${i + 1}`,
        tag: "Striking",
        views: `${180 + i * 24}K`,
      }),
    ),
  },
];

/* ---- Exclusive page content ---- */
export const exclusiveLive: VideoItem[] = [
  {
    id: "xlive-1",
    title: "Ava — Main Event LIVE",
    channel: "Exclusive",
    duration: "12:04",
    views: "12.4K",
    tag: "PPV",
    src: exlive1Video,
    poster: exclusivePoster("xlive-1", 0),
    link: "#",
    reactions: { "❤️": 6200, "🔥": 7400, "😮": 2900, "👊": 9100, "😂": 750 },
  },
  {
    id: "xlive-2",
    title: "Luna — Walkout Cam LIVE",
    channel: "Exclusive",
    duration: "12:04",
    views: "8.9K",
    tag: "Backstage",
    src: exlive2Video,
    poster: exclusivePoster("xlive-2", 1),
    link: "#",
    reactions: { "❤️": 4100, "🔥": 5200, "😮": 1600, "👊": 6700, "😂": 520 },
  },
  {
    id: "xlive-3",
    title: "Mia — Corner Cam LIVE",
    channel: "Exclusive",
    duration: "12:04",
    views: "5.2K",
    tag: "Corner Cam",
    src: exlive3Video,
    poster: exclusivePoster("xlive-3", 2),
    link: "#",
    reactions: { "❤️": 2300, "🔥": 3100, "😮": 980, "👊": 4200, "😂": 340 },
  },
  {
    id: "xlive-4",
    title: "Nina — VIP Lounge LIVE",
    channel: "Exclusive",
    duration: "12:04",
    views: "9.1K",
    tag: "VIP",
    src: exv4Video,
    poster: exclusivePoster("xlive-4", 3),
    link: "#",
    reactions: { "❤️": 5400, "🔥": 6300, "😮": 2100, "👊": 7600, "😂": 620 },
  },
  {
    id: "xlive-5",
    title: "Zara — Backstage LIVE",
    channel: "Exclusive",
    duration: "12:04",
    views: "7.8K",
    tag: "Backstage",
    src: exv5Video,
    poster: exclusivePoster("xlive-5", 4),
    link: "#",
    reactions: { "❤️": 4800, "🔥": 5600, "😮": 1800, "👊": 6800, "😂": 510 },
  },
];

export const exclusiveTrending: VideoItem[] = [
  {
    id: "xtrend-1",
    title: "Champion Ella — Training Camp",
    channel: "Elite Series",
    duration: "07:21",
    views: "540K",
    tag: "Training",
    src: exv1Video,
    poster: exclusivePoster("xtrend-1", 3),
    link: "#",
  },
  {
    id: "xtrend-2",
    title: "Rising Star Sarah — Full Fight",
    channel: "Next Gen",
    duration: "18:30",
    views: "412K",
    tag: "Full Fight",
    src: exv2Video,
    poster: exclusivePoster("xtrend-2", 4),
    link: "#",
  },
  {
    id: "xtrend-3",
    title: "Champion Alex — Knockout Reel",
    channel: "Elite Moments",
    duration: "22:05",
    views: "300K",
    tag: "Highlights",
    src: exv3Video,
    poster: exclusivePoster("xtrend-3", 5),
    link: "#",
  },
  {
    id: "xtrend-4",
    title: "Fighter Zara — Technique Breakdown",
    channel: "Masters",
    duration: "05:44",
    views: "688K",
    tag: "Analysis",
    src: exv4Video,
    poster: exclusivePoster("xtrend-4", 6),
    link: "#",
  },
  {
    id: "xtrend-5",
    title: "Champion Jamie — Exclusive Interview",
    channel: "One-on-One",
    duration: "11:12",
    views: "256K",
    tag: "Interview",
    src: exv5Video,
    poster: exclusivePoster("xtrend-5", 7),
    link: "#",
  },
  {
    id: "xtrend-6",
    title: "Rising Star Mia — Full Camp Access",
    channel: "Behind Scenes",
    duration: "04:38",
    views: "489K",
    tag: "Access",
    src: exv6Video,
    poster: exclusivePoster("xtrend-6", 8),
    link: "#",
  },
];

export const exclusiveCategories: Category[] = [
  {
    name: "Pay-Per-View Vault",
    blurb: "Full premium events, members only.",
    videos: Array.from({ length: 6 }, (_, i) =>
      make(`xppv-${i}`, i + 2, {
        title: `PPV Vault #${i + 1}`,
        tag: "PPV",
        views: `${90 + i * 18}K`,
      }),
    ),
  },
  {
    name: "Behind The Cage",
    blurb: "Raw, unfiltered access you won't find anywhere else.",
    videos: Array.from({ length: 6 }, (_, i) =>
      make(`xbtc-${i}`, i + 4, {
        title: `Behind The Cage #${i + 1}`,
        tag: "Exclusive",
        views: `${70 + i * 21}K`,
      }),
    ),
  },
];
