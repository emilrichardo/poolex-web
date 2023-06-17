// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

    srcDir: "src",
    ssr: false,

    modules: ['@nuxtjs/color-mode','@nuxtjs/tailwindcss', '@pinia/nuxt','@nuxt/image-edge','nuxt-icon','@nuxtjs/i18n'],
    i18n: {
       locales: ['en', 'es'],  // used in URL path prefix
        defaultLocale: 'es',    // default locale of your project for Nuxt pages and routings
     },
    components: {
        global: true,
        dirs: ['~/components']
    },
    build: {
      transpile: ['@vimeo/player'],
    },
    runtimeConfig: {
        public:{
          projectName:process.env.PROJECT_NAME,
          projectDesc: process.env.PROJECT_DESC,
          apiBase: process.env.API_BASE_URL,
          apiSession: process.env.API_SESSION_URL,
          apiWeather: process.env.API_WEATHER,
          apiWeatherKey: process.env.API_WEATHER_KEY,
          apiCryptoUrl: process.env.API_CRYPTO_URL,
        }

      },
      app:{
        head: {
          title: process.env.PROJECT_NAME,
          link: [{ rel: 'icon',
          type: 'image/svg+xml',
          href: '/images/iso.svg', }],


          meta:[
            {name: 'description', content:process.env.PROJECT_DESC },

          ]
        }
       },

      css: [
        '@/assets/css/main.css',
      ],


      /* experimental: {
        renderJsonPayloads: false
      } */
})
