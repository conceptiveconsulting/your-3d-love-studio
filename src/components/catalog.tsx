export function ProductCard({
  title,
  meta,
  image,
  highlight,
}: {
  title: string;
  meta?: string;
  image?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-[14px] border p-5 ${
        highlight ? "border-brand-purple bg-[#FBF9FF]" : "border-border bg-card"
      }`}
    >
      <div className="mb-3.5 aspect-square overflow-hidden rounded-[10px] bg-muted">
        {image && <img src={image} alt={title} loading="lazy" className="h-full w-full object-cover" />}
      </div>
      <h4 className="font-body text-[14.5px] font-bold">{title}</h4>
      {meta && <span className="text-[12.5px] text-muted-foreground">{meta}</span>}
    </div>
  );
}

export function ChipRow({ chips, active, onChange }: { chips: string[]; active: string; onChange: (c: string) => void }) {
  return (
    <div className="my-6 flex flex-wrap gap-2">
      {chips.map((c) => (
        <button key={c} className={c === active ? "chip chip-active" : "chip"} onClick={() => onChange(c)}>
          {c}
        </button>
      ))}
    </div>
  );
}
