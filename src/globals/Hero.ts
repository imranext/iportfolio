import type { GlobalConfig } from "payload";

export const Hero: GlobalConfig = {
  slug: "hero",
  label: "Hero",
  admin: { group: "Site" },
  access: { read: () => true },
  fields: [
    {
      name: "available",
      type: "checkbox",
      label: "Available for Freelance",
      defaultValue: true,
    },
    { name: "greeting", type: "text", defaultValue: "I AM" },
    { name: "name", type: "text", required: true, defaultValue: "Imran" },
    {
      name: "rotatingRoles",
      type: "array",
      labels: { singular: "Role", plural: "Rotating Roles" },
      minRows: 1,
      defaultValue: [
        { label: "WordPress Expert" },
        { label: "Shopify Pro" },
      ],
      fields: [{ name: "label", type: "text", required: true }],
    },
    {
      name: "trustText",
      type: "text",
      defaultValue: "Happy Clients · Fiverr · Upwork",
    },
    {
      name: "ratingText",
      type: "text",
      defaultValue: "800+ 5 star reviews",
    },
    {
      name: "stats",
      type: "array",
      labels: { singular: "Stat", plural: "Stats" },
      maxRows: 4,
      defaultValue: [
        { value: "8+", label: "Years of Experience" },
        { value: "850+", label: "Projects Completed" },
        { value: "800+", label: "Successful Projects" },
      ],
      fields: [
        { name: "value", type: "text", required: true },
        { name: "label", type: "text", required: true },
      ],
    },
    {
      name: "marquee",
      type: "array",
      labels: { singular: "Tag", plural: "Marquee Tags" },
      defaultValue: [
        { label: "Development" },
        { label: "Design" },
        { label: "Webflow" },
        { label: "WordPress" },
        { label: "Shopify" },
        { label: "AI Integration" },
        { label: "Automation" },
      ],
      fields: [{ name: "label", type: "text", required: true }],
    },
    {
      name: "primaryCta",
      type: "group",
      fields: [
        { name: "label", type: "text", defaultValue: "View my recent tasks" },
        { name: "href", type: "text", defaultValue: "#portfolio" },
      ],
    },
  ],
};
