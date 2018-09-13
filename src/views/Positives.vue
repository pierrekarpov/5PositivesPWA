<template>
  <container class="positives">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <row :centerXs="true" :centerSm="true" :centerMd="true" :centerLg="true">
      <h1>Hi {{ user.username }}</h1>
      <button v-on:click="logout">Logout</button>
    </row>
    <PositiveListContainer :userId="userId"/>
  </container>
</template>

<script>
// @ is an alias to /src
import PositiveListContainer from '@/components/PositiveListContainer.vue'
import { db } from '../main'
import firebase from 'firebase'

const userId = 'fqR8JPFx7q90o1dcsxUw'
export default {
  name: 'positives',
  components: {
    PositiveListContainer
  },
  data () {
    return {
      user: {},
      userId: userId,
      centerRow: {
        centerXs: true,
        centerSm: true,
        centerMd: true,
        centerLg: true
      }
    }
  },
  firestore () {
    return {
      user: db.collection('users').doc(userId)
    }
  },
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>

<style scoped>
  button {
    padding: 10px 20px;
    background: #42b983;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 22px;
    outline: 0;
    cursor: pointer;
  }
</style>
