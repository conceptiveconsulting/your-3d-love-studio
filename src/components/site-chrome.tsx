import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";

export function LogoMark({ light = false }: { light?: boolean }) {
  const colors = ["#D37F39", "#66519E", "#F7C92D", "#3CAB99", "#2EAF56", "#426AB0"];
  return (
    <span className="flex items-center gap-2.5">
      <span className="grid grid-cols-3 grid-rows-2 gap-[2px]">
        {colors.map((c) => (
          <span key={c} style={{ background: c }} className="h-[7px] w-[7px] rounded-[2px]" />
        ))}
      </span>
      <span className={`font-display text-[17px] font-bold ${light ? "text-white" : "text-foreground"}`}>
        gift.sarainfoway.in
      </span>
    </span>
  );
}

const NAV = [
  { to: "/", label: "Home" },
  { to: "/occasion", label: "Shop by occasion" },
  { to: "/personalize", label: "Personalize it" },
  { to: "/ready-to-customize", label: "Ready to customize" },
  { to: "/recipient", label: "Shop by recipient" },
  { to: "/corporate", label: "Corporate & bulk" },
  { to: "/collections", label: "Collections" },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <>
      <div className="bg-ink text-center text-[12.5px] text-white py-2 px-4">
        Free delivery across India · At your door in 8 days
      </div>
      <header className="sticky top-0 z-50 border-b border-border bg-card">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-6 py-3.5">
          <Link to="/"><LogoMark /></Link>
          <nav className="hidden flex-wrap gap-1 lg:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={`rounded-lg px-3 py-2 text-[13.5px] font-semibold transition-colors ${
                  pathname === n.to
                    ? "bg-ink text-white"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <ShoppingCart className="h-5 w-5 text-foreground" />
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-ink py-12 text-white">
      <div className="mx-auto grid max-w-[1180px] gap-8 px-6 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <LogoMark light />
          <p className="mt-3 max-w-[32ch] text-[13.5px] text-[#A9B3BE]">
            Idols, artifacts and corporate gifts, printed and hand painted to order in Hyderabad.
          </p>
        </div>
        <FooterCol title="Shop" links={[
          { label: "Personalize it", to: "/personalize" },
          { label: "Ready to customize", to: "/ready-to-customize" },
          { label: "Collections", to: "/collections" },
        ]} />
        <FooterCol title="Browse" links={[
          { label: "By occasion", to: "/occasion" },
          { label: "By recipient", to: "/recipient" },
          { label: "Corporate & bulk", to: "/corporate" },
        ]} />
        <FooterCol title="Help" links={[
          { label: "Photograph guidelines", to: "/personalize" },
          { label: "Shipping & returns", to: "/" },
          { label: "Track your order", to: "/" },
          { label: "Get a quote", to: "/corporate" },
        ]} />
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <h5 className="mb-3 text-[13px] font-semibold text-[#A9B3BE]">{title}</h5>
      {links.map((l) => (
        <Link key={l.label} to={l.to} className="mb-2 block text-[13.5px] text-white/90 no-underline hover:text-white">
          {l.label}
        </Link>
      ))}
    </div>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
