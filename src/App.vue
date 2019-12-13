<template>
  <div id="app">
    <component :is="layout" v-if="fileAccount"> 
      <router-view/>
    </component>
    <div class="no-account" v-else>
      <Spinner class="spinner-loader"/>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Spinner from '@/components/Spinner.vue'
export default {
  name: 'App',
  data() {
    return {
      fileAccount: null
    }
  },
  components: {Spinner},
  computed: {
    layout() {
        return 'default-layout';
    },
  },
  created() {
    if(!localStorage.getItem('account_fqdn')) {
      var name = window.location.href
      const index = name.indexOf('=')
      var fqdn = name.slice(index + 1)
      this.fileAccount = fqdn
      this.$router.replace({query: {fqdn: fqdn}}).catch(err => {})
      localStorage.setItem('account_fqdn', fqdn)
    } else {
      this.fileAccount = localStorage.getItem('account_fqdn')
    }
    this.$store.dispatch('getAccount')
  }
}
</script>


<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');

  #app {
    font-family: 'Open Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }

  body {
    min-height: 100vh;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  .input {
    border: 3px solid rgb(201, 201, 201);
    border-radius: 5px;
    padding: 10px;
    margin: 10px 0;
    width: 100%;
    box-sizing: border-box;
  }

  .router-link-exact-active {
    color: #0077ff!important;
  }

  .toast-message {
    font-family: 'Open Sans', sans-serif!important;
  }

  a.action.ripple {
    color: black!important;
    font-weight: bold!important;
    font-size: 1.2rem!important;
  }

  .no-account {
    display: flex;
    min-height: 100vh;
    justify-content: center;
    align-content: center;
    height: 100%;
  }

  .spinner-loader {
    position: absolute;
    top: 45%;
  }

  .submit-btn {
    background: #0077ff;
    font-weight: bold;
    color: white;
    display: block;
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 1.25rem;
    cursor: pointer;
}

.validation-container {
  position: relative;

  .error-text {
    position: absolute;
    right: 10px;
    top: 0;
    color: red;
  }

  .error-input {
    border: 3px solid red;
  }
}

.form-header {
  background: rgb(233, 233, 233);
  margin: 0;
  padding: 20px;
  border-radius: 5px 5px 0 0;
   p {
     margin: 0;
   }
}

.form-footer {
  margin-top: 10px;
  padding: 5px 20px;
  border-radius: 0 0 5px 5px;
   .form-footer-body {
     margin: 0;
     width: 100%;

     .form-footer-body-section {
      width: 100%;
       display: flex;
       justify-content: space-between;
       margin-bottom: 8px;
       border-bottom: 1px solid rgb(233, 233, 233);
     }
   }
}

.form-link {
  text-decoration: none;
  color: #0077ff;
}

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
</style>
