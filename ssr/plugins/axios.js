import Vue from 'vue'

import VueAxios from 'vue-axios'

import axios from 'axios'

axios.defaults.baseURL = process.server ? `http://127.0.0.1:8765/client_api` : `/client_api`
// axios.defaults.baseURL = '/client_api'

axios.defaults.timeout = 50000

// http请求拦截器
// axios.interceptors.request.use(config => {
//   // 防止缓存
//   if (config.method === 'post' && config.headers['Content-Type']!=='multipart/form-data') {
//     config.data = {
//       ...config.data,
//       _t: Date.parse(new Date()) / 1000
//     }
//   } else if (config.method === 'get') {
//     config.params = {
//       _t: Date.parse(new Date()) / 1000,
//       ...config.params
//     }
//   }
//   return config
// }, error => {
//   alert('请求服务器超时')
//   return error
// })

// // http响应拦截器
// axios.interceptors.response.use(data => {
//   if (!data || typeof data.data !== 'object') {
//     alert('服务器响应格式错误')
//     return Promise.reject()
//   } else {
//     let errmsg = ''
//     const errno = data.data.errno
//     switch (errno) {
//       case 1001:
//         // 数据检验未通过
//         for (let i in data.data.data) {
//           errmsg += data.data.data[i] + ';'
//         }
//         break
//       default:
//         errmsg = data.data.errmsg
//         break
//     }
//     if (errmsg !== '') {
//       alert(errmsg)
//       return Promise.reject(errmsg)
//     }
//   }
//   return data
// }, error => {
//   let errmsg = '服务器响应错误'
//   alert(errmsg)
//   return Promise.reject(error.response.data)
// })

Vue.use(VueAxios, axios)
