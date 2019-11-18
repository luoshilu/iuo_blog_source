import Vue from 'vue'

export default {
  getList (map) {
    return new Promise((resolve, reject) => {
      Vue.axios.get('/visitor', { params: map }).then(response => {
        resolve(response.data)
      })
    })
  },
}
