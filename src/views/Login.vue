<template>
  <div class="login">
    <validation-observer v-slot="{ handleSubmit }" class="form">
      <form style="width:100%;" @submit.prevent="handleSubmit(login)">
        <div class="form-header">
          <p>Welcome to the portal login</p>
        </div>
        <validation-provider name="Username" rules="required" v-slot="{errors}" class="validation-container">
          <input :class="{'error-input': errors && errors.length > 0}" type="text" placeholder="Username" class="input" v-model="username">
          <span class="error-text">{{ errors[0] }}</span>
        </validation-provider>
        <validation-provider name="Password" rules="required" v-slot="{errors}" class="validation-container">
          <input :class="{'error-input': errors && errors.length > 0}" type="password" placeholder="Password" class="input" v-model="password">
          <span class="error-text">{{ errors[0] }}</span>
        </validation-provider>
        <button type="submit" class="submit-btn" :disabled="processing">
           <span v-if="processing">Please wait...</span>
           <span v-else>Login</span>
        </button>
         <div class="form-footer">
          <div class="form-footer-body">
            <div class="form-footer-body-section">
              <span>Sharing Files Only?</span>
              <span><router-link to="/" class="form-link">Click Here</router-link></span>
            </div>
            <div class="form-footer-body-section">
              <span>Not Registered?</span>
              <span><button class="form-link-btn" @click="showMessage" type="button">Click Here</button></span>
            </div>
            <div class="form-footer-body-section">
              <span>Forgot Password?</span>
              <span><router-link to="/reset" class="form-link">Click Here</router-link></span>
            </div>
          </div>
        </div>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import '../plugins/validation'
import {toastError} from '../plugins/toasted'
export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters(['account', 'processing']),
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
      }).then(response => {

      }).catch(err => {
        this.username = ''
        this.password = ''
      })
    },
    showMessage() {
      toastError('You must be invited to register. Please contact your service provider.')
    }
  }
}
</script>

<style lang="scss">

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}


.form-link-btn {
  background: none;
  color: #0077ff;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
  padding: none;
  font-family: "Open Sans", sans-serif!important;
}

</style>

