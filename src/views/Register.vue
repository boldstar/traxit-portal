<template>
  <div class="register">
    <validation-observer v-slot="{ handleSubmit }" class="form">
      <form style="width:100%;" @submit.prevent="handleSubmit(register)">
        <div class="form-header">
          <p>Welcome to the registration for our portal</p>
        </div>
         <validation-provider name="Email" rules="required|email" v-slot="{errors}" class="validation-container">
          <input :class="{'error-input': errors && errors.length > 0}" type="email" placeholder="Email" class="input" v-model="email">
          <span class="error-text">{{ errors[0] }}</span>
        </validation-provider>
        <validation-provider name="Password" rules="required|upper|lower|number|spec_char|min:10" v-slot="{errors}" class="validation-container">
          <input :class="{'error-input': errors && errors.length > 0}" type="password" placeholder="Password" class="input" v-model="password">
          <span class="error-text">{{ errors[0] }}</span>
        </validation-provider>
        <validation-provider name="Confirm Password" :rules="'required|confirm:'+`${password}`" v-slot="{errors}" class="validation-container">
          <input :class="{'error-input': errors && errors.length > 0}" type="password" placeholder="Confirm Password" class="input" v-model="confirm_password">
          <span class="error-text">{{ errors[0] }}</span>
        </validation-provider>
        <button type="submit" class="submit-btn" :disabled="processing">
          <span v-if="processing">Please wait...</span>
          <span v-else>Register</span>
        </button>
        <div class="form-footer">
          <div class="form-footer-body">
            <div class="form-footer-body-section">
              <span>Sharing Files Only?</span>
              <span><router-link to="/" class="form-link">Click Here</router-link></span>
            </div>
            <div class="form-footer-body-section">
              <span>Already Registered?</span>
              <span><router-link to="/login" class="form-link">Click Here</router-link></span>
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
import {toastError} from '../plugins/toasted'
import '../plugins/validation'
export default {
  name: 'register',
  data() {
    return {
      email: '',
      password: '',
      confirm_password: '',
      client_id: null,
      noData: false
    }
  },
  computed: {
    ...mapGetters(['account', 'processing']),
    logo() {
        return `data:image/png;base64, ${this.account.logo}`
      }
  },
  methods: {
    register() {
      this.$store.dispatch('registerGuest', {
        email: this.email,
        password: this.password,
        client_id: this.client_id
      }).then(response => {

      }).catch(err => {
        this.password = ''
      })
    }
  },
  created() {
    if(this.$route.query.client_id) {
      var client_id = JSON.parse(this.$route.query.client_id)
      if(client_id) {
        this.client_id = client_id
        localStorage.setItem('client_id', client_id)
      }
    } else {
      this.$router.push('/login')
      toastError('You must be invited to view the register form')
    }
  }
}
</script>

