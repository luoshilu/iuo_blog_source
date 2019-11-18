import Vue from 'vue'
export default {
  getList (data, map = {}) {
    map.type = 'demo'
    return new Promise((resolve, reject) => {
      Vue.axios.get('/demo', { params: map }).then(response => {
        resolve(response.data)
      })
    })
  },

  getDetail (id, map = {}) {
    map.type = 'demo'
    return new Promise((resolve, reject) => {
      Vue.axios.get('/demo/' + id, { params: map }).then(response => {
        resolve(response.data)
      })
    })
  },
}
