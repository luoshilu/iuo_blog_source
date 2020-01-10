import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import axios from './axios'
import VueAxios from 'vue-axios'
import { sync } from 'vuex-router-sync'

import iview from 'iview'

import CONST from 'iuo_blog_constant'
window.CONST = CONST // 将变量可全局访问

// 插件
Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(iview)
sync(store, router)

// 配置
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
