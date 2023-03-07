// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss','@nuxtjs/color-mode', '@pinia/nuxt'],
    components: {
        global: true,
        dirs: ['~/components']
    },
    routeRules: {
        '/': {
          ssr:false
        }
       },
    css: [
        '@/assets/css/main.css',
      ],
})
