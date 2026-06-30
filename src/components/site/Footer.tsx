import { Link } from "react-router-dom";
import { Facebook, Flame, Instagram, Twitter, Youtube } from "lucide-react";

const cols = [
  {
    title: "Watch",
    links: ["Live Fights", "Top Trending", "Knockouts", "Submissions", "Exclusive Videos"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Press", "Advertise With Us", "Contact"],
  },
  {
    title: "Legal",
    links: ["Terms of Service", "Privacy Policy", "Cookie Policy", "DMCA", "Disclaimer"],
  },
];

export function Footer() {
  return (
    <footer className="mt-4 border-t border-border bg-card/50">
      <div className="container-site grid grid-cols-2 gap-8 py-12 sm:grid-cols-3 lg:grid-cols-5">
        <div className="col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow">
              <Flame className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-bold uppercase tracking-wide">
              FightCam <span className="text-gradient">Hub</span>
            </span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Your front-row seat to the fight. Live cage cams, premium highlights and exclusive
            knockouts — streaming around the clock.
          </p>
          <div className="mt-4 flex items-center gap-2">
            {[Youtube, Twitter, Instagram, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-secondary text-muted-foreground transition hover:border-primary hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-bold uppercase tracking-wide">{col.title}</h4>
            <ul className="mt-3 space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground transition hover:text-primary"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} FightCam Hub. All rights reserved.</p>
          <p>Made for fight fans worldwide.</p>
        </div>
      </div>
    </footer>
  );
}
