import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site-chrome";
import { ChipRow, ProductCard } from "@/components/catalog";
import carouselIdols from "@/assets/carousel-idols.jpg";

export const Route = createFileRoute("/occasion")({
  head: () => ({
    meta: [
      { title: "Shop by Occasion — Sara Gift Studio" },
      { name: "description", content: "3D-printed gifts for birthdays, anniversaries, weddings, festivals, housewarmings and farewells." },
      { property: "og:title", content: "Shop by Occasion — Sara Gift Studio" },
      { property: "og:description", content: "A gift that fits the day, not just the person." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Occasion,
});

const CHIPS = ["All occasions", "Birthdays", "Anniversaries", "Weddings & engagements", "Baby showers", "Housewarming", "Festivals", "Farewells & retirements", "Corporate milestones"];

const PRODUCTS = [
  { title: "Ganesha, seated", meta: "Housewarming · ₹399", image: carouselIdols },
  { title: "Couple silhouette", meta: "Anniversaries · ₹899" },
  { title: "Diya set, engraved", meta: "Festive · ₹549" },
  { title: "Retirement plaque", meta: "Farewells · ₹1,299" },
];

function Occasion() {
  const [active, setActive] = useState(CHIPS[0]);
  return (
    <PageShell>
      <div className="mx-auto max-w-[1180px] px-6 py-16">
        <div className="section-label mb-2">Shop by occasion</div>
        <h1 className="mb-2 text-[32px]">A gift that fits the day, not just the person.</h1>
        <p className="mb-3 max-w-[60ch] text-[15px] text-muted-foreground">
          Every occasion has its own version of "just right" — browse what fits this one.
        </p>
        <ChipRow chips={CHIPS} active={active} onChange={setActive} />
        <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
          {PRODUCTS.map((p) => <ProductCard key={p.title} {...p} />)}
        </div>
        <p className="mt-5 text-[13px] text-muted-foreground">
          Note: each result here is a tagged product from the one catalogue — nothing is duplicated to appear on this page.
        </p>
      </div>
    </PageShell>
  );
}
