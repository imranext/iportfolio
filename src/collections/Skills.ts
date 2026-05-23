import type { CollectionConfig } from "payload";

export const Skills: CollectionConfig = {
  slug: "skills",
  labels: {
    singular: "Skill",
    plural: "Skills",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "percentage", "category", "order"],
    group: "Resume",
  },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "percentage",
      type: "number",
      required: true,
      min: 0,
      max: 100,
      defaultValue: 80,
    },
    {
      name: "category",
      type: "select",
      defaultValue: "primary",
      options: [
        { label: "Primary", value: "primary" },
        { label: "Secondary", value: "secondary" },
        { label: "Tools", value: "tools" },
      ],
    },
    { name: "tagline", type: "text" },
    { name: "order", type: "number", defaultValue: 0 },
  ],
  defaultSort: "order",
};
