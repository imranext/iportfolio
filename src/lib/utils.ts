import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateRange(start?: string | null, end?: string | null, current?: boolean | null) {
  const fmt = (iso?: string | null) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };
  const startStr = fmt(start);
  if (current) return `${startStr} – Present`;
  const endStr = fmt(end);
  return endStr ? `${startStr} – ${endStr}` : startStr;
}
