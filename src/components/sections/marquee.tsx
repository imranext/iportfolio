export function Marquee({ items }: { items: string[] }) {
  if (!items?.length) return null;
  // duplicate for seamless loop
  const loop = [...items, ...items, ...items, ...items];
  return (
    <section className="border-y border-border bg-card/40 py-6 overflow-hidden">
      <div className="relative flex gap-12">
        <div className="animate-marquee flex shrink-0 items-center gap-12 whitespace-nowrap font-display text-2xl md:text-4xl font-extrabold uppercase tracking-tight">
          {loop.map((label, i) => (
            <span key={label + i} className="flex items-center gap-12">
              <span className="text-foreground/90">{label}</span>
              <span className="inline-block h-2 w-2 rounded-full bg-accent-coral" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
