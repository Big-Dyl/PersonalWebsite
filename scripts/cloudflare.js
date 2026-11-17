export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const userAgent = request.headers.get("User-Agent") || "";

        const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(userAgent);

        if (url.pathname === "/mobile.html") {
            return new Response("Not Found", { status: 404 });
        }

        if (url.pathname === "/" || url.pathname === "/index.html") {
            const target = isMobile ? "/mobile.html" : "/index.html";

            const assetUrl = new URL(target, request.url);

            return env.ASSETS.fetch(
                new Request(assetUrl, request)
            );
        }

        return env.ASSETS.fetch(request);
    }
};