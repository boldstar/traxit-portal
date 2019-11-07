<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.$router.replace({query: {fqdn: 'aewcpa'}})
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
</style>
