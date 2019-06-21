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
      { href: 'https://fonts.googleapis.com/css?family=Oxygen+Mono', rel: 'stylesheet' },
      { href: 'https://fonts.googleapis.com/css?family=Ubuntu+Mono', rel: 'stylesheet' },
      { href: 'https://fonts.googleapis.com/css?family=Inconsolata', rel: 'stylesheet' },
      { href: 'https://fonts.googleapis.com/css?family=Lobster', rel: 'stylesheet' },
      { href: 'https://fonts.googleapis.com/css?family=Cuprum', rel: 'stylesheet' },
      { href: 'https://fonts.googleapis.com/css?family=Cuprum|Open+Sans:300i', rel: 'stylesheet' },
      { href: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenMax.min.js' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://use.fontawesome.com/releases/v5.8.1/css/all.css' }
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
    '@/plugins/core-admin-comps.js',
    '@/plugins/core-admin-directives.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios'
  ],

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
    '~/server/app_cardinalSystem/index.js',
    // '~/server/sys/core-apps/i0-shell/server/handler.js'
  ]
}
