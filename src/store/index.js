import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import positives from '@/store/modules/positives'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    awesome: true
  },
  modules: {
    user,
    positives
  },
  strict: debug
})
