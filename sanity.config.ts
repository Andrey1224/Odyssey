import { deskTool } from "sanity/desk";
import { defineConfig } from "sanity";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "Odyssey Blog CMS",

  // ✅ НЕ через env
  projectId: "ja23se9g",
  dataset: "production",

  plugins: [deskTool()],
  schema: { types: schemaTypes },
});