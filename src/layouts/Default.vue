<template>
    <div class="default">
        <Navbar />
        <div v-if="$route.name != 'document'">
            <img class="logo" v-if="account && account.logo" v-bind:src="logo"/>
            <i class="far fa-folder-open fa-5x" v-else></i>
        </div>
        <slot/>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import {mapGetters} from 'vuex'
export default {
    name: 'Default',
    components: {Navbar},
    computed: {
        ...mapGetters(['account']),
        logo() {
            return `data:image/png;base64, ${this.account.logo}`
        },
        loggedIn() {
            return this.$store.getters.loggedIn
        },
    }
}
</script>

<style>
.default {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

</style>
