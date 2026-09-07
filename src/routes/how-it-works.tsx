import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How 3D Printing Works — Materials & Lead Time | Sara Gift Studio" },
      { name: "description", content: "Materials we print in, how long an order takes, our minimum order, and exactly how your STL file is used — explained in plain language." },
      { property: "og:title", content: "How our 3D printing works — Sara Gift Studio" },
      { property: "og:description", content: "Materials, lead times, minimum order and STL files, explained simply." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowItWorks,
});

const STEPS = [
  { n: "01", title: "You tell us what you want", body: "Pick a ready-made design and add a name, send us a photograph to model, or upload a 3D file you already have." },
  { n: "02", title: "We prepare the file", body: "Our team slices the model — deciding wall thickness, infill and supports — so it prints cleanly and survives being handled." },
  { n: "03", title: "We print it", body: "Printed layer by layer on our machines in Hyderabad. A palm-sized piece takes 4–8 hours; a 12-inch idol can run two full days." },
  { n: "04", title: "Finishing by hand", body: "Supports removed, seams sanded, then primed, painted or polished depending on the finish you chose." },
  { n: "05", title: "Checked and shipped", body: "Photographed for your approval, packed in foam, and couriered anywhere in India." },
];

const MATERIALS = [
  { name: "PLA", best: "Idols, décor, gifting", note: "Crisp detail and rich colour. Best kept indoors and out of a hot car.", color: "#D37F39" },
  { name: "PLA+ / Silk", best: "Nameplates, trophies", note: "Slightly tougher with a satin or metallic sheen straight off the printer.", color: "#66519E" },
  { name: "PETG", best: "Outdoor & daily-use items", note: "Water and heat resistant, more flexible, holds up to sunlight.", color: "#3CAB99" },
  { name: "ABS", best: "Corporate & functional parts", note: "Impact resistant and easy to smooth to a glossy finish.", color: "#426AB0" },
  { name: "Resin", best: "Faces, jewellery, fine detail", note: "Extremely fine detail for figurines and miniatures. More delicate.", color: "#2EAF56" },
  { name: "Wood & marble fill", best: "Premium keepsakes", note: "PLA blended with wood or stone powder for a natural, weighty feel.", color: "#F7C92D" },
];

const LEAD_TIMES = [
  { label: "Ready to customize", time: "3–5 working days", detail: "Existing design, your name or colour added." },
  { label: "Personalize it (photo to 3D)", time: "8–12 working days", detail: "Includes modelling and your approval round." },
  { label: "Your own STL file", time: "4–7 working days", detail: "No modelling needed unless the file requires repair." },
  { label: "Corporate & bulk", time: "10–18 working days", detail: "Depends on quantity; rush slots available on request." },
];

function HowItWorks() {
  return (
    <PageShell>
      <div className="mx-auto max-w-[1180px] px-6 py-16">
        <div className="section-label mb-2" style={{ color: "var(--brand-teal, #3CAB99)" }}>How it works</div>
        <h1 className="mb-2 max-w-[26ch] text-[32px]">Everything that happens between your idea and the parcel at your door.</h1>
        <p className="max-w-[62ch] text-[15px] text-muted-foreground">
          No jargon, no surprises — here's what we print in, how long it takes, the smallest order we accept, and what we do with a 3D file if you send one.
        </p>

        <h2 className="mb-4 mt-14 text-[24px]">The five steps</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-[14px] border border-border bg-card p-5">
              <div className="font-mono text-[13px] font-bold text-muted-foreground">{s.n}</div>
              <h3 className="mb-1 mt-1 text-[17px]">{s.title}</h3>
              <p className="text-[14px] text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-2 mt-14 text-[24px]">Materials</h2>
        <p className="mb-4 max-w-[62ch] text-[15px] text-muted-foreground">
          We'll recommend one for your piece, but you're welcome to choose.
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {MATERIALS.map((m) => (
            <div key={m.name} className="rounded-[14px] border border-border bg-card p-5">
              <span className="mb-2 inline-block h-[7px] w-[28px] rounded-[2px]" style={{ background: m.color }} />
              <h3 className="text-[17px]">{m.name}</h3>
              <div className="mb-1 text-[12.5px] font-semibold uppercase tracking-wide text-muted-foreground">{m.best}</div>
              <p className="text-[14px] text-muted-foreground">{m.note}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-4 mt-14 text-[24px]">Lead time</h2>
        <div className="overflow-hidden rounded-[14px] border border-border bg-card">
          {LEAD_TIMES.map((l, i) => (
            <div key={l.label} className={`flex flex-wrap items-baseline justify-between gap-2 px-5 py-4 ${i ? "border-t border-border" : ""}`}>
              <div>
                <div className="font-display text-[15px] font-bold">{l.label}</div>
                <div className="text-[13.5px] text-muted-foreground">{l.detail}</div>
              </div>
              <div className="font-display text-[15px] font-bold">{l.time}</div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[13.5px] text-muted-foreground">
          Delivery adds 2–4 days on top. Festival weeks (Ganesh Chaturthi, Diwali, wedding season) book out early — order ahead where you can.
        </p>

        <h2 className="mb-4 mt-14 text-[24px]">Minimum order</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Fact title="Personal orders" value="1 piece" body="There's no minimum. A single keychain is a perfectly good order." />
          <Fact title="Corporate & bulk pricing" value="25 pieces" body="Discounted per-piece pricing starts at 25 identical items." />
          <Fact title="Branded packaging" value="50 pieces" body="Custom boxes, inserts and printed cards need at least 50 units." />
        </div>

        <h2 className="mb-2 mt-14 text-[24px]">If you send us an STL file</h2>
        <p className="mb-4 max-w-[62ch] text-[15px] text-muted-foreground">
          An STL is the standard 3D model file — the digital shape of your object. Send one and we skip the modelling stage entirely.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[14px] border border-border bg-card p-5">
            <h3 className="mb-2 text-[17px]">What we do with it</h3>
            <ul className="ml-4 list-disc space-y-1.5 text-[14px] text-muted-foreground">
              <li>Check it for holes, loose shells and wall thickness, and repair small faults free of charge.</li>
              <li>Scale it to your chosen size and confirm the measurements with you.</li>
              <li>Slice it — set layer height, infill and supports — and quote you a firm price.</li>
              <li>Print, finish and ship, exactly as with any other order.</li>
            </ul>
          </div>
          <div className="rounded-[14px] border border-border bg-card p-5">
            <h3 className="mb-2 text-[17px]">Good to know</h3>
            <ul className="ml-4 list-disc space-y-1.5 text-[14px] text-muted-foreground">
              <li>We accept STL, OBJ and 3MF files up to 50 MB.</li>
              <li>Your file stays yours. We print it, we don't resell or share it, and we delete it on request.</li>
              <li>You get a private download link back so you always have a copy of what you sent.</li>
              <li>Files needing heavy rework are quoted separately before we start.</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link to="/personalize" className="btn-primary">Upload your 3D file</Link>
          <Link to="/ready-to-customize" className="btn-primary">Order a ready-made design</Link>
        </div>
      </div>
    </PageShell>
  );
}

function Fact({ title, value, body }: { title: string; value: string; body: string }) {
  return (
    <div className="rounded-[14px] border border-border bg-card p-5">
      <div className="text-[12.5px] font-semibold uppercase tracking-wide text-muted-foreground">{title}</div>
      <div className="my-1 font-display text-[26px] font-bold">{value}</div>
      <p className="text-[14px] text-muted-foreground">{body}</p>
    </div>
  );
}
