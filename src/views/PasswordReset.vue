<template>
  <div class="register">
    <validation-observer v-slot="{ handleSubmit }" class="form">
      <form style="width:100%;" @submit.prevent="handleSubmit(register)">
        <div class="form-header">
          <p>For your safety please provide your email. We will send you a password reset link.</p>
        </div>
         <validation-provider name="Email" rules="required|email" v-slot="{errors}" class="validation-container">
          <input :class="{'error-input': errors && errors.length > 0}" type="email" placeholder="Email" class="input" v-model="email">
          <span class="error-text">{{ errors[0] }}</span>
        </validation-provider>
        <button type="submit" class="submit-btn" :disabled="processing">
          <span v-if="processing">Please wait...</span>
          <span v-else>Request Link</span>
        </button>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {toastError} from '../plugins/toasted'
import '../plugins/validation'
export default {
  name: 'password-reset',
  data() {
    return {
      email: '',
    }
  },
  computed: {
    ...mapGetters(['account', 'processing']),
    logo() {
        return `data:image/png;base64, ${this.account.logo}`
      }
  },
  methods: {

  },
  created() {

  }
}
</script>
