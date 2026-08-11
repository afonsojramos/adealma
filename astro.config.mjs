// @ts-check
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { d1, r2 } from "@emdash-cms/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import emdash from "emdash/astro";

const SITE_URL = "https://adealma.com";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    // Required by EmDash: its admin UI is React and stays on
    // "Loading EmDash..." without this integration registered.
    react(),
    sitemap(),
    // EmDash CMS. Content is localised by EmDash itself (row-per-locale, with
    // translations linked by translation_group), so there is no Paraglide here
    // unlike critical-mass: project copy and page copy live in the CMS, and the
    // handful of UI labels that are not content live in src/i18n/ui.ts.
    emdash({
      siteUrl: SITE_URL,
      database: d1({ binding: "DB" }),
      storage: r2({ binding: "MEDIA" }),
    }),
  ],
  output: "server",
  adapter: cloudflare({
    imageService: "compile",
  }),
  i18n: {
    locales: ["pt", "en"],
    defaultLocale: "pt",
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
