import { resolve } from "node:path";
import dts from "vite-plugin-dts";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "react-continuous-border-radius",
      fileName: "main",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react/jsx-runtime": "react/jsx-runtime",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  plugins: [
    react(),
    dts({
      tsconfigPath: resolve(__dirname, "tsconfig.app.json"),
      rollupTypes: true,
    }),
  ],
});
