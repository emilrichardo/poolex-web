// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss','@nuxtjs/color-mode', '@pinia/nuxt'],

    css: [
        '@/assets/css/main.css',
      ],
})
