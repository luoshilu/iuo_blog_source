import Vue from 'vue'

export default {

  getList () {
    return new Promise((resolve, reject) => {
      Vue.axios.get('/config').then(res => {
        resolve(res.data)
      })
    })
  },
}
