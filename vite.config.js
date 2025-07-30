import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindPostcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";

const tailwindInlineConfig = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 1.5s ease-in-out forwards",
        glow: "glow 2s ease-in-out infinite alternate",
        "slide-in-right": "slideInRight 0.3s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%": { textShadow: "0 0 10px rgba(255,255,255,0.3)" },
          "100%": { textShadow: "0 0 30px rgba(255,255,255,1)" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://passwordsaver-backend.onrender.com",
        changeOrigin: true,
        secure: false, // Set to true if your backend uses a valid HTTPS cert
        rewrite: (path) => path.replace(/^\/api/, "/api"), // optional cleanup
      },
    },
  },
  css: {
    postcss: {
      plugins: [tailwindPostcss(tailwindInlineConfig), autoprefixer()],
    },
  },
});
