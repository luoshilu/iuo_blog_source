import Vue from 'vue'

export default {

  create (data) {
    return new Promise((resolve, reject) => {
      Vue.axios.post('/content', data).then(response => {
        resolve(response.data)
      })
    })
  },

  getList (map = {}) {
    map.type = map.type || 'default'
    return new Promise((resolve, reject) => {
      Vue.axios.get('/content', { params: map }).then(response => {
        resolve(response.data)
      })
    })
  },

  getInfo (slug) {
    return new Promise((resolve, reject) => {
      Vue.axios.get(`/content/${slug}`).then(response => {
        resolve(response.data)
      })
    })
  },
}
