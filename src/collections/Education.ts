import type { CollectionConfig } from "payload";

export const Education: CollectionConfig = {
  slug: "education",
  labels: {
    singular: "Education",
    plural: "Education",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "institution", "startDate", "endDate"],
    group: "Resume",
  },
  access: { read: () => true },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "institution", type: "text", required: true },
    { name: "location", type: "text" },
    {
      name: "startDate",
      type: "date",
      required: true,
      admin: { date: { pickerAppearance: "monthOnly", displayFormat: "yyyy" } },
    },
    {
      name: "endDate",
      type: "date",
      admin: { date: { pickerAppearance: "monthOnly", displayFormat: "yyyy" } },
    },
    { name: "current", type: "checkbox", defaultValue: false },
    { name: "description", type: "richText" },
    { name: "order", type: "number", defaultValue: 0 },
  ],
  defaultSort: "-startDate",
};
