import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  ssr: { noExternal: ["better-auth", "@better-auth/core"] },
  optimizeDeps: { exclude: ["@better-auth/core"] },
});
