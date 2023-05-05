// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    srcDir: "src",
    modules: ['@nuxtjs/color-mode','@nuxtjs/tailwindcss', '@pinia/nuxt','@nuxt/image-edge'],

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

          ],
          link:[
            {rel: 'icon', type: 'image/x-icon', href: './public/images/iso.svg'},
          ]
        }
       },

      css: [
        '@/assets/css/main.css',
      ],


})
