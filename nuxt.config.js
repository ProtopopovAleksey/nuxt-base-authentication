import colors from 'vuetify/es5/util/colors'

export default {
  head: {
    titleTemplate: '%s - nuxt-base-authentication',
    title: 'nuxt-base-authentication',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  publicRuntimeConfig: {
    client_id: "frontend_app",
    client_secret: "secret",
    grant_type: "password",
  },

  css: [],

  plugins: [
    '~/plugins/notifier.js'
  ],

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  axios: {
    baseUrl: 'https://stage.api.mamonto.com'
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  build: {},

  auth: {
    strategies: {
      local: {
        token: {
          property: 'access_token',
        },
        endpoints: {
          login: {url: '/token', method: 'post'},
          logout: false,
          user: false
        }
      }
    }
  },
}
