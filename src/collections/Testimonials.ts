import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: {
    singular: "Testimonial",
    plural: "Testimonials",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "company", "rating", "order"],
    group: "Content",
  },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "role", type: "text" },
    { name: "company", type: "text" },
    { name: "quote", type: "textarea", required: true },
    {
      name: "rating",
      type: "number",
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
    },
    { name: "order", type: "number", defaultValue: 0 },
  ],
  defaultSort: "order",
};
