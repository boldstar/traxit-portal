<template>
    <div class="uploader" v-if="account">
        <div class="processing" v-if="processing"><Spinner class="spinner" /></div>
        <div class="triangle"></div>
        <div class="client-info">
            <ClientInfo :data="client" :alarm="errors" @input-change="clear" :key="upload_success"  />
        </div>
        <div class="file-manager">
            <FileManager @submit-files="sendFiles" />
        </div>
    </div>
</template>

<script>
import ClientInfo from '@/components/ClientInfo.vue'
import FileManager from '@/components/FileManager.vue'
import Spinner from '@/components/Spinner.vue'
import {mapGetters} from 'vuex'
export default {
    name: 'Uploader',
    components: {
        ClientInfo,
        FileManager,
        Spinner
    },
    data() {
        return {
            errors: [],
        }
    },
    computed: {
        ...mapGetters(['upload_success', 'processing', 'client', 'account'])
    },
    methods: {
        sendFiles(data) {
            const validated = this.validate(this.client)
            const files = data.files.map(file => file)
            if(validated) {
                this.$store.dispatch('submitFiles', {
                    files: files,
                    details: {
                        subject: data.subject,
                        message: data.message,
                        client: this.client
                    }
                })
            }
        },
        validate(client) {
            const keys = Object.keys(client)
            for(var i = 0; i < keys.length; i++) {
                if(!client[keys[i]]) {
                    this.errors.push(keys[i])
                }
            } if(this.errors.length > 0) {
                return false
            } else return true
        },
        clear(key) {
            if(!this.errors.includes(key)) return;
            const index = this.errors.findIndex(err => err == key)
            this.errors.splice(index, 1)
        }
    }
}
</script>

<style>
.uploader {
    position: relative;
    display: flex;
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
    margin-top: 20px;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.2);
    min-height: 500px;
    border-radius: 10px;
}

.triangle {
    position: absolute;
    top: -15px;
    left: 48%;
    border-bottom: 15px solid rgb(236, 236, 236);
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    height: 0;
    width: 0;
}

.client-info {
    width: 300px;
    background: lightgray;
    border-radius: 10px 0 0 10px;
    padding: 20px;
}

.file-manager {
    width: 500px;
    background: rgb(247, 247, 247);
    border-radius: 0 10px 10px 0;
    padding: 20px;
}

.processing {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.200);
    border-radius: 10px;
    z-index: 100;
    transition: all .5s;
}

.spinner {
    position: absolute;
    top: 40%;
}
</style>
