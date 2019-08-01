<template>
<div class="card">
                <div class="center">
                    <router-link to="/main"><img class="logo" src="../assets/logo-white.svg"  alt="logo"></router-link>

                <div class="content">
                  <form @click.prevent="onPay">
                        <div class="header">
                        <router-link to="/main"><img src="../assets/left-arrow.svg"  alt="voltar" ></router-link>
                        <p>Efetuar Pagamento</p>
                        </div>
                    <div class="white-form">
                    <div class="text"> <p>Informe a <b>quantia</b> desejada</p> </div>
                    <div class="input-content"> <input v-model="value" type="number" min="0">

                    </div>
                    <div class="foot"><p>Digite um valor entre $KA 10,00 e $KA 15.000,00</p></div>

                    <div class="button">
                        <button type="submit">Pagar</button>
                    </div>
                    </div>
                  </form>
                </div>
            </div>
            </div>
</template>

<script>

import firebase from 'firebase'
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
  }

}
</script>

<style>
.card {
  font-family: Roboto, sans-serif;
  background-color: #333333;
  height: 100%;
  text-align: center;
}
.content {

  display: inline-block;
  background-color: #4076AD;
  color: white;
  border-radius: 10px;
  width: 380px;

}
.header {
  display: flex;
  align-content: center;

}
.header p {
  font-size: 13px;
  font-weight: bold;
  margin: auto ;
}
.header img {
  margin: 0;
  padding: 10px 0 0 10px;

}

.text {
  font-size: 20px;
}
.foot {
  padding: 20px 0 0 0;
  font-size: 10px;
}
.input-content > input {
  text-align: center;
  font-size: 30px;
  width: 155px;
  outline: none;

}

.white-form {
  background-color: white;
  color: #333333;
  border-radius: 5px;
  margin:0;

}
.text p{
  padding: 20px 0 0 0;
}

.button > button {
  background-color: #FA7268;
    border: 0;
    margin: 15px;
    border-radius: 4px;
    color: #FFF;
    font-weight: bold;
    font-size: 20px;
    width: 350px;
    height: 50px;
    cursor: pointer;
}

.logo {
  padding: 20px 0 120px 0;
  margin: auto;
  display: block;
}
.center {
  display: block;
  margin: 0 auto;
}
</style>
