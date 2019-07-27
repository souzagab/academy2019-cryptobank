<template>
  <div class="createaccount">
    <div class="content center">
      <form class="createaccount-form" @submit.prevent="createAccount">
        <div class="input-control">
          <label for="email-input">E-mail</label>
          <input v-model="email" type="email" id="email-input" required name="email" class="input" placeholder="Digite seu e-mail">
        </div>

        <div class="input-control">
          <label for="password-input">Senha</label>
          <input v-model="password" type="password" id="password-input" required name="password" class="input" placeholder="Digite sua senha">
        </div>

        <div class="actions">
          <button type="submit" id="create-account-button" class="center">
            Criar conta
          </button>
        </div>

        <br/>

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
