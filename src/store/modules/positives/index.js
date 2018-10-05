import db from '@/db'
import { SET_ID } from '../user/mutations'

const state = {
  all: [],
  id: null
}

const getters = {

}

const mutations = {
  [SET_ID] (state, payload) {
    state.id = payload.id
  }
}

const actions = {
  getPositives ({ commit }) {
    db.collection('positives').document()
  },
  getId ({ commit, rootGetters }) {
    commit(SET_ID, {
      'id': rootGetters['user/userId']
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
