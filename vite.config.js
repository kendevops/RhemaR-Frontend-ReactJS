import { defineConfig, Plugin } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import checker from "vite-plugin-checker";
import handlebars from "vite-plugin-handlebars";
// const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      overlay: { initialIsOpen: false },
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
      },
    }),
    viteTsconfigPaths(),
    svgrPlugin(),
    handlebars({
      partialDirectory: resolve(__dirname, "src/partials"),
    }),
  ],
  server: {
    port: 3000 || 4000,
    // proxy: {
    //   "/api-server/": "...",
    //   "/authorization/": "...",
    // },
    open: true,
  },
  build: {
    outDir: "build",
  },

  resolve: {
    alias: {
      // "~": path.resolve(__dirname, "./src"),
      "@src": resolve(__dirname, "src"),
      "@assets": resolve(__dirname, "src/assets"),
      "@components": resolve(__dirname, "src/components"),
      "@layouts": resolve(__dirname, "src/components/layouts"),
      "@store": resolve(__dirname, "src/redux"),
      "@styles": resolve(__dirname, "src/assets/scss"),
      "@configs": resolve(__dirname, "src/configs"),
      "@utils": resolve(__dirname, "src/utility"),
      "@services": resolve(__dirname, "src/utility/services"),
      "@context": resolve(__dirname, "src/utility/context"),
      "@hooks": resolve(__dirname, "src/utility/hooks"),
      "@views": resolve(__dirname, "src/views"),
    },
  },

  style: {
    sass: {
      loaderOptions: {
        sassOptions: {
          includePaths: ["node_modules", "src/assets"],
        },
      },
    },
  },
  define: {
    "process.env": {},
  },
});

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig(() => {
//   return {
//     build: {
//       outDir: "build",
//     },
//     plugins: [react()],
//   };
// });
