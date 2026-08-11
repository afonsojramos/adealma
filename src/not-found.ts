/**
 * Render the 404 page with a 404 status. A rewrite alone renders the page but
 * keeps a 200, and a bare Response carries the status with no body.
 */
export async function notFound(rewrite: (path: string) => Promise<Response>): Promise<Response> {
  const page = await rewrite("/404");
  return new Response(page.body, { status: 404, headers: page.headers });
}
