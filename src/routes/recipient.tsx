import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site-chrome";
import { ChipRow, ProductCard } from "@/components/catalog";

export const Route = createFileRoute("/recipient")({
  head: () => ({
    meta: [
      { title: "Shop by Recipient — Gifts for Him, Her, Kids & Pets | Sara Gift Studio" },
      { name: "description", content: "3D-printed gifts matched to who they're for — him, her, kids, couples, parents, pets and colleagues." },
      { property: "og:title", content: "Shop by Recipient — Sara Gift Studio" },
      { property: "og:description", content: "Start with who it's for." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Recipient,
});

const CHIPS = ["For him", "For her", "For kids", "For couples", "For parents & grandparents", "For pets & pet owners", "For colleagues & bosses"];

const PRODUCTS = [
  { title: "Desk organiser, minimal", meta: "₹549" },
  { title: "Whisky glass topper", meta: "₹799" },
  { title: "Card holder, engraved", meta: "₹449" },
];

function Recipient() {
  const [active, setActive] = useState(CHIPS[0]);
  return (
    <PageShell>
      <div className="mx-auto max-w-[1180px] px-6 py-16">
        <div className="section-label mb-2" style={{ color: "var(--brand-purple)" }}>Shop by recipient</div>
        <h1 className="mb-2 text-[32px]">Start with who it's for.</h1>
        <p className="max-w-[60ch] text-[15px] text-muted-foreground">
          Skip the browsing — go straight to what actually suits them.
        </p>
        <ChipRow chips={CHIPS} active={active} onChange={setActive} />
        <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
          {PRODUCTS.map((p) => <ProductCard key={p.title} {...p} />)}
        </div>
      </div>
    </PageShell>
  );
}
