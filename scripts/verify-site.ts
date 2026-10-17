import assert from "node:assert/strict";

import projects from "../src/data/projects.json" with { type: "json" };

const base = new URL(process.argv[2] ?? "https://adealma.afonsojramos.workers.dev");
const canonicalOrigin = new URL(process.argv[3] ?? base.origin).origin;
const paths = ["/", "/about", "/projects", ...projects.map(({ slug }) => `/projects/${slug}`)];
const images = new Set<string>();
const pages: { path: string; html: string }[] = [];

async function get(path: string, status = 200) {
  const response = await fetch(new URL(path, base), {
    signal: AbortSignal.timeout(30_000),
  });
  assert.equal(response.status, status, `${path}: expected HTTP ${status}`);
  assert.equal(new URL(response.url).origin, base.origin, `${path}: redirected away from the site`);
  return response;
}

const localizedPaths = ["", "/pt"].flatMap((prefix) =>
  paths.map((path) => `${prefix}${path === "/" && prefix ? "" : path}`),
);
await Promise.all(
  localizedPaths.map(async (localizedPath) => {
    const html = await (await get(localizedPath)).text();
    assert.match(html, /<title>[^<]*a de alma<\/title>/i, `${localizedPath}: missing site content`);
    pages.push({ path: localizedPath, html });
    for (const match of html.matchAll(/(?:\bsrc|data-preview-src)="([^"]+)"/g)) {
      const source = match[1];
      if (source && (source.includes("/images/") || source.includes("/_emdash/api/media/"))) {
        images.add(source.replaceAll("&amp;", "&"));
      }
    }
  }),
);

assert.ok(images.size > 0, "No project or about images were rendered");
await Promise.all(
  [...images].map(async (image) => {
    const response = await get(image);
    assert.match(response.headers.get("content-type") ?? "", /^image\//, `${image}: not an image`);
    assert.ok((await response.arrayBuffer()).byteLength > 0, `${image}: empty image`);
  }),
);

for (const { path, html } of pages) {
  assert.ok(
    html.includes(`rel="canonical" href="${canonicalOrigin}${path}"`),
    `${path}: canonical URL does not use ${canonicalOrigin}`,
  );
  assert.ok(!html.includes('href="https://adealma.com'), `${path}: link uses the expired domain`);
}

await Promise.all(
  ["/robots.txt", "/sitemap-index.xml", "/sitemap-0.xml"].map(async (path) => {
    const text = await (await get(path)).text();
    assert.ok(text.includes(canonicalOrigin), `${path}: missing the active site origin`);
    assert.ok(!text.includes("https://adealma.com"), `${path}: contains the expired domain`);
  }),
);

const admin = await get("/admin");
assert.match(new URL(admin.url).pathname, /^\/_emdash\//, "Admin shortcut did not reach EmDash");
await get("/this-page-does-not-exist", 404);
await get("/projects/this-project-does-not-exist", 404);
await get("/pt/projects/this-project-does-not-exist", 404);

console.log(
  `HTTP checks passed for ${pages.length} pages, ${images.size} images, SEO URLs, the EmDash login route and 404s.`,
);
