const MOBILE_RE = /Mobi|Android|iPhone|iPod/i;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/" || url.pathname === "/index.html") {
      const ua = request.headers.get("User-Agent") || "";
      url.pathname = MOBILE_RE.test(ua) ? "/mobile.html" : "/index.html";

      const res = await env.ASSETS.fetch(new Request(url, request));
      const out = new Response(res.body, res);
      out.headers.append("Vary", "User-Agent"); // keeps caches from mixing the two versions
      return out;
    }

    return env.ASSETS.fetch(request);
  },
};