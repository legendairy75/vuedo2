// https://nuxt.com/docs/api/configuration/nuxt-config
// import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  // devtools: { enabled: true, vscode: { } },
  modules: [
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    '@nuxt/ui',
    '@nuxt/icon',
  ],
    app: {
        head: {
            link: [
                {
                    rel: 'stylesheet',
                    // href: 'https://matcha.mizu.sh/matcha.css'
                    href: 'https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css'
                }
            ]
        }
    },
    debug: true
})