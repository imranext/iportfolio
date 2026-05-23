import type { CollectionConfig } from "payload";

export const Portfolio: CollectionConfig = {
  slug: "portfolio",
  labels: {
    singular: "Portfolio Item",
    plural: "Portfolio",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "featured", "order"],
    group: "Content",
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: { description: "URL-friendly identifier (e.g. acme-redesign)." },
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "WordPress", value: "wordpress" },
        { label: "Shopify", value: "shopify" },
        { label: "Webflow", value: "webflow" },
        { label: "UI/UX", value: "uiux" },
        { label: "Other", value: "other" },
      ],
    },
    { name: "summary", type: "textarea", required: true },
    {
      name: "description",
      type: "richText",
    },
    {
      name: "cover",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "gallery",
      type: "array",
      labels: { singular: "Image", plural: "Gallery" },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "client",
      type: "text",
    },
    {
      name: "liveUrl",
      type: "text",
      admin: { description: "Live project URL (https://...)." },
    },
    {
      name: "tech",
      type: "array",
      labels: { singular: "Tech", plural: "Tech Stack" },
      fields: [{ name: "label", type: "text", required: true }],
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
    },
  ],
  defaultSort: "order",
};
