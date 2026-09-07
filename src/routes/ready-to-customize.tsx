import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { PageShell } from "@/components/site-chrome";
import { ProductCard } from "@/components/catalog";
import { supabase } from "@/integrations/supabase/client";
import carouselNameplate from "@/assets/carousel-nameplate.jpg";

export const Route = createFileRoute("/ready-to-customize")({
  head: () => ({
    meta: [
      { title: "Ready to Customize — Nameplates & Décor | Sara Gift Studio" },
      { name: "description", content: "Pick a ready-made 3D-printed design, add a name, colour and size, and place your order online — shipped across India in days." },
      { property: "og:title", content: "Ready to Customize — Sara Gift Studio" },
      { property: "og:description", content: "Pick a piece, add a name or a colour, and place your order in minutes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReadyToCustomize,
});

const SIZES = [
  { label: "6 inch", price: 449 },
  { label: "8 inch", price: 649 },
  { label: "12 inch", price: 999 },
];

const COLORS = ["Walnut", "Charcoal black", "Ivory white", "Teal"];

const CATEGORIES = [
  { title: "Nameplates & monograms" },
  { title: "Keychains & accessories" },
  { title: "Desk décor & planters" },
  { title: "Photo frames & stands" },
  { title: "Trophies & awards" },
];

const orderSchema = z.object({
  customer_name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(20),
  address: z.string().trim().min(10, "Please enter the full delivery address").max(500),
  personalization_text: z.string().trim().min(1, "Add the name or text to print").max(30),
  notes: z.string().trim().max(500).optional(),
});

function ReadyToCustomize() {
  const [text, setText] = useState("Priya & Rohan");
  const [color, setColor] = useState(COLORS[0]!);
  const [size, setSize] = useState(1);
  const [qty, setQty] = useState(1);
  const [form, setForm] = useState({ customer_name: "", email: "", phone: "", address: "", notes: "" });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [placed, setPlaced] = useState<string | null>(null);

  const unit = SIZES[size]?.price ?? 0;
  const total = unit * qty;
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const parsed = orderSchema.safeParse({ ...form, personalization_text: text });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSaving(true);
    const { data, error: dbError } = await supabase
      .from("orders")
      .insert({
        ...parsed.data,
        notes: parsed.data.notes ?? null,
        color,
        size: SIZES[size]?.label ?? "",
        quantity: qty,
        unit_price: unit,
        total_price: total,
      })
      .select("id")
      .single();
    setSaving(false);
    if (dbError || !data) {
      setError("Sorry, we couldn't save your order. Please try again.");
      return;
    }
    setPlaced(data.id);
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-[1180px] px-6 py-16">
        <div className="section-label mb-2" style={{ color: "#8A5A0B" }}>Ready to customize</div>
        <h1 className="mb-2 max-w-[28ch] text-[32px]">Pick a ready-made design, then add a name, initials, or a colour to it.</h1>
        <p className="max-w-[60ch] text-[15px] text-muted-foreground">
          No photo, no waiting on a design review — pick a piece, add a name or a colour, and it's on its way in days.
        </p>

        <div className="my-8 grid items-start gap-10 rounded-[20px] bg-muted p-8 lg:grid-cols-2 lg:p-10">
          <div className="relative aspect-square overflow-hidden rounded-[14px]">
            <img src={carouselNameplate} alt="Custom 3D-printed nameplate preview" width={1024} height={1024} loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 rounded bg-white px-5 py-1.5 font-display text-[15px] font-bold text-foreground shadow">
              {text || "Your text"}
            </div>
          </div>

          {placed ? (
            <div className="rounded-[14px] bg-card p-6">
              <h2 className="mb-2 text-[22px]">Order placed — thank you!</h2>
              <p className="text-[14px] text-muted-foreground">
                Your order reference is <strong className="text-foreground">{placed.slice(0, 8).toUpperCase()}</strong>.
                We'll email you at {form.email} with the payment link and a proof of your design within one working day.
              </p>
              <button className="btn-primary mt-5" onClick={() => { setPlaced(null); setForm({ customer_name: "", email: "", phone: "", address: "", notes: "" }); }}>
                Place another order
              </button>
            </div>
          ) : (
            <form onSubmit={placeOrder}>
              <label className="field-label" htmlFor="ptext">Name or text</label>
              <input id="ptext" className="field-input" value={text} onChange={(e) => setText(e.target.value)} maxLength={30} />

              <label className="field-label" htmlFor="pcolor">Colour</label>
              <select id="pcolor" className="field-input" value={color} onChange={(e) => setColor(e.target.value)}>
                {COLORS.map((c) => <option key={c}>{c}</option>)}
              </select>

              <label className="field-label" htmlFor="psize">Size</label>
              <select id="psize" className="field-input" value={size} onChange={(e) => setSize(Number(e.target.value))}>
                {SIZES.map((s, i) => <option key={s.label} value={i}>{s.label} — ₹{s.price}</option>)}
              </select>

              <label className="field-label" htmlFor="pqty">Quantity</label>
              <input id="pqty" type="number" min={1} max={500} className="field-input" value={qty}
                onChange={(e) => setQty(Math.max(1, Math.min(500, Number(e.target.value) || 1)))} />

              <div className="my-5 font-display text-2xl font-bold">₹{total}</div>

              <div className="mb-2 mt-6 font-display text-[15px] font-bold">Your details</div>
              <label className="field-label" htmlFor="pname">Full name</label>
              <input id="pname" className="field-input" value={form.customer_name} onChange={set("customer_name")} maxLength={100} />
              <label className="field-label" htmlFor="pemail">Email</label>
              <input id="pemail" type="email" className="field-input" value={form.email} onChange={set("email")} maxLength={255} />
              <label className="field-label" htmlFor="pphone">Phone</label>
              <input id="pphone" className="field-input" value={form.phone} onChange={set("phone")} maxLength={20} />
              <label className="field-label" htmlFor="paddr">Delivery address</label>
              <textarea id="paddr" rows={3} className="field-input" value={form.address} onChange={set("address")} maxLength={500} />
              <label className="field-label" htmlFor="pnotes">Anything else we should know? (optional)</label>
              <textarea id="pnotes" rows={2} className="field-input" value={form.notes} onChange={set("notes")} maxLength={500} />

              {error && <p className="mt-3 text-[13px] font-semibold text-destructive">{error}</p>}

              <button className="btn-primary mt-4 w-full" type="submit" disabled={saving}>
                {saving ? "Placing your order…" : `Place order · ₹${total}`}
              </button>
              <p className="mt-2.5 text-xs text-muted-foreground">
                No payment now — we confirm your design and send a payment link first.
              </p>
            </form>
          )}
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
          {CATEGORIES.map((p) => <ProductCard key={p.title} {...p} />)}
        </div>
      </div>
    </PageShell>
  );
}
