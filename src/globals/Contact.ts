import type { GlobalConfig } from "payload";

export const Contact: GlobalConfig = {
  slug: "contact",
  label: "Contact",
  admin: { group: "Site" },
  access: { read: () => true },
  fields: [
    {
      name: "heading",
      type: "text",
      defaultValue: "Have a project in mind? Let's work together to bring your vision to life",
    },
    { name: "email", type: "email", defaultValue: "imranlabs@yahoo.com" },
    { name: "phone", type: "text", defaultValue: "+8801540010600" },
    { name: "address", type: "text", defaultValue: "Tangail Sadar 1900, Dhaka" },
    {
      name: "socials",
      type: "array",
      labels: { singular: "Social Link", plural: "Socials" },
      defaultValue: [
        { platform: "github", url: "https://github.com/imranext" },
        { platform: "linkedin", url: "https://linkedin.com/in/" },
        { platform: "upwork", url: "https://upwork.com/" },
        { platform: "fiverr", url: "https://fiverr.com/" },
      ],
      fields: [
        {
          name: "platform",
          type: "select",
          required: true,
          options: [
            { label: "GitHub", value: "github" },
            { label: "LinkedIn", value: "linkedin" },
            { label: "Twitter / X", value: "twitter" },
            { label: "Instagram", value: "instagram" },
            { label: "Dribbble", value: "dribbble" },
            { label: "Behance", value: "behance" },
            { label: "Upwork", value: "upwork" },
            { label: "Fiverr", value: "fiverr" },
            { label: "YouTube", value: "youtube" },
          ],
        },
        { name: "url", type: "text", required: true },
      ],
    },
    {
      name: "formEnabled",
      type: "checkbox",
      defaultValue: true,
      admin: { description: "Toggle the contact form on the homepage." },
    },
  ],
};
