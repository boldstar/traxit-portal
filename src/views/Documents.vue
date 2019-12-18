<template>
    <div class="documents-wrapper">
        <DocList :allDocs="docs" v-if="docs  && $route.name != 'document'" />
        <router-view v-else></router-view>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import DocList from '@/components/DocList.vue'
export default {
    name: 'Documents',
    components: {DocList},
    computed: {
        ...mapGetters(['docs'])
    },
    created() {
        this.$store.dispatch('getDocs', JSON.parse(localStorage.getItem('client_id')))
    }
}
</script>

<style>

.documents-wrapper {
    width: 100%;
}

</style>