import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  admin: { group: "Site" },
  access: { read: () => true },
  fields: [
    { name: "siteName", type: "text", defaultValue: "ImranX" },
    {
      name: "tagline",
      type: "text",
      defaultValue: "WordPress & Shopify expert from Bangladesh",
    },
    { name: "logo", type: "upload", relationTo: "media" },
    { name: "logoDark", type: "upload", relationTo: "media" },
    { name: "ogImage", type: "upload", relationTo: "media" },
    {
      name: "cv",
      type: "upload",
      relationTo: "media",
      admin: { description: "Upload your CV (PDF). Will be linked from the header / hero." },
    },
    {
      name: "footer",
      type: "group",
      fields: [
        {
          name: "copyright",
          type: "text",
          defaultValue: "All rights reserved by ImranX",
        },
      ],
    },
  ],
};
