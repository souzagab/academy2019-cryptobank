import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import firebase from 'firebase'

let app = ''

const config = {
  apiKey: 'AIzaSyBFxKuAKQ-D2g0OwoAiq0RXDvnftUj2kCU',
  authDomain: 'academy-sarakin.firebaseapp.com',
  databaseURL: 'https://academy-sarakin.firebaseio.com',
  projectId: 'academy-sarakin',
  storageBucket: 'academy-sarakin.appspot.com',
  messagingSenderId: '212022283845',
  appId: '1:212022283845:web:7385dfa20f93da83'
}

Vue.config.productionTip = false
firebase.initializeApp(config)

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})
