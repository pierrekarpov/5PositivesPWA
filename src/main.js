import Vue from 'vue'
import router from './router'
import App from './App.vue'
import VueFlexboxgrid from 'vue-flexboxgrid'
import VueFire from 'vuefire'
import firebase from '@/firebase'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronCircleLeft, faChevronCircleRight, faTimesCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import MQ from 'vue-match-media/src'

import store from './store'
import { LOGOUT } from '@/store/modules/user/mutations'

Vue.use(require('vue-moment'))
Vue.use(VueFlexboxgrid)
Vue.use(MQ)
Vue.use(VueFire)

library.add(faChevronCircleLeft)
library.add(faChevronCircleRight)
library.add(faTimesCircle)
library.add(faPlusCircle)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  data: {
    message: 'Hello Vue!'
  },
  render: h => h(App),
  mq: {
    phone: '(max-width: 768px)',
    tablet: '(max-width: 1024px)',
    desktop: '(min-width: 1024px)'
  },
  created () {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        store.dispatch('user/login', user)
      } else {
        store.commit(`user/${LOGOUT}`)
      }
    })
  }
}).$mount('#app')
