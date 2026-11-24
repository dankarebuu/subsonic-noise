import { Menu, X } from "lucide-react";
import { useState } from "react";
import { SUMMARY_HOURS_ROWS } from "../../data/studio";
import { Button, Container } from "../ui";

interface NavbarProps {
  onOpenBooking: () => void;
}

const NAV_LINKS = [
  { label: "ROOMS", href: "#rooms" },
  { label: "ENGINEERS", href: "#engineers" },
  { label: "GEAR", href: "#gear" },
  { label: "LOCATION", href: "#location" },
] as const;

export function Navbar({ onOpenBooking }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-100 bg-paper/95 backdrop-blur-[2px] border-b-2 border-dashed border-ink">
      <Container>
        <div className="flex h-20 items-center justify-between gap-4">
          <a
            href="#top"
            className="inline-flex items-center bg-ink px-3.5 py-2 -rotate-2 border-2 border-ink shadow-[3px_3px_0_#8C2727] hover:rotate-0 transition-transform"
          >
            <span className="font-display text-lg sm:text-xl tracking-tight text-dirty-yellow">
              SUBSONIC
            </span>
            <span className="font-display text-lg sm:text-xl tracking-tight text-paper-light">
              NOISE
            </span>
          </a>

          <nav
            aria-label="Primary studio navigation"
            className="hidden md:flex items-center gap-8"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-sm font-bold uppercase tracking-[0.12em] text-ink zine-squiggle hover:text-muted-red transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button variant="secondary" size="md" onClick={onOpenBooking}>
              BOOK A ROOM
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden inline-flex h-11 w-11 items-center justify-center border-2 border-ink bg-paper-light text-ink cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-dashed border-ink bg-paper-light px-4 py-5 space-y-5">
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 font-mono text-sm font-bold uppercase tracking-[0.14em] text-ink zine-squiggle"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="border-t border-dashed border-ink/40 pt-3 space-y-1 font-mono text-xs tabular-nums">
            {SUMMARY_HOURS_ROWS.map((row) => (
              <div key={row.label} className="flex justify-between">
                <span className="text-concrete">{row.label}</span>
                <span className="font-bold text-ink">{row.value}</span>
              </div>
            ))}
          </div>

          <Button
            variant="secondary"
            fullWidth
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
          >
            BOOK A ROOM
          </Button>
        </div>
      )}
    </header>
  );
}
