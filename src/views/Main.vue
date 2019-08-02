<template>
 <div class="card">
        <div class="center">
            <img class="logo" :src="require('../assets/logo-white.svg')"  alt="logo" @click="signOut">

        <div class="currency">
            <p>Saldo Disponível</p>
            <h3>$KA {{accBalance}}</h3>
        </div>

        <div class="item-list">
            <div class="item">
                <img :src="require('../assets/pig.svg')"> <router-link to="/deposit"><p>Depositar</p></router-link>
            </div>
            <div class="item">
                    <img :src="require('../assets/pay.svg')"> <router-link to="/withdraw"><p>Pagar</p></router-link>
            </div>
            <div class="item">
                    <img :src="require('../assets/surface.svg')"> <router-link to="/transfer"><p>Transferir</p></router-link>
            </div>
        </div>

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
  },

  methods: {
    signOut () {
      firebase.auth().signOut().then(() => {
        alert('Desconectado')
        this.$router.push('/login')
      }).catch(error => {
        alert('\n\n' + error)
      })
    }
  }

}
</script>

<style scoped>

.card {
  text-align: center;
}

.currency {
  text-align: left;
  background-color: white;
  color: #333333;
  border-radius: 5px;
  display: inline-block;
  width: 330px;
  height: 104px;

}
.currency > h3 {
  font-size: 40px;
  font-weight: bold;
  margin: 0;
  padding: 0 0 0 12px;
}

.currency > p {
  margin: 0;
  font-size: 15px;
  color: gray;
  padding: 14px 0 0 12px;
}

.logo {
  padding: 10px 0 20px 0;
  margin: auto;
  display: block;
}
.center {
  display: block;
  margin: 0 auto;
}
.item-list {
  margin: 100px auto auto auto;

}

 .item {
  justify-content: space-between;
  font-size: 20px;
  background-color: #FA7268;
  border-radius: 5px;
  color: white;
  display: flex;
  margin: 10px auto ;
  width: 330px;
  padding: 0 10px 0 10px;

}
.item > a{
  color: white;
  text-decoration: none;

}
.item > a:visited{
  color: white;
  text-decoration: none;

}

</style>
