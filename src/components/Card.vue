<template>
     <div class="card">
        <div class="center">
            <router-link to="/main"><img class="logo" :src="require('../assets/logo-white.svg')"  alt="logo"></router-link>

        <div class="content">
                <div class="header">
                <img :src="require('../assets/left-arrow.svg')"  alt="voltar" >
                <p>{{title}}</p>
                </div>
            <div class="white-form">
            <div class="text"> <p>Informe a <b>quantia</b> desejada</p> </div>
            <div class="input-content"> <input v-model="value" type="number" min="0" placeholder="$KA 00,00">

            </div>
            <div class="foot"><p>Digite um valor entre $KA 10,00 e $KA 15.000,00</p></div>

            <div class="button">
                <button type="submit">{{title}}</button>
            </div>
            </div>

        </div>
    </div>

    </div>
</template>

<script>

export default {
  name: 'card',
  props: ['title', 'value', 'function']

}
</script>

<style scoped>
.card {
  font-family: Roboto, sans-serif;
  background-color: #333333;
  height: 100%;
  text-align: center;
}
.content {
  background-color: #4076AD;
  color: white;
  margin: 200px 30% 200px ;
  border-radius: 10px;
  height: 50%;

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
  margin: 0px 0 0 0;
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
  padding-top: 20px;
  margin: auto;
  display: block;
}
.center {
  display: block;
  margin: 0 auto;
}
</style>
