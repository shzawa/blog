/// <reference types="vitest" />

import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    alias: {
      "@/": `${__dirname}/src/`,
    },
    globals: true,
    testTimeout: 30000,
    reporters: ["basic", "json"],
    outputFile: "results.json",
    setupFiles: ["setup-safetest"],
    include: ["**/*.safetest.?(c|m)[jt]s?(x)"],
    inspect: process.env.CI ? false : true,
  },
})
