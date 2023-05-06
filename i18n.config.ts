export default defineI18nConfig(nuxt => ({
    legacy: false,
    locales: ['en', 'es'],  // used in URL path prefix
    defaultLocale: 'en',    // default locale of your project for Nuxt pages and routings

  }))