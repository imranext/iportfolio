type MediaLike = {
  url?: string | null;
  filename?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
} | string | number | null | undefined;

export function mediaUrl(media: MediaLike, fallback = ""): string {
  if (!media) return fallback;
  if (typeof media === "string") return fallback;
  if (typeof media === "number") return fallback;
  return media.url || fallback;
}

export function mediaAlt(media: MediaLike, fallback = ""): string {
  if (!media) return fallback;
  if (typeof media === "string") return fallback;
  if (typeof media === "number") return fallback;
  return media.alt || fallback;
}
