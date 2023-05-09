// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    srcDir: "src",
    modules: ['@nuxtjs/color-mode','@nuxtjs/tailwindcss', '@pinia/nuxt','@nuxt/image-edge','nuxt-icon','@nuxtjs/i18n'],
    i18n: {
       locales: ['en', 'es'],  // used in URL path prefix
        defaultLocale: 'en',    // default locale of your project for Nuxt pages and routings
     },
    components: {
        global: true,
        dirs: ['~/components']
    },
    runtimeConfig: {
        public:{
          projectName:process.env.PROJECT_NAME,
          projectDesc: process.env.PROJECT_DESC,
          apiBase: process.env.API_BASE_URL,
        }
      },
      app:{
        head: {
          title: process.env.PROJECT_NAME,

          meta:[
            {name: 'description', content:process.env.PROJECT_DESC },

          ]
        }
       },

      css: [
        '@/assets/css/main.css',
      ],


})
