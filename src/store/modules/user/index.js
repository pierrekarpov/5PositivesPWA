import db from '@/db'
import { LOGOUT, SET_ID, SET_AUTH_ID, SET_NAME } from './mutations'

const state = {
  profile: {
    id: null,
    authId: null,
    name: null
  },
  loggedIn: false
}

const getters = {
  userId: state => {
    return state.profile.id
  },
  userAuthId: state => {
    return state.profile.authId
  },
  userName: state => {
    return state.profile.name
  }
}

const mutations = {
  [SET_ID] (state, payload) {
    state.profile = {
      ...state.profile,
      id: payload.id
    }
  },

  [SET_AUTH_ID] (state, payload) {
    state.profile = {
      ...state.profile,
      authId: payload.authId
    }
  },

  [SET_NAME] (state, payload) {
    state.profile = {
      ...state.profile,
      name: payload.name
    }
  },

  [LOGOUT] (state) {
    state.loggedIn = false
    state.profile = {}
  }
}

const actions = {
  login ({ commit }, user) {
    commit(SET_AUTH_ID, {
      'authId': user.uid
    })
    db.collection('users').where('auth_id', '==', user.uid)
      .get()
      .then(function (querySnapshot) {
        let id = null
        let name = null
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, ' => ', doc.data())
          if (doc.data().auth_id != null) {
            id = doc.id
            name = doc.data().username
          }
        })
        commit(SET_ID, {
          'id': id
        })
        commit(SET_NAME, {
          'name': name
        })
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error)
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
