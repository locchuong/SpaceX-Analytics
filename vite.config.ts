/// <reference types="vitest" />
/// <reference types="vite/client" />
import generouted from "@generouted/react-router/plugin";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import path from "path";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react(), generouted(), eslint(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup-tests.ts",
    css: true,
    coverage: {
      provider: "v8",
      all: true,
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
});
