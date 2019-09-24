<template>
  <div class="home">
      <Navbar />
      <Uploader />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Uploader from '@/components/Uploader.vue'
export default {
  name: 'home',
  components: {
    Navbar,
    Uploader
  }
}
</script>
