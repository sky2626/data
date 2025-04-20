// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  ssr: false, // for SSG
  //target: 'static',
  nitro: {
    preset: 'cloudflare',
    output: {
      publicDir: 'dist'
    }
  },
  
  runtimeConfig: {
    paystackSecretKey: process.env.PAYSTACK_SECRET_KEY, // Only available server-side
    public: {
      paystackPublicKey: process.env.PAYSTACK_PUBLIC_KEY, // Available client-side
    }
  },

  app: {
    head: {
      title: 'Data Site',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'this is logistics compay in Ghana. Marketing and Procurement Services. Marketing and supplies of General goods and services. We also help in sourcing of general goods domestically and Internationally.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/bisadatagh.svg' },
      ],
    },
  },

  modules: ['@nuxt/ui', "@prisma/nuxt"],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
