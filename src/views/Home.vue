<template>
  <div class="home">
      <Uploader />
  </div>
</template>

<script>
import Uploader from '@/components/Uploader.vue'
import {mapGetters} from 'vuex'
export default {
  name: 'home',
  components: {
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

