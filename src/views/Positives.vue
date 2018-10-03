<template>
  <container class="positives">
    <row :centerXs="true" :centerSm="true" :centerMd="true" :centerLg="true">
      <h1>Hi {{ username }}</h1>
      <button v-on:click="logout">Logout</button>
    </row>

    <PositiveListContainer :userId="userId"/>
  </container>
</template>

<script>
import PositiveListContainer from '@/components/PositiveListContainer.vue'
import { db, globalStore } from '../main'
import firebase from 'firebase'

export default {
  name: 'positives',
  components: {
    PositiveListContainer
  },
  computed: {
    userId: function () {
      return globalStore.user.id
    },
    username: function () {
      return globalStore.user.data().username
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
    margin: 25px 10px;
    background: #4275b9;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 22px;
    outline: 0;
    cursor: pointer;
  }
</style>
