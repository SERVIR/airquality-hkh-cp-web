// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: ["vuetify/lib/styles/main.sass", "@mdi/font/css/materialdesignicons.min.css", "@/styles/style.scss"],
  build: {
    transpile: ["vuetify"],
  },
  modules: ["@nuxtjs/i18n"],
  i18n: {
    langDir: "locales",
    defaultLocale: "en",
    strategy: "prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "lang",
      redirectOn: "root",
    },
    locales: [
      {
        code: "en",
        file: "en.js",
      },
      {
        code: "ne",
        file: "ne.js",
      },
    ],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
});
