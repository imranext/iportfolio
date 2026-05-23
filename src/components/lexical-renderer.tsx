/* Lightweight server-safe renderer for Payload's Lexical richText output. */
import React from "react";

type LexicalNode = {
  type?: string;
  tag?: string;
  text?: string;
  format?: number | string;
  children?: LexicalNode[];
  url?: string;
  listType?: string;
  fields?: { url?: string };
};

type LexicalRoot = {
  root?: { children?: LexicalNode[] };
} | null | undefined | unknown;

const renderText = (node: LexicalNode): React.ReactNode => {
  let el: React.ReactNode = node.text;
  if (typeof node.format === "number") {
    if (node.format & 1) el = <strong>{el}</strong>;
    if (node.format & 2) el = <em>{el}</em>;
    if (node.format & 8) el = <u>{el}</u>;
    if (node.format & 16) el = <code>{el}</code>;
  }
  return el;
};

const renderNode = (node: LexicalNode, key: number): React.ReactNode => {
  if (node.type === "text") return <React.Fragment key={key}>{renderText(node)}</React.Fragment>;
  const children = (node.children || []).map((c, i) => renderNode(c, i));
  switch (node.type) {
    case "paragraph":
      return (
        <p key={key} className="mb-2 last:mb-0">
          {children}
        </p>
      );
    case "heading": {
      const Tag = (node.tag as keyof React.JSX.IntrinsicElements) || "h3";
      return React.createElement(
        Tag as React.ElementType,
        { key, className: "mt-3 font-semibold" },
        children,
      );
    }
    case "list": {
      const Tag = node.listType === "number" ? "ol" : "ul";
      return React.createElement(
        Tag as React.ElementType,
        { key, className: "ml-5 list-disc space-y-1" },
        children,
      );
    }
    case "listitem":
      return <li key={key}>{children}</li>;
    case "link": {
      const href = node.fields?.url || node.url || "#";
      return (
        <a key={key} href={href} className="underline" target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    default:
      return <React.Fragment key={key}>{children}</React.Fragment>;
  }
};

export function LexicalRenderer({ content }: { content: LexicalRoot }) {
  if (!content || typeof content !== "object") return null;
  const root = (content as { root?: { children?: LexicalNode[] } }).root;
  const children = root?.children || [];
  return <>{children.map((c, i) => renderNode(c, i))}</>;
}
