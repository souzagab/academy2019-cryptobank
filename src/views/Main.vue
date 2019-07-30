<template>
    <div><h1> MAIN PAGE </h1>
    <button @click="signOut"> LOG OUT </button>

    <h2>$ka : {{accBalance}}</h2>

    <div>
        <ul>
            <li><router-link to="/withdraw">Pagar</router-link></li>
            <li><router-link to="/transfer">Transferir</router-link></li>
            <li><router-link to="/deposit">Depositar</router-link></li>

        </ul>
    </div>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
  data () {
    return {
      accBalance: 0,
      userUid: []
    }
  },

  mounted () {
    this.userUid = firebase.auth().currentUser.uid

    firebase.firestore().collection('users')
      .where('uid', '==', this.userUid)
      .get().then((snapshot) => {
        snapshot.docs.map(doc => {
          this.accBalance = doc.data().accBalance
        })
      }).catch(error => {
        throw new Error(error)
      })

    //   firebase.firestore().collection('users').where('uid', '==', this.userUid).onSnapshot(snapshot => {
    //       snapshot.docChanges().forEach(change => {
    //           if(change.type === 'modified') {
    //               this.accBalance = doc.data().accBalance
    //           }
    //       })
    //   })
  },

  methods: {
    signOut () {
      firebase.auth().signOut().then(() => {
        alert('Desconectado com sucesso!')
        this.$router.push('/login')
      }).catch(error => {
        alert('Erro ao desconectar. \n\n' + error)
      })
    }
  },
  computed: {

  }
}
</script>
