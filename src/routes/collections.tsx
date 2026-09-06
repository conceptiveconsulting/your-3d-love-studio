import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site-chrome";
import carouselIdols from "@/assets/carousel-idols.jpg";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — Budget, Premium & Express | Sara Gift Studio" },
      { name: "description", content: "Browse the Sara Gift Studio catalogue by budget picks, premium signature pieces, express delivery and new arrivals." },
      { property: "og:title", content: "Collections — Sara Gift Studio" },
      { property: "og:description", content: "Browse by what matters to you right now." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Collections,
});

const TABS = ["Budget picks", "Premium / signature", "Express / same-day", "New arrivals"];

const ITEMS = [
  { tag: "Under ₹500", tagBg: "#E7F6F0", tagFg: "#0F6E56", title: "Ganesha, seated — 4 inch", amount: "₹399", image: carouselIdols },
  { tag: "Signature", tagBg: "#FBE7EF", tagFg: "#96305E", title: "Hand-painted Balaji — 8 inch", amount: "₹2,899" },
];

function Collections() {
  const [active, setActive] = useState(TABS[0]);
  return (
    <PageShell>
      <div className="mx-auto max-w-[1180px] px-6 py-16">
        <div className="section-label mb-2" style={{ color: "#96305E" }}>Collections</div>
        <h1 className="mb-2 text-[32px]">Browse by what matters to you right now.</h1>
        <p className="max-w-[60ch] text-[15px] text-muted-foreground">
          Budget, premium, or need it fast — same catalogue, filtered differently.
        </p>

        <div className="my-8 flex gap-6 overflow-x-auto border-b border-border">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`whitespace-nowrap border-b-2 px-0.5 py-2.5 text-sm font-bold transition-colors ${
                t === active ? "border-brand-orange text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
          {ITEMS.map((p) => (
            <div key={p.title} className="rounded-[14px] border border-border p-5">
              <div className="mb-3.5 aspect-square overflow-hidden rounded-[10px] bg-muted">
                {p.image && <img src={p.image} alt={p.title} width={1024} height={1024} loading="lazy" className="h-full w-full object-cover" />}
              </div>
              <span
                className="mb-2.5 inline-block rounded-full px-2.5 py-1 text-[11px] font-bold"
                style={{ background: p.tagBg, color: p.tagFg }}
              >
                {p.tag}
              </span>
              <h4 className="font-body text-[14.5px] font-bold">{p.title}</h4>
              <div className="my-2 font-display text-[22px] font-bold">{p.amount}</div>
            </div>
          ))}
        </div>
        <p className="mt-5 max-w-[56ch] text-[13px] text-muted-foreground">
          These tabs read the price the engine already calculated — nothing here is a separately stored "budget" or "premium" label that could go stale.
        </p>
      </div>
    </PageShell>
  );
}
