import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";
import { ProductCard } from "@/components/catalog";
import carouselFigurine from "@/assets/carousel-figurine.jpg";

export const Route = createFileRoute("/personalize")({
  head: () => ({
    meta: [
      { title: "Personalize It — Photo to 3D Keepsakes | Sara Gift Studio" },
      { name: "description", content: "Send a photograph and we model it in 3D — figurines, couple sculptures, pet memorials, caricature busts and cake toppers, approved by you before printing." },
      { property: "og:title", content: "Personalize It — Sara Gift Studio" },
      { property: "og:description", content: "Send a photograph, and we'll turn it into something worth keeping." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Personalize,
});

const ITEMS = [
  { title: "Photo-to-figurine", meta: "Mini-me statues", image: carouselFigurine },
  { title: "Couple & family sculptures", meta: "Two or more figures, one base" },
  { title: "Pet portraits & memorials", meta: "A likeness that holds up in 3D" },
  { title: "Caricature busts", meta: "Playful, exaggerated proportions" },
  { title: "Custom cake toppers", meta: "Wedding & celebration figures" },
  { title: "Upload your own design (STL)", meta: "Already have a 3D file? Skip modelling", highlight: true },
];

function Personalize() {
  return (
    <PageShell>
      <div className="mx-auto max-w-[1180px] px-6 py-16">
        <div className="section-label mb-2" style={{ color: "var(--brand-orange)" }}>Personalize it</div>
        <h1 className="mb-2 max-w-[26ch] text-[32px]">Send a photograph, and we'll turn it into something worth keeping.</h1>
        <p className="mb-3 max-w-[60ch] text-[15px] text-muted-foreground">
          Upload a photo of someone, or something, worth keeping — we model it in 3D, you see it and approve it before anything's printed.
        </p>
        <p className="mb-6 inline-block rounded-[10px] bg-[#FCF1DA] px-4 py-3 text-[13.5px] text-[#8A5A0B]">
          ⏱ This tier takes longer than Ready to Customize — design review, then approval, then printing.
        </p>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
          {ITEMS.map((p) => <ProductCard key={p.title} {...p} />)}
        </div>
        <button className="btn-primary mt-8">Start with your photograph</button>
      </div>
    </PageShell>
  );
}
