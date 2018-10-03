import Vue from 'vue'
import router from './router'
import App from './App.vue'
import VueFlexboxgrid from 'vue-flexboxgrid'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronCircleLeft, faChevronCircleRight, faTimesCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import MQ from 'vue-match-media/src'

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

let app
let config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSENGER_SENDER_ID
}

firebase.initializeApp(config)

const firestore = firebase.firestore()
const settings = { timestampsInSnapshots: true }
firestore.settings(settings)
export const db = firebase.firestore()

firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    app = new Vue({
      router,
      data: {
        message: 'Hello Vue!'
      },
      render: h => h(App),
      mq: {
        phone: '(max-width: 768px)',
        tablet: '(max-width: 1024px)',
        desktop: '(min-width: 1024px)'
      }
    })
    app.$mount('#app')
  }
})

export const globalStore = new Vue({
  data: {
    user: {}
  }
})

new Vue({
  router,
  data: {
    message: 'Hello Vue!'
  },
  render: h => h(App),
  mq: {
    phone: '(max-width: 768px)',
    tablet: '(max-width: 1024px)',
    desktop: '(min-width: 1024px)'
  }
}).$mount('#app')
