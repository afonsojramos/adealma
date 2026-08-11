// Cloudflare Worker entry for the EmDash-powered site.
//
// Wraps Astro's Cloudflare server handler with EmDash's `scheduled()` handler
// so the Cron Trigger in wrangler.jsonc drives scheduled publishing, plugin
// cron and system cleanup. Re-exports `PluginBridge` so the sandbox binding
// resolves against the entry module.
export { default } from "@emdash-cms/cloudflare/worker";
export { PluginBridge } from "@emdash-cms/cloudflare/worker";
