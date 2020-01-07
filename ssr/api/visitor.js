import Vue from 'vue'

export default {
  getInfo (map) {
    return new Promise((resolve, reject) => {
      Vue.axios.get('/visitor', { params: map }).then(response => {
        resolve(response.data)
      })
    })
  },
}
