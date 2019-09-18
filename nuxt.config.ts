const environment = process.env.NODE_ENV || 'development';
const envSet = require(`./env.${environment}.ts`)

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'FilSc',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/movie.png' }
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
    '@/assets/reset.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  router: {
    middleware: 'auth'
  },
  plugins: [
    '~/plugins/fireauth.ts'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  devModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    'nuxt-fontawesome',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      },
      {
        set: '@fortawesome/free-brands-svg-icons',
        icons: ['fab']
      }
    ]
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
  },
  buildModules: ['@nuxt/typescript-build'],
  env: envSet,
  manifest: {
    name: "FilSc",
    title: "FilSc",
    'og:title': 'FilSc',
    description: 'ちょっと時間が空いた時にスッキリハマる映画をFilmarksからすぐに探したいですよね。そんなあなたのためのサービスです。',
    'og:description': 'ちょっと時間が空いた時にスッキリハマる映画をFilmarksからすぐに探したいですよね。そんなあなたのためのサービスです。',
    lang: 'ja',
    display: "standalone",
    scope: '/',
    start_url: '/'
  }
}
