import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/site-chrome";
import carouselIdols from "@/assets/carousel-idols.jpg";
import carouselNameplate from "@/assets/carousel-nameplate.jpg";
import carouselCorporate from "@/assets/carousel-corporate.jpg";
import carouselFigurine from "@/assets/carousel-figurine.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sara Gift Studio — 3D-Printed Custom Gifts, Made to Order" },
      { name: "description", content: "Idols, nameplates, corporate gifts and photo-to-3D keepsakes, printed and hand-painted to order in Hyderabad. Free delivery across India." },
      { property: "og:title", content: "Sara Gift Studio — 3D-Printed Custom Gifts" },
      { property: "og:description", content: "Idols, nameplates, corporate gifts — or anything you can send us a photo of." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const SLIDES = [
  { src: carouselIdols, label: "Idols & artifacts", alt: "Hand-painted 3D-printed Ganesha idol" },
  { src: carouselNameplate, label: "Ready to customize", alt: "3D-printed wooden-look engraved nameplate" },
  { src: carouselCorporate, label: "Corporate & bulk", alt: "3D-printed corporate award trophy" },
  { src: carouselFigurine, label: "Personalize it", alt: "Custom photo-to-3D mini-me figurine" },
];

const ENTRIES = [
  { to: "/occasion", title: "Shop by occasion", sub: "Birthdays, weddings, festivals", bg: "#E7F6F0", fg: "#0F6E56" },
  { to: "/personalize", title: "Personalize it", sub: "Send a photo, we build a keepsake", bg: "#FBEAE3", fg: "#8C3D1E" },
  { to: "/ready-to-customize", title: "Ready to customize", sub: "Nameplates, keychains, décor", bg: "#FCF1DA", fg: "#8A5A0B" },
  { to: "/recipient", title: "Shop by recipient", sub: "For him, her, kids, pets", bg: "#EEEAF9", fg: "#4A3D82" },
  { to: "/corporate", title: "Corporate & bulk", sub: "Branded gifts, RFQ quotes", bg: "#E4EDFB", fg: "#1F4D8C" },
  { to: "/collections", title: "Collections", sub: "Premium, budget, express", bg: "#FBE7EF", fg: "#96305E" },
] as const;

function Carousel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % SLIDES.length), 3500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative aspect-[1/1.05] overflow-hidden rounded-[18px] bg-muted">
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${i * 100}%)` }}
      >
        {SLIDES.map((s, idx) => (
          <div key={s.label} className="relative h-full min-w-full">
            <img
              src={s.src}
              alt={s.alt}
              width={1024}
              height={1024}
              loading={idx === 0 ? "eager" : "lazy"}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-3 left-3 rounded-lg bg-white/95 px-3 py-1.5 text-[11.5px] font-bold text-foreground">
              {s.label}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-3 right-3 flex gap-1.5">
        {SLIDES.map((s, idx) => (
          <button
            key={s.label}
            aria-label={`Slide ${idx + 1}`}
            onClick={() => setI(idx)}
            className={`h-1.5 rounded-full transition-all ${idx === i ? "w-4 bg-white" : "w-1.5 bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}

function Index() {
  return (
    <PageShell>
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid items-center gap-10 py-11 lg:grid-cols-[1fr_340px]">
          <div>
            <div className="section-label mb-2">gift.sarainfoway.in</div>
            <h1 className="mb-2.5 max-w-[13ch] text-[34px] leading-tight">3D-printed gifts, made to order.</h1>
            <p className="mb-5 max-w-[52ch] text-[15px] text-muted-foreground">
              Idols, nameplates, corporate gifts — or anything you can send us a photo of.
            </p>
            <Link to="/occasion" className="btn-primary">Start browsing</Link>
          </div>
          <Carousel />
        </div>

        <div className="mb-20 mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ENTRIES.map((e) => (
            <Link
              key={e.to}
              to={e.to}
              className="card-hover rounded-[18px] px-6 py-7 no-underline"
              style={{ background: e.bg }}
            >
              <h3 className="mb-2 text-xl" style={{ color: e.fg }}>{e.title}</h3>
              <p className="text-sm opacity-85" style={{ color: e.fg }}>{e.sub}</p>
            </Link>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
