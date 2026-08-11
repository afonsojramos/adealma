// Worker entry: Astro's Cloudflare handler plus EmDash's scheduled()
// handler, driven by the Cron Trigger in wrangler.jsonc. PluginBridge is
// re-exported so the sandbox binding resolves against the entry module.
export { default } from "@emdash-cms/cloudflare/worker";
export { PluginBridge } from "@emdash-cms/cloudflare/worker";
