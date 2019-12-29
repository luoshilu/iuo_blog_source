
import { setData } from 'nuxt-storage/local-storage'

export const state = () => ({
  visitor: {
    author: '',
    email: '',
    url: '',
  },
  site: {
    title: '',
    url: '',
    keywords: '',
    description: '',
    footer: '',
    logo: '',
    cdn: '',
  },
})

export const mutations = {
  INIT_VISITOR (state, val) {
    state.visitor = val
  },
  INIT_SITE (state, val) {
    state.site = val
  },
  UPDATE_AUTHOR (state, val) {
    state.visitor.author = val
    setData('visitor', state.visitor)
  },
  UPDATE_EMAIL (state, val) {
    state.visitor.email = val
    setData('visitor', state.visitor)
  },
  UPDATE_URL (state, val) {
    state.visitor.url = val
    setData('visitor', state.visitor)
  },
}
