<template>
  <div class="login">
      <Navbar />
      <img class="logo" v-if="account && account.logo" v-bind:src="logo"/>
      <i class="far fa-folder-open fa-5x" v-else></i>

      <form class="form">
        <input type="email" placeholder="Username" class="input" v-model="username">
        <input type="password" placeholder="Password" class="input" v-model="password">
        <button type="button" class="submit-btn" @click="login">Login</button>
      </form>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import {mapGetters} from 'vuex'
export default {
  name: 'login',
  components: {
    Navbar,
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters(['account']),
    logo() {
        return `data:image/png;base64, ${this.account.logo}`
      }
  },
  methods: {
    login() {
      this.$store.dispatch('retrieveToken', {
        username: this.username,
        password: this.password,
        provider: 'guests'
      })
    }
  }
}
</script>

<style>
.logo {
  margin-top: 100px;
  height: 100px;
  width: auto;
}

.fa-folder-open {
  margin-top: 100px!important;
  color: #0077ff!important;
}

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 0 5px 0 rgba(0,0,0,.2);
  padding: 10px;
}
</style>

