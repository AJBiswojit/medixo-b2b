import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

function absoluteSocialImages(canonicalUrl) {
  return {
    name: "absolute-social-images",
    transformIndexHtml: {
      // Run before Vite rewrites asset paths. Crawlers do not run the SPA.
      order: "pre",
      handler(html) {
        const canonical = URL.canParse(canonicalUrl)
          ? new URL(canonicalUrl)
          : null;
        if (!canonical || !["https:", "http:"].includes(canonical.protocol))
          return html;
        return html.replace(
          /((?:property="og:image"|name="twitter:image")\s+content=")(\/[^"]+)/g,
          (_, prefix, path) =>
            `${prefix}${new URL(path, canonical.origin).href}`,
        );
      },
    },
  };
}

export default defineConfig(({ mode }) => {
  const { VITE_CANONICAL_URL = "" } = loadEnv(mode, process.cwd());
  return {
    plugins: [
      react(),
      tailwindcss(),
      absoluteSocialImages(VITE_CANONICAL_URL.trim()),
      viteSingleFile(),
    ],
    resolve: {
      alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    },
    server: { host: "0.0.0.0", allowedHosts: [".e2b.app"] },
    preview: { host: "0.0.0.0", allowedHosts: [".e2b.app"] },
  };
});
