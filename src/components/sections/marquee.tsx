export function Marquee({ items }: { items: string[] }) {
  if (!items?.length) return null;
  const loop = [...items, ...items, ...items, ...items];

  return (
    <section className="relative border-y border-border bg-background py-8 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-accent-coral/5 via-accent-yellow/5 to-accent-purple/5" />

      {/* Row 1: filled, scrolls left */}
      <div className="flex">
        <div className="animate-marquee flex shrink-0 items-center gap-12 whitespace-nowrap pr-12 font-display text-3xl md:text-5xl font-extrabold uppercase tracking-tight">
          {loop.map((label, i) => (
            <span key={`a-${label}-${i}`} className="flex items-center gap-12">
              <span>{label}</span>
              <span className="inline-block h-2 w-2 rotate-45 bg-accent-coral" />
            </span>
          ))}
        </div>
      </div>

      {/* Row 2: stroked outline, scrolls left slower (offset) */}
      <div className="mt-2 flex">
        <div
          className="animate-marquee-slow flex shrink-0 items-center gap-12 whitespace-nowrap pr-12 font-display text-3xl md:text-5xl font-extrabold uppercase tracking-tight marquee-text-stroke"
          style={{ animationDirection: "reverse" }}
        >
          {loop.map((label, i) => (
            <span key={`b-${label}-${i}`} className="flex items-center gap-12">
              <span>{label}</span>
              <span className="inline-block h-3 w-3 rounded-full border-2 border-foreground" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
