import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site-chrome";
import { ProductCard } from "@/components/catalog";
import carouselNameplate from "@/assets/carousel-nameplate.jpg";

export const Route = createFileRoute("/ready-to-customize")({
  head: () => ({
    meta: [
      { title: "Ready to Customize — Nameplates & Décor | Sara Gift Studio" },
      { name: "description", content: "Pick a ready-made 3D-printed design and add a name, initials or colour — nameplates, keychains, desk décor and trophies, shipped in days." },
      { property: "og:title", content: "Ready to Customize — Sara Gift Studio" },
      { property: "og:description", content: "Pick a piece, add a name or a colour, and it's on its way in days." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReadyToCustomize,
});

const SIZES = [
  { label: "6 inch — ₹449", price: 449 },
  { label: "8 inch — ₹649", price: 649 },
  { label: "12 inch — ₹999", price: 999 },
];

const CATEGORIES = [
  { title: "Nameplates & monograms" },
  { title: "Keychains & accessories" },
  { title: "Desk décor & planters" },
  { title: "Photo frames & stands" },
  { title: "Trophies & awards" },
];

function ReadyToCustomize() {
  const [text, setText] = useState("Priya & Rohan");
  const [size, setSize] = useState(1);
  return (
    <PageShell>
      <div className="mx-auto max-w-[1180px] px-6 py-16">
        <div className="section-label mb-2" style={{ color: "#8A5A0B" }}>Ready to customize</div>
        <h1 className="mb-2 max-w-[28ch] text-[32px]">Pick a ready-made design, then add a name, initials, or a colour to it.</h1>
        <p className="max-w-[60ch] text-[15px] text-muted-foreground">
          No photo, no waiting on a design review — pick a piece, add a name or a colour, and it's on its way in days.
        </p>

        <div className="my-8 grid items-center gap-10 rounded-[20px] bg-muted p-8 lg:grid-cols-2 lg:p-10">
          <div className="relative aspect-square overflow-hidden rounded-[14px]">
            <img src={carouselNameplate} alt="Custom 3D-printed nameplate preview" width={1024} height={1024} loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 rounded bg-white px-5 py-1.5 font-display text-[15px] font-bold text-foreground shadow">
              {text || "Your text"}
            </div>
          </div>
          <div>
            <label className="field-label">Name or text</label>
            <input className="field-input" value={text} onChange={(e) => setText(e.target.value)} maxLength={30} />
            <label className="field-label">Colour</label>
            <select className="field-input">
              <option>Walnut</option>
              <option>Charcoal black</option>
              <option>Ivory white</option>
              <option>Teal</option>
            </select>
            <label className="field-label">Size</label>
            <select className="field-input" value={size} onChange={(e) => setSize(Number(e.target.value))}>
              {SIZES.map((s, i) => <option key={s.label} value={i}>{s.label}</option>)}
            </select>
            <div className="my-5 font-display text-2xl font-bold">₹{SIZES[size].price}</div>
            <button className="btn-primary w-full">Add to cart</button>
            <p className="mt-2.5 text-xs text-muted-foreground">
              Priced by the same engine as every other product — never a fixed template price.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
          {CATEGORIES.map((p) => <ProductCard key={p.title} {...p} />)}
        </div>
      </div>
    </PageShell>
  );
}
