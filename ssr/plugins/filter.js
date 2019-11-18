import md5 from 'js-md5'
import Vue from 'vue'

const filters = {
  headImg (val, size = 60, type = 'wavatar') {
    return `https://secure.gravatar.com/avatar/${md5(val)}?s=${size}&r=G&d=${type}`
  },
}

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))
