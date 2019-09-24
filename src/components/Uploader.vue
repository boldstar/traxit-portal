<template>
    <div class="uploader">
        <div class="client-info">
            <ClientInfo />
        </div>
        <div class="file-manager">
            <FileManager />
        </div>
    </div>
</template>

<script>
import ClientInfo from '@/components/ClientInfo.vue'
import FileManager from '@/components/FileManager.vue'
export default {
    name: 'Uploader',
    components: {
        ClientInfo,
        FileManager
    }
}
</script>

<style>
.uploader {
    position: relative;
    display: flex;
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
    margin-top: 150px;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.2);
}

.client-info {
    width: 300px;
    background: lightgray;
}

.file-manager {
    width: 700px;
}

</style>
