import { useState, useEffect, useRef } from "react";
import { MessageSquare, Sparkles, Video, ShieldAlert, Send, Flame, Gift, Heart } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

interface ChatMessage {
  id: string;
  author: string;
  text: string;
  isSystem?: boolean;
  isPremium?: boolean;
  bubbleStyle?: string;
  badgeStyle?: string;
}

// Specialized high-fidelity data arrays representing active room simulation hosts
const STREAMING_GIRLS = [
  { name: "Chloe_Glow", badge: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
  { name: "Zara_VIP", badge: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  { name: "Jessica_X", badge: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
  { name: "Elena_Live", badge: "text-teal-400 bg-teal-500/10 border-teal-500/20" },
  { name: "Mia_Princess", badge: "text-pink-400 bg-pink-500/10 border-pink-500/20" },
  { name: "Ruby_Red", badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" }
];

const STREAMING_PHRASES = [
  "Hey guys! Just hopped into the main lobby room! 💋",
  "Who is active right now? Tap that Live Call link up top!",
  "Private session is open for 1-on-1 calls right now!",
  "Just uploaded an exclusive clip, don't miss it. 🔥",
  "Is anyone going to join me on camera today? 🙌",
  "Check my pin updates if you want the premium layout details!",
  "Sending love to everyone clicking through! Drop a super like! ✨"
];

export function LiveChat({ monetizationUrl = "https://consciousdunkvastly.com/hu3d2ui1?key=c6dfa5e4b94e4987e31e7c7c7502de12" }: { monetizationUrl?: string }) {
  const [chatFeed, setChatFeed] = useState<ChatMessage[]>([
    { id: "init-1", author: "SYSTEM", text: "Global multi-host room active. Verification standard filter is live.", isSystem: true },
    { id: "init-2", author: "Chloe_Glow", text: "Hey babes! Welcome to our stream workspace! 💕", isPremium: true, badgeStyle: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
  ]);
  const [inputVal, setInputVal] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // FIX: Internal-only layout scrolling container adjustment (Zero window/cursor hijack)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [chatFeed]);

  // High-fidelity active simulation cycle engine
  useEffect(() => {
    const interval = setInterval(() => {
      const isSystemAlert = Math.random() > 0.85;
      
      if (isSystemAlert) {
        const randomGirl = STREAMING_GIRLS[Math.floor(Math.random() * STREAMING_GIRLS.length)];
        const systemAlerts = [
          `@${randomGirl.name} initialized a private webcam prompt request.`,
          `@${randomGirl.name} updated her active stream connection line.`,
          `@${randomGirl.name} accepted a new call queue connection request.`
        ];
        
        setChatFeed((prev) => [
          ...prev.slice(-40),
          { id: `sys-${Date.now()}`, author: "SYSTEM", text: systemAlerts[Math.floor(Math.random() * systemAlerts.length)], isSystem: true }
        ]);
      } else {
        // Pull a completely distinct girl profile and phrase combination for dynamic chat presence
        const designatedGirl = STREAMING_GIRLS[Math.floor(Math.random() * STREAMING_GIRLS.length)];
        const randomPhrase = STREAMING_PHRASES[Math.floor(Math.random() * STREAMING_PHRASES.length)];
        
        setChatFeed((prev) => [
          ...prev.slice(-40),
          { 
            id: `girl-msg-${Date.now()}`, 
            author: designatedGirl.name, 
            text: randomPhrase, 
            isPremium: true,
            badgeStyle: designatedGirl.badge
          }
        ]);
      }
    }, 2400); // Fast cycle generation rate for active platform atmosphere

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    window.open(monetizationUrl, "_blank");
    setInputVal("");
  };

  return (
    <section id="live-chat" className="container-site py-8">
      <SectionHeading
        eyebrow="Premium Chat"
        title="Active Stream Portal"
        description="Members-only premium chat — 18+ only. Tap the Live Call button to connect privately."
      />

      <div className="w-full max-w-lg mx-auto transition">
        {/* Immersive Dashboard Framework Container */}
        <div className="rounded-3xl overflow-hidden border border-border bg-card shadow-card flex flex-col h-[560px]">
        
        {/* Stream Header Control Dashboard */}
        <div className="px-5 py-4 border-b border-border bg-card/40 backdrop-blur flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-foreground flex items-center gap-1.5">
                <MessageSquare className="h-4 w-4 text-primary" /> Active Stream Portal
              </div>
              <div className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1 mt-0.5">
                <ShieldAlert className="h-3 w-3 text-amber-500" /> Multi-Host Chat Interface Online
              </div>
            </div>
          </div>
          
          <a 
            href={monetizationUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-rose-600 to-rose-500 hover:opacity-95 text-white px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider transition transform active:scale-95 shadow-md shadow-rose-500/20"
          >
            <Video className="h-3.5 w-3.5 fill-white" />
            Connect Live
          </a>
        </div>

        {/* Hyper-Active Live Feed Terminal Stream Container */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto p-5 bg-muted/10 space-y-4 scrollbar-none select-none"
        >
          {chatFeed.map((m) => {
            if (m.isSystem) {
              return (
                <div key={m.id} className="text-[11px] text-muted-foreground/80 italic tracking-wide py-0.5 border-l-2 border-primary/30 pl-3">
                  {m.text}
                </div>
              );
            }

            // High Fidelity Asymmetric Chat Bubble Layout Matrix
            return (
              <div key={m.id} className="flex flex-col gap-1.5 max-w-[88%] mr-auto animate-none">
                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] font-extrabold tracking-wide px-2 py-0.5 rounded-md border ${m.badgeStyle || "text-primary border-border bg-muted"}`}>
                    LIVE HOST
                  </span>
                  <span className="text-[11px] font-black text-foreground/90 hover:underline cursor-pointer">
                    {m.author}
                  </span>
                </div>
                
                <div className="bg-muted/80 border border-border px-4 py-2.5 rounded-2xl rounded-tl-none shadow-sm text-sm font-medium text-foreground tracking-wide leading-relaxed">
                  {m.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Premium Action Control Box (Conversion Area) */}
        <div className="p-4 bg-card border-t border-border flex flex-col gap-3">
          
          {/* Fast Premium Monetization Interactive Micro-Buttons */}
          <div className="flex items-center gap-2">
            <a 
              href={monetizationUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="flex-1 inline-flex items-center justify-center gap-1 bg-secondary hover:bg-muted text-foreground text-xs font-bold py-2 px-2 rounded-xl border border-border/80 transition transform active:scale-95"
            >
              <Flame className="h-3.5 w-3.5 text-orange-500 fill-orange-500" /> Super Like
            </a>
            <a 
              href={monetizationUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="flex-1 inline-flex items-center justify-center gap-1 bg-secondary hover:bg-muted text-foreground text-xs font-bold py-2 px-2 rounded-xl border border-border/80 transition transform active:scale-95"
            >
              <Gift className="h-3.5 w-3.5 text-purple-500 fill-purple-500/20" /> Send Gift
            </a>
            <a 
              href={monetizationUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="flex-1 inline-flex items-center justify-center gap-1 bg-secondary hover:bg-muted text-foreground text-xs font-bold py-2 px-2 rounded-xl border border-border/80 transition transform active:scale-95"
            >
              <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" /> Call Private
            </a>
          </div>

          {/* Form Emulation Input Container */}
          <form onSubmit={handleSendMessage} className="relative flex items-center">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Send a premium room message..."
              className="w-full bg-muted border border-border text-foreground placeholder:text-muted-foreground text-xs rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:border-primary/40 transition font-medium"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg transition"
              aria-label="Submit Message Link"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>

      </div>
    </div>
    </section>
  );
}