// @ts-check
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { d1, r2 } from "@emdash-cms/cloudflare";
import { cloudflareEmail } from "@emdash-cms/cloudflare/plugins/cloudflare-email";
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
      // Plugin marketplace. Installed bundles are copied into this site's own
      // R2 at install time, so the marketplace is only a distribution
      // channel, not a runtime dependency. Everything it installs runs
      // sandboxed, which is why the runner is required alongside it.
      marketplace: "https://marketplace.emdashcms.com",
      sandboxRunner: "@emdash-cms/cloudflare/sandbox",
      // Mail leaves through the EMAIL binding, from the mail.adealma.com
      // sending domain. Replies go to the studio rather than the no-reply
      // address. Activate under Admin > Extensions, then pick it under
      // Settings > Email.
      plugins: [
        // Upstream typing gap: the plugin returns
        // PluginDescriptor<CloudflareEmailConfig>, while `plugins` takes
        // PluginDescriptor<Record<string, unknown>>, and an interface without
        // an index signature does not satisfy that. The runtime shape is
        // correct; this line starts failing once EmDash widens the type.
        // @ts-expect-error -- see above
        cloudflareEmail({
          from: { email: "no-reply@mail.adealma.com", name: "A de Alma" },
          replyTo: "formulaobliqua@gmail.com",
        }),
      ],
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
