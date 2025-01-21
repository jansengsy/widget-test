import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        // Widgets
        counter: path.resolve(__dirname, "src/widgets/counter/index.html"),
        message: path.resolve(__dirname, "src/widgets/message/index.html"),
        // Examples
        "example-counter": path.resolve(__dirname, "examples/counter.html"),
        "example-message": path.resolve(__dirname, "examples/message.html"),
        "example-all": path.resolve(__dirname, "examples/all.html"),
      },
      output: {
        dir: "dist",
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash].[ext]`,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
