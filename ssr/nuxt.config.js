
module.exports = {
  mode: 'universal',
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
  head: {
    titleTemplate: `%s | IUO`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'author', content: 'luo' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge, chrome=1' },
      { name: 'renderer', content: 'webkit' },
      { name: 'Cache-Control', content: 'no-siteapp' },
      { rel: 'dns-prefetch', content: '//secure.gravatar.com' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/static/home/img/favicon.ico' },
    ],
  },
  router: {
    middleware: ['visitor'],
  },
  axios: {
    proxy: true,
    credentials: true,
  },

  proxy: {
    '/client_api': {
      target: `http://127.0.0.1:8765`,
      changeOrigin: true,
      pathRewrite: {
        // '^/client_api' : '/'
      },
    },
  },

  loading: { color: '#6fa3ef', height: '3px' },

  css: [
    '~/assets/style/index.scss',
  ],

  plugins: [
    '@/plugins/moment',
    '@/plugins/axios',
    '@/plugins/filter',
    '@/plugins/iconbase',
    {
      src: '@/plugins/ga.js',
      ssr: false,
    },
    {
      src: '@/plugins/lazyload.js',
      ssr: false,
    },
  ],

  modules: [
    ['nuxt-sass-resources-loader', ['~/assets/style/index.scss']],
    '@nuxtjs/proxy',
    // SSR 模块缓存
    '@nuxtjs/component-cache',
    // 配置选项
    ['@nuxtjs/component-cache', {
      max: 10000,
      maxAge: 1000 * 60 * 60,
    }],
  ],

  build: {
    postcss: {
      // 添加插件名称作为键，参数作为值
      plugins: {},
    },
    extend: config => {
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))

      svgRule.test = /\.(png|jpe?g|gif|webp)$/

      config.module.rules.push({
        test: /\.svg$/,
        loader: 'vue-svg-loader',
      })
    },
  },
}
