/**
 * Image slots and the delivery-time transform behind them.
 *
 * EmDash cannot convert or crop on upload: the `media:beforeUpload` hook only
 * sees `{ name, type, size }`, and the admin has no cropper. So the framing is
 * enforced here instead, on the way out. Cloudflare resizes each image to its
 * slot, which fixes the aspect ratio whatever was uploaded, and re-encodes it
 * to WebP (or AVIF) for browsers that accept it, falling back to JPEG for
 * those that do not.
 *
 * `gravity=auto` lets Cloudflare pick the salient region rather than blindly
 * cropping to the centre, which is the closest thing to choosing a crop by
 * hand.
 */

/** The size each slot is served at, and so the ratio it is cropped to. */
export const SLOTS = {
  /** Full-bleed image at the foot of a project page. */
  banner: { width: 2476, height: 1416 },
  /** Swiper slides on the project and about pages. */
  carousel: { width: 820, height: 620 },
  /** The card that follows the cursor over the projects table. */
  preview: { width: 270, height: 420 },
} as const;

export type Slot = keyof typeof SLOTS;

/**
 * Rewrite an image URL to be served through Cloudflare's transform.
 *
 * Only applied in production: `/cdn-cgi/image/` is an edge feature and 404s
 * against the dev server, so development keeps the untouched original.
 */
export function slotImage(src: string, slot: Slot): string {
  if (!import.meta.env.PROD) return src;
  const { width, height } = SLOTS[slot];
  const options = `format=auto,width=${width},height=${height},fit=cover,gravity=auto`;
  return `/cdn-cgi/image/${options}${src}`;
}
