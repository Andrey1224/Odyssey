import { createClient } from "next-sanity";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;
const apiVersion = process.env.SANITY_API_VERSION;

export const isSanityConfigured = Boolean(projectId && dataset && apiVersion);

export const sanityClient = createClient({
  projectId: projectId ?? "demo-project-id",
  dataset: dataset ?? "production",
  apiVersion: apiVersion ?? "2026-01-01",
  useCdn: true,
  perspective: "published",
  token: process.env.SANITY_READ_TOKEN,
});
