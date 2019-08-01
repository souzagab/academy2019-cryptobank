<template>
  <div class="login">
    <div class="content center">
      <img class="logo" :src="require('../assets/logo-white.svg')" alt="Logo"/>
      <form class="login-form" @submit.prevent="createAccount">
        <div class="input-control">
          <div><label for="email-input">E-mail:</label></div>
          <input v-model="email" type="email" id="email-input" required name="email" class="input" placeholder="Digite seu e-mail">
        </div>

        <div class="input-control">
          <div><label for="password-input">Senha:</label></div>
          <input v-model="password" type="password" id="password-input" required name="password" class="input" placeholder="Digite sua senha">
        </div>

        <div class="actions">
          <button type="submit" id="create-account-button" class="center">
            Criar conta
          </button>
        </div>
        <div class="actions">
          <p>Já possui conta? <router-link to="/login"> <b>Acessar</b></router-link></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data: () => ({
    email: '',
    password: ''
  }),

  methods: {
    createAccount () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          alert('Conta criada com sucesso !')
          this.$router.push({ path: '/login' })
        }).catch((error) => {
          alert('Erro ao criar conta \n\n' + error)
        })
    }
  }
}
</script>

<style scoped>
.login {
  overflow: auto;
    background: url("../assets/fundo@2x.png") no-repeat center center fixed;
    background-color: #333;
    background-size: cover;
    width: 100%;
    height: 100%;
    color: #ffffff;
    font-family: 'Roboto';
    text-align: center;

    }

  .center {
    display: block;
    margin: 0 auto;
  }

.login > .content {
    width: 320px;
    margin-top: 60px;
    margin-bottom: 60px;

}

  .login-form {
    margin-top: 78px;
  }

  .input-control {
    margin-bottom: 20px;
    text-align: left;
  }

  .input-control > label {
    display: block;
  }

  .input-control > .input {
    height: 48px;
    width: calc(100% - 50px);
    border-radius: 4px;
    border-width: 0;
    background: #FFF;

    font-size: 14px;

    padding: 0 25px;
  }

  .input-control > .input:focus {
    background: #F2F2F2;
  }

  .login-form > .actions > button[type="submit"] {
    background-color: #FA7268;
    border: 0;
    border-radius: 4px;
    color: #FFF;
    font-weight: bold;
    font-size: 15px;
    width: 130;
    height: 45px;
    cursor: pointer;
  }
 .actions a {
      text-decoration: none;
      color: white;
      font-weight: bolder;
    }

  .logo {
    margin: auto;
    display: block;
  }

  .login > .content > .login-form > .input-control > label {
    display: none;
  }

</style>
