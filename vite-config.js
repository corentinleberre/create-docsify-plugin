import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/plugin/main.js"),
      fileName: "my-plugin",
      formats: ["cjs", "es"],
    },
  },
});
