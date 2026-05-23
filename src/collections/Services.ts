import type { CollectionConfig } from "payload";

export const Services: CollectionConfig = {
  slug: "services",
  labels: {
    singular: "Service",
    plural: "Services",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "icon", "order"],
    group: "Content",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "icon",
      type: "text",
      required: true,
      admin: {
        description:
          "Lucide icon name in PascalCase (e.g. Code, Palette, PenTool, Megaphone). See https://lucide.dev/icons.",
      },
      defaultValue: "Sparkles",
    },
    {
      name: "accentColor",
      type: "select",
      defaultValue: "purple",
      options: [
        { label: "Purple", value: "purple" },
        { label: "Coral", value: "coral" },
        { label: "Yellow", value: "yellow" },
        { label: "Teal", value: "teal" },
      ],
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { step: 1 },
    },
  ],
  defaultSort: "order",
};
