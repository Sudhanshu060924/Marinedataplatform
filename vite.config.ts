import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./client", "./shared", "./node_modules"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa", // This is what we will deploy
  },
  plugins: [react(), expressPlugin(mode)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(mode: string): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development
    configureServer(server) {
      if (mode === "development") {
        const { createServer } = require("./server"); // Dynamic require
        const app = createServer();
        server.middlewares.use(app);
      }
    },
  };
}
