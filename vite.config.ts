import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

import type { UserConfig } from "vite";

export default defineConfig({
  base: "arc-raiders-calc",
  plugins: [tailwindcss()],
}) satisfies UserConfig;
