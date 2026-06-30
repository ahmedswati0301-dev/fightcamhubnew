import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Flame, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "@/lib/theme";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Exclusive", to: "/exclusive-videos" },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-transparent bg-transparent">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-nowrap h-16 items-center justify-between gap-3 sm:gap-4">
        <Link to="/" className="flex shrink-0 items-center gap-2 min-w-0" onClick={() => setOpen(false)}>
          <span className="grid h-[clamp(2.25rem,3.5vw,2.5rem)] w-[clamp(2.25rem,3.5vw,2.5rem)] place-items-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow">
            <Flame className="h-[clamp(1.1rem,2vw,1.25rem)] w-[clamp(1.1rem,2vw,1.25rem)]" />
          </span>
          <span className="font-display text-[clamp(0.95rem,2vw,1.25rem)] font-bold uppercase tracking-wide leading-none">
            FightCam <span className="text-gradient">Hub</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end
              className={({ isActive }) =>
                isActive
                  ? "rounded-lg px-3 py-2 text-sm font-semibold text-primary bg-secondary"
                  : "rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-nowrap items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid h-[clamp(1.9rem,3.5vw,2.25rem)] w-[clamp(1.9rem,3.5vw,2.25rem)] place-items-center rounded-lg border border-border bg-secondary text-foreground transition hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {theme === "dark" ? <Sun className="h-[clamp(0.9rem,2vw,1.1rem)] w-[clamp(0.9rem,2vw,1.1rem)]" /> : <Moon className="h-[clamp(0.9rem,2vw,1.1rem)] w-[clamp(0.9rem,2vw,1.1rem)]" />}
          </button>

          <a
            href="https://consciousdunkvastly.com/hu3d2ui1?key=c6dfa5e4b94e4987e31e7c7c7502de12"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-w-0 items-center justify-center gap-2 rounded-lg bg-gradient-primary px-[clamp(0.6rem,2vw,1rem)] py-[clamp(0.4rem,1.2vw,0.75rem)] text-[clamp(0.65rem,1.6vw,0.9rem)] font-bold text-primary-foreground shadow-glow transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Watch Live
          </a>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="grid h-[clamp(1.9rem,3.5vw,2.25rem)] w-[clamp(1.9rem,3.5vw,2.25rem)] place-items-center rounded-lg border border-border bg-secondary md:hidden focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {open ? <X className="h-[clamp(1.05rem,2vw,1.25rem)] w-[clamp(1.05rem,2vw,1.25rem)]" /> : <Menu className="h-[clamp(1.05rem,2vw,1.25rem)] w-[clamp(1.05rem,2vw,1.25rem)]" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-transparent md:hidden">
          <nav className="container-site flex flex-col gap-1 py-3">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "rounded-lg px-3 py-2.5 text-sm font-semibold text-primary bg-secondary"
                    : "rounded-lg px-3 py-2.5 text-sm font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                }
              >
                {l.label}
              </NavLink>
            ))}
            {/* Watch Live is always visible in the header on all screen sizes so
                we don't duplicate it inside the mobile menu. */}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
