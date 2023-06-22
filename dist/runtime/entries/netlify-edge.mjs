import "#internal/nitro/virtual/polyfill";
import { nitroApp } from "../app.mjs";
import { isPublicAssetURL } from "#internal/nitro/virtual/public-assets";
export default async function(request, _context) {
  const url = new URL(request.url);
  if (isPublicAssetURL(url.pathname)) {
    return;
  }
  if (!request.headers.has("x-forwarded-proto") && url.protocol === "https:") {
    request.headers.set("x-forwarded-proto", "https");
  }
  let body;
  if (request.body) {
    body = await request.arrayBuffer();
  }
  const r = await nitroApp.localCall({
    url: url.pathname + url.search,
    host: url.hostname,
    protocol: url.protocol,
    // @ts-ignore TODO
    headers: request.headers,
    method: request.method,
    redirect: request.redirect,
    body
  });
  return new Response(r.body, {
    headers: r.headers,
    status: r.status,
    statusText: r.statusText
  });
}
