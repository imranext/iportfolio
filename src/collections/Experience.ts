import type { CollectionConfig } from "payload";

export const Experience: CollectionConfig = {
  slug: "experience",
  labels: {
    singular: "Experience",
    plural: "Experience",
  },
  admin: {
    useAsTitle: "role",
    defaultColumns: ["role", "company", "startDate", "endDate"],
    group: "Resume",
  },
  access: { read: () => true },
  fields: [
    { name: "role", type: "text", required: true },
    { name: "company", type: "text", required: true },
    { name: "location", type: "text" },
    {
      name: "startDate",
      type: "date",
      required: true,
      admin: { date: { pickerAppearance: "monthOnly", displayFormat: "MMM yyyy" } },
    },
    {
      name: "endDate",
      type: "date",
      admin: {
        date: { pickerAppearance: "monthOnly", displayFormat: "MMM yyyy" },
        description: "Leave empty if this is your current role.",
      },
    },
    { name: "current", type: "checkbox", defaultValue: false },
    { name: "description", type: "richText" },
    { name: "order", type: "number", defaultValue: 0 },
  ],
  defaultSort: "-startDate",
};
