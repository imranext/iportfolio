import type { GlobalConfig } from "payload";

export const About: GlobalConfig = {
  slug: "about",
  label: "About",
  admin: { group: "Site" },
  access: { read: () => true },
  fields: [
    {
      name: "heading",
      type: "text",
      defaultValue: "About",
    },
    {
      name: "description",
      type: "textarea",
      defaultValue:
        "I'm an innovative WordPress and Shopify designer and developer in Bangladesh. I specialize in custom builds and responsive solutions that help businesses scale 3x. I'm committed to delivering high-performing websites that turn your vision into reality.",
    },
    {
      name: "portrait",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "highlights",
      type: "array",
      labels: { singular: "Highlight", plural: "Highlights" },
      defaultValue: [
        { label: "Custom WordPress builds" },
        { label: "Shopify storefront expert" },
        { label: "Conversion-focused design" },
      ],
      fields: [{ name: "label", type: "text", required: true }],
    },
  ],
};
