import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
import { routers } from './router'
import { Base64 } from 'js-base64'

Vue.use(VueRouter)

// 路由配置
const RouterConfig = {
  routes: routers
}

const router = new VueRouter(RouterConfig)

router.beforeEach((to, from, next) => {
  // 设置title
  window.document.title = to.meta.title
  let token = localStorage.getItem('token')
  let requiresAuth = to.meta.requiresAuth

  if(requiresAuth === true){
    if(!token){
      next('/login')
      return false
    }
    let tokenArray = token.split('.')
    if (tokenArray.length !== 3) {
      next('/login')
      return false
    }
    let payload = JSON.parse(Base64.decode(tokenArray[1]))
    if (Date.now() > payload.exp * 1000) {
      store.commit('clearToken')
      next('/login')
      return false
    }
  }

  if (token && to.name === 'login') {
    next('/home')
    return false
  }
  // 权限检测 TODO
  next()
})

router.afterEach((to) => {
  // 返回顶部
  window.scrollTo(0, 0)
})
export default router
