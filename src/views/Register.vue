<template>
  <div class="register">
      <form class="form">
        <p>Welcome to registration for our portal</p>
        <input type="email" placeholder="Email" class="input" v-model="email" :class="{'input-error': noData && email.length <= 0}">
        <input type="password" placeholder="Password" class="input" v-model="password" :class="{'input-error': noData && password.length <= 9}">
        <button type="button" class="submit-btn" @click="register">Register</button>
      </form>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'register',
  data() {
    return {
      email: '',
      password: '',
      client_id: null,
      noData: false
    }
  },
  computed: {
    ...mapGetters(['account']),
    logo() {
        return `data:image/png;base64, ${this.account.logo}`
      }
  },
  methods: {
    register() {
      if(!this.email || !this.password){
        this.noData = true
        return
      }

      this.$store.dispatch('registerGuest', {
        email: this.email,
        password: this.password,
        client_id: this.client_id
      })
    }
  },
  created() {
    var client_id = JSON.parse(this.$route.query.client_id)
    if(client_id) {
      this.client_id = client_id
      localStorage.setItem('client_id', client_id)
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

.register {
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

.input-error {
  border: 1px solid red;
}
</style>

