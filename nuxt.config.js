const pkg = require('./package')
const bodyParser = require('body-parser')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { href:'https://fonts.googleapis.com/css?family=Oxygen+Mono', rel:'stylesheet'},
      { href:'https://fonts.googleapis.com/css?family=Ubuntu+Mono', rel:'stylesheet'},
      { href:'https://fonts.googleapis.com/css?family=Inconsolata', rel:'stylesheet' },
      { href: 'https://fonts.googleapis.com/css?family=Lobster', rel: 'stylesheet' },
      { href: 'https://fonts.googleapis.com/css?family=Cuprum', rel: 'stylesheet' }

    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  },
  serverMiddleware: [
    bodyParser.json(),
    '~/server/sys/core-apps/app/index.js',
    '~/server/sys/core-apps/i0-shell/server/handler.js'
  ]
}
