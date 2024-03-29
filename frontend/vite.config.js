import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  optimizeDeps: {
    // 👈 optimizedeps
    esbuildOptions: {
      target: "esnext",
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      supported: {
        bigint: true,
      },
    },
  },

  define: {
    "process.env": {
      // REACT_APP_BASED_URL: "http://localhost:3000/api",
      REACT_APP_BASED_URL: "http://52.90.132.78/api",
    },
  },

  build: {
    target: ["esnext"], // 👈 build.target
  },
});
