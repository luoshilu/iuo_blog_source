import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)

Vue.use(VueLazyload, {
  attempt: 1, // 尝试加载次数
  throttleWait: 300,
})
