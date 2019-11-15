<template>
  <div class="home">
      <Navbar />
      <img class="logo" v-if="account && account.logo" v-bind:src="logo"/>
      <i class="far fa-folder-open fa-5x" v-else></i>
      <Uploader />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Uploader from '@/components/Uploader.vue'
import {mapGetters} from 'vuex'
export default {
  name: 'home',
  components: {
    Navbar,
    Uploader
  },
  computed: {
    ...mapGetters(['account']),
    logo() {
        return `data:image/png;base64, ${this.account.logo}`
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
</style>

