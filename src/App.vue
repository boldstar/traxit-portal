<template>
  <div id="app">
    <div v-if="fileAccount">
      <router-view/>
    </div>
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
  created() {
    var name = window.location.href
    const index = name.indexOf('=')
    var fqdn = name.slice(index + 1)
    this.fileAccount = fqdn
    this.$router.replace({query: {fqdn: fqdn}}).catch(err => {})
    this.$store.dispatch('getAccount')
    localStorage.setItem('account_fqdn', fqdn)
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
  }

  .input {
    border: 3px solid rgb(201, 201, 201);
    border-radius: 5px;
    padding: 10px;
    margin: 10px 0;
    width: 100%;
    box-sizing: border-box;
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
</style>
