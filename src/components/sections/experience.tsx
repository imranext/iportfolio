import { Briefcase, GraduationCap } from "lucide-react";
import { formatDateRange } from "@/lib/utils";
import { LexicalRenderer } from "@/components/lexical-renderer";

type Item = {
  id: string | number;
  role?: string;
  title?: string;
  company?: string;
  institution?: string;
  startDate?: string | null;
  endDate?: string | null;
  current?: boolean | null;
  description?: unknown;
};

export function Experience({
  experience,
  education,
}: {
  experience: Item[];
  education: Item[];
}) {
  return (
    <section id="experience" className="py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div>
          <p className="font-display text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Education & Work Experience
          </p>
          <h2 className="section-heading mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">
            My Journey
          </h2>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <Timeline
            heading="Experience"
            icon={<Briefcase className="h-5 w-5" />}
            color="bg-accent-coral/15 text-accent-coral"
            items={experience.map((e) => ({
              ...e,
              titleText: e.role || "",
              subtitle: e.company,
            }))}
          />
          <Timeline
            heading="Education"
            icon={<GraduationCap className="h-5 w-5" />}
            color="bg-accent-purple/15 text-accent-purple"
            items={education.map((e) => ({
              ...e,
              titleText: e.title || "",
              subtitle: e.institution,
            }))}
          />
        </div>
      </div>
    </section>
  );
}

type TimelineItem = Item & { titleText: string; subtitle?: string };

function Timeline({
  heading,
  icon,
  color,
  items,
}: {
  heading: string;
  icon: React.ReactNode;
  color: string;
  items: TimelineItem[];
}) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${color}`}>
          {icon}
        </span>
        <h3 className="font-display text-xl font-semibold tracking-tight">{heading}</h3>
      </div>

      <div className="relative pl-6">
        <span className="absolute left-2 top-0 bottom-0 w-px bg-border" />
        {items.length === 0 && (
          <p className="text-sm text-muted-foreground">No entries yet.</p>
        )}
        <div className="space-y-8">
          {items.map((item) => (
            <div key={item.id} className="relative">
              <span className="absolute -left-[18px] top-1 h-3 w-3 rounded-full border-2 border-background bg-foreground" />
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {formatDateRange(item.startDate, item.endDate, item.current)}
              </p>
              <h4 className="mt-1 font-display text-lg font-semibold">{item.titleText}</h4>
              {item.subtitle && (
                <p className="text-sm text-muted-foreground">{item.subtitle}</p>
              )}
              {item.description ? (
                <div className="mt-2 max-w-prose text-sm text-muted-foreground">
                  <LexicalRenderer content={item.description} />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
