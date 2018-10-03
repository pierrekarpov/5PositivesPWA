<template>
  <div class="login">
   <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import firebase from 'firebase'
import firebaseui from 'firebaseui'
import { db, globalStore } from '../main'

export default {
  name: 'login',
  mounted () {
    var uiConfig = {
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          if (authResult.user) {
            db.collection('users').where('auth_id', '==', authResult.user.uid)
              .get()
              .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                  globalStore.user = querySnapshot.docs[0]
                  this.$router.replace('positives')
                }
              })
              .catch((error) => {
                console.log('Error getting documents: ', error)
              })
          }
        }
      }
    }
    let ui = firebaseui.auth.AuthUI.getInstance()
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth())
    }
    ui.start('#firebaseui-auth-container', uiConfig)
  }
}
</script>

<style scoped>
  .login {
    margin-top: 40px;
  }
  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }
  button {
    margin-top: 20px;
    width: 10%;
    cursor: pointer;
  }
  p {
    margin-top: 40px;
    font-size: 13px;
  }
  p a {
    text-decoration: underline;
    cursor: pointer;
  }
</style>
