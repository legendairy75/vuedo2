// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  // devtools: { enabled: true, vscode: { } },
  modules: [
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    // '@nuxtjs/storybook'
    '@nuxt/ui',
    '@nuxt/icon',
  ],
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  ui: {
    fonts: false
  },
  // storybook: {
  //     url: 'http://localhost:6008',
  //     storybookRoute: '/__storybook__',
  //     port: 6006,
  // },
    debug: true
})