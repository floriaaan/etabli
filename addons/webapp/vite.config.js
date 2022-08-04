import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { server } from "../../config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  server: {
    port: server.webapp.port || 8080,
  },
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
  clearScreen: false,
});
