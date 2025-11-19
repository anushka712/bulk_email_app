import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      buffer: "buffer",
      "@pages": path.resolve(__dirname, "src/pages"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@components": path.resolve(__dirname, "src/components"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@services": path.resolve(__dirname, "src/services"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@store": path.resolve(__dirname, "src/store"),
      "@data": path.resolve(__dirname, "src/data"),
      "@configs": path.resolve(__dirname, "src/configs"),
      "@validations": path.resolve(__dirname, "src/validations"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@": path.resolve(__dirname, "src"),
    },
  },
});
