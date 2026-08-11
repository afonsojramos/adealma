// @ts-check
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { d1, r2 } from "@emdash-cms/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import emdash from "emdash/astro";

import projects from "./src/data/projects.json" with { type: "json" };

const SITE_URL = "https://adealma.com";

// Server-rendered routes are invisible to @astrojs/sitemap, so every page is
// listed explicitly. English is unprefixed, Portuguese sits under /pt.
const paths = ["/", "/about", "/projects", ...projects.map((p) => `/projects/${p.slug}`)];
const customPages = [
  ...paths.map((path) => `${SITE_URL}${path}`),
  ...paths.map((path) => `${SITE_URL}/pt${path === "/" ? "" : path}`),
];

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  // One canonical form per page: without this both /about and /about/ resolve
  // and the sitemap advertises both.
  trailingSlash: "never",
  // Shortcut to the EmDash admin, which lives under the reserved /_emdash
  // prefix that the integration injects.
  redirects: {
    "/admin": "/_emdash/admin",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    sitemap({ customPages }),
    // D1 holds the content, R2 the media.
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
    locales: ["en", "pt"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
