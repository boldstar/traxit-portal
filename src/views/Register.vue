<template>
  <div class="register">
    <validation-observer v-slot="{ handleSubmit }" class="form">
      <form style="width:100%;text-align:left;" @submit.prevent="handleSubmit(register)">
        <div class="form-header" style="text-align:center;margin-bottom: 10px;">
          <p>Welcome to the registration for our portal</p>
        </div>

         <label for="Email"><strong style="color:#0077ff;">Username:</strong> Not your email? Contact your invitor.</label>
         <validation-provider name="Email" rules="required|email" v-slot="{errors}" class="validation-container">
          <input :class="{'error-input': errors && errors.length > 0}" type="email" placeholder="Email" class="input" v-model="email" disabled>
          <span class="error-text">{{ errors[0] }}</span>
        </validation-provider>

        <label for="Password"><strong style="color:#0077ff;">Password:</strong> (Ex: Example5876$!)</label>
        <validation-provider name="Password" rules="required|upper|lower|number|spec_char|min:10" v-slot="{errors}" class="validation-container">
          <input :class="{'error-input': errors && errors.length > 0}" type="password" placeholder="Password" class="input" v-model="password">
          <span class="error-text">{{ errors[0] }}</span>
          <span v-if="errors && errors.length < 1 && password && password.length > 0"><i class="fas fa-check"></i></span>
        </validation-provider>
        <password v-model="password" :strength-meter-only="true" />

        <label for="Confirm Password"><strong style="color:#0077ff;">Confirm Password:</strong></label>
        <validation-provider name="Confirm Password" :rules="'required|confirm:'+`${password}`" v-slot="{errors}" class="validation-container">
          <input :class="{'error-input': errors && errors.length > 0}" type="password" placeholder="Confirm Password" class="input" v-model="confirm_password">
          <span class="error-text">{{ errors[0] }}</span>
          <span v-if="errors && errors.length < 1 && confirm_password && confirm_password.length > 0"><i class="fas fa-check"></i></span>
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
import Password from 'vue-password-strength-meter'
export default {
  name: 'register',
  components: {Password},
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
    if(this.$route.query.client_id && this.$route.query.client_email) {
      var client_id = JSON.parse(this.$route.query.client_id)
      var client_email = this.$route.query.client_email
      this.client_id = client_id
      this.email = client_email
      localStorage.setItem('client_id', client_id)
    } else {
      this.$router.push('/login')
      toastError('You must be invited to view the register form')
    }
  }
}
</script>

<style>
.Password__strength-meter {
  margin: 2px!important;
  width: 100%!important;
}
</style>


