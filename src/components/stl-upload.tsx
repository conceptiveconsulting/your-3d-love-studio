import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { submitPrintRequest } from "@/lib/print-requests.functions";

const MATERIALS = ["PLA", "PLA+ / Silk", "PETG", "ABS", "Resin", "Wood or marble fill"];
const MAX_BYTES = 50 * 1024 * 1024;
const ALLOWED = [".stl", ".obj", ".3mf"];

const detailsSchema = z.object({
  customer_name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(20),
  notes: z.string().trim().max(500).optional(),
});

export function StlUpload() {
  const submit = useServerFn(submitPrintRequest);
  const [file, setFile] = useState<File | null>(null);
  const [material, setMaterial] = useState(MATERIALS[0]!);
  const [qty, setQty] = useState(1);
  const [form, setForm] = useState({ customer_name: "", email: "", phone: "", notes: "" });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ id: string; downloadUrl: string } | null>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function send(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!file) return setError("Please choose a 3D file to upload");
    const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (!ALLOWED.includes(ext)) return setError("We accept STL, OBJ and 3MF files only");
    if (file.size > MAX_BYTES) return setError("That file is over 50 MB — please compress it or email us");

    const parsed = detailsSchema.safeParse(form);
    if (!parsed.success) return setError(parsed.error.issues[0]?.message ?? "Please check the form");

    setBusy(true);
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
    const path = `stl/${crypto.randomUUID()}/${safeName}`;
    const { error: upErr } = await supabase.storage.from("stl-uploads").upload(path, file, {
      contentType: file.type || "application/octet-stream",
    });
    if (upErr) {
      setBusy(false);
      return setError("The upload didn't go through. Please try again.");
    }

    try {
      const result = await submit({
        data: {
          ...parsed.data,
          file_name: safeName,
          file_path: path,
          file_size: file.size,
          material,
          quantity: qty,
        },
      });
      setDone(result);
    } catch {
      setError("We received the file but couldn't record your request. Please contact us.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-[14px] border border-border bg-card p-6">
        <h3 className="mb-2 text-[20px]">File received — thank you!</h3>
        <p className="mb-3 text-[14px] text-muted-foreground">
          Your reference is <strong className="text-foreground">{done.id.slice(0, 8).toUpperCase()}</strong>. Our print team
          checks the file and emails you a firm quote within one working day.
        </p>
        <a className="btn-primary inline-block" href={done.downloadUrl} target="_blank" rel="noopener noreferrer">
          Download your file
        </a>
        <p className="mt-2 text-xs text-muted-foreground">This private link stays valid for 7 days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={send} className="rounded-[14px] border border-border bg-card p-6">
      <h3 className="mb-1 text-[20px]">Upload your 3D file</h3>
      <p className="mb-4 text-[14px] text-muted-foreground">STL, OBJ or 3MF, up to 50 MB. We'll quote before printing.</p>

      <label className="field-label" htmlFor="stlfile">3D file</label>
      <input id="stlfile" type="file" accept=".stl,.obj,.3mf" className="field-input"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)} />

      <label className="field-label" htmlFor="stlmat">Material</label>
      <select id="stlmat" className="field-input" value={material} onChange={(e) => setMaterial(e.target.value)}>
        {MATERIALS.map((m) => <option key={m}>{m}</option>)}
      </select>

      <label className="field-label" htmlFor="stlqty">Quantity</label>
      <input id="stlqty" type="number" min={1} max={500} className="field-input" value={qty}
        onChange={(e) => setQty(Math.max(1, Math.min(500, Number(e.target.value) || 1)))} />

      <label className="field-label" htmlFor="stlname">Full name</label>
      <input id="stlname" className="field-input" value={form.customer_name} onChange={set("customer_name")} maxLength={100} />
      <label className="field-label" htmlFor="stlemail">Email</label>
      <input id="stlemail" type="email" className="field-input" value={form.email} onChange={set("email")} maxLength={255} />
      <label className="field-label" htmlFor="stlphone">Phone</label>
      <input id="stlphone" className="field-input" value={form.phone} onChange={set("phone")} maxLength={20} />
      <label className="field-label" htmlFor="stlnotes">Size, finish or anything else (optional)</label>
      <textarea id="stlnotes" rows={2} className="field-input" value={form.notes} onChange={set("notes")} maxLength={500} />

      {error && <p className="mt-3 text-[13px] font-semibold text-destructive">{error}</p>}

      <button className="btn-primary mt-4 w-full" type="submit" disabled={busy}>
        {busy ? "Sending your file…" : "Send file to our print team"}
      </button>
    </form>
  );
}
