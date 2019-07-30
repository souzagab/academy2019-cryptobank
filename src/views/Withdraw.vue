<template>
    <div>
        <router-link to="/main">Voltar</router-link>
        <h1> Tran </h1>
            <h2>$ka: {{accBalance}}</h2>

         <form @click.prevent="onPay">
             <div>
                 <label for="payment">Quantia a ser pago:</label>
                 <input v-model="value" type="number" name="amount" id="input-pay" placeholder="$ka: 0,0" required>
             </div>
             <div><button type="submit">Pagar</button></div>
         </form>

        </div>
</template>

<script>

import firebase from 'firebase'
// import { parse } from 'path'
export default {
  data: () => ({
    accBalance: 0,
    value: 0,
    users: []
  }),

  mounted () {
    const userUid = firebase.auth().currentUser.uid

    firebase.firestore().collection('users')
      .where('uid', '==', userUid)
      .get().then((snapshot) => {
        snapshot.docs.map(doc => {
          this.accBalance = doc.data().accBalance
        })
      }).catch(error => {
        throw new Error(error)
      })
  },
  methods: {
    onPay () {
      const userUid = firebase.auth().currentUser.uid
      if (this.value > 10 && this.value <= 15000) {
        if (this.accBalance - this.value >= 0) {
          firebase.firestore().collection('users').doc(userUid).update({

            accBalance: parseFloat(this.accBalance) - parseFloat(this.value) // <= melhorar isso aqui né

          })
        } else { alert('Saldo Insuficiente') }
      }
    }

  },
  computed: {

  }
}
</script>
