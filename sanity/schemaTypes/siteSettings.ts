import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "address", title: "Address", type: "string" }),
    defineField({ name: "openingHours", title: "Opening Hours", type: "string" }),
    defineField({ name: "defaultSeoTitle", title: "Default SEO title", type: "string" }),
    defineField({ name: "defaultSeoDescription", title: "Default SEO description", type: "text", rows: 3 }),
    defineField({
      name: "defaultOgImage",
      title: "Default OG image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "blogCtaBlock",
      title: "Blog CTA block",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "text",
          title: "Text",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "primaryButtonLabel",
          title: "Primary button label",
          type: "string",
        }),
        defineField({
          name: "primaryButtonHref",
          title: "Primary button href",
          type: "string",
        }),
        defineField({
          name: "secondaryButtonLabel",
          title: "Secondary button label",
          type: "string",
        }),
        defineField({
          name: "secondaryButtonHref",
          title: "Secondary button href",
          type: "string",
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({
      title: "Site Settings",
      subtitle: "Global content + SEO defaults",
    }),
  },
});
