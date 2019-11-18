import vue from 'vue'
export default {
  getList (map) {
    if (!map) return
    return new Promise((resolve, reject) => {
      vue.axios.get('/muster', { params: map}).then(res => {
        resolve(res.data)
      })
    })
  },
}
