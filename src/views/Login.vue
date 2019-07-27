<template>
  <div class="login">
    <div class="content center">

      <form class="login-form" @submit.prevent="submitLogin">
        <div class="input-control">
          <label for="email-input">E-mail</label>
          <input v-model="email" type="email" id="email-input" required name="email" class="input" placeholder="Digite seu e-mail">
        </div>

        <div class="input-control">
          <label for="password-input">Senha</label>
          <input v-model="password" type="password" id="password-input" required name="password" class="input" placeholder="Digite sua senha">
        </div>

        <div class="actions">
          <button type="submit" id="login-button" class="center">
            Acessar
          </button>
        </div>

        <br/>

        <div class="actions">
          <p>Novo Usuário <router-link to="/register" > Crie uma conta.</router-link></p>
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
    submitLogin () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push({ path: '/main' })
        }).catch(() => {
          alert('Error')
        })
    },

    newAccount () {
      this.$router.push({ path: '/register' })
    }
  }
}
</script>
