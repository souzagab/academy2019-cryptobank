<template>
    <div>
        <router-link to="/main">Voltar</router-link>
        <h1> Transfer </h1>
            <h2>$ka: {{accBalance}}</h2>

         <form id="accounts">
             <div>
                 <label for="payment">Quantia a ser transfer:</label>
                 <input  v-model="value" type="number" name="amount" id="input-pay" placeholder="$ka: 0,0" required>
             </div>

            <div>
                <select name="accounts" form="accounts" :value="selected" v-model="selected">
                    <option  v-for="user in users"  :value="user.uid" >{{user.email}}> </option>
                </select>
                <div>
                    <button type="submit" @click="onTransfer">Transferir</button>
                </div>
                </div>
            </form>
        </div>
        </div>
</template>

<script>

import firebase from 'firebase'
// import { parse } from 'path';
export default {
  data: () => ({
    userUid: [], // UID user logado
    accBalance: 0, // balanço user principal
    selectedAccBalance: 0, // <- saldo usuario selecionado
    value: 0, // <- valor transferencia
    users: [], // <- Array dos usuarios
    selected: [] // <- recebe a UID do user selecionado

  }),

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

    firebase.firestore().collection('users')
      .get().then((snapshot) => {
        snapshot.docs.map(doc => {
          this.users.push(doc.data())
        })
      })

    firebase.firestore().collection('users')
      .where('uid', '==', this.selected)
      .get().then((snapshot) => {
        snapshot.docs.map(doc => {
          this.selectedAccBalance = doc.data().accBalance
        })
      }).catch(error => {
        throw new Error(error)
      })
  },
  methods: {
    onTransfer () {
    //   const userUid = firebase.auth().currentUser.uid
      if (this.value > 10 && this.value <= 15000) {
        if (this.accBalance - this.value >= 0) {
          firebase.firestore().collection('users').doc(this.userUid).update({
            accBalance: parseFloat(this.accBalance) - parseFloat(this.value)
          })
        } else { alert('Saldo Insuficiente') }
      } else { alert('Valor fora dos padrões espeficicados') }
      firebase.firestore().collection('users').doc(this.selected).update({
        accBalance: parseFloat(this.selectedAccBalance) + parseFloat(this.value)

      })
    }

  },
  computed: {

  }
}
</script>
