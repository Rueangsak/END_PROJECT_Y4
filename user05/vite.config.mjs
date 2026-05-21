import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3002,
  },
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.[jt]sx?$/,
    exclude: [],
    jsx: "transform",
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
});
