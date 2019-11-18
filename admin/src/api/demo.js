import Vue from 'vue'
export default {

  create (data) {
    data.type = 'demo'
    return new Promise((resolve, reject) => {
      Vue.axios.post('/demo', data).then(response => {
        resolve(response.data)
      })
    })
  },

  getList (map = {}) {
    map.type = map.type || 'demo'
    return new Promise((resolve, reject) => {
      Vue.axios.get('/demo', { params: map }).then(response => {
        resolve(response.data)
      })
    })
  },

  getInfo (id, map = {}) {
    map.type = 'demo'
    return new Promise((resolve, reject) => {
      Vue.axios.get('/demo/' + id, { params: map }).then(response => {
        resolve(response.data)
      })
    })
  },

  update (id, data) {
    data.type = 'demo'
    return new Promise((resolve, reject) => {
      Vue.axios.put('/demo/' + id, data).then(response => {
        resolve(response.data)
      })
    })
  },

  delete (id) {
    return new Promise((resolve, reject) => {
      Vue.axios.delete('/demo/' + id).then(response => {
        resolve(response.data)
      })
    })
  }
}
