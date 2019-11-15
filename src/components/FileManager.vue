<template>
    <div class="file-manager-wrapper" v-if="account"> 
        <div class="input-wrapper">
            <span class="account-label">{{account.business_name}}</span>
            <input type="text" class="input" disabled>
        </div>
        <div class="input-wrapper">
            <input type="text" class="input" placeholder="Subject" v-model="subject" :key="`${filesSubmitted}` + 2" :class="{'input-error':noSubject}" @change="noSubject = false">
        </div>
        <vue-editor :key="`${filesSubmitted}` + 1" id="vueText" v-model="message" :editorToolbar="customToolbar" class="vue-editor" :placeholder="placeholder" :class="{'input-error':noMessage}"></vue-editor>
        <div class="vue-drop-wrapper" :class="{'no-files' : this.files.length < 1 && noFiles}">
            <vue-dropzone 
                ref="myVueDropzone" 
                id="dropzone" 
                :options="dropzoneOptions" 
                :useCustomSlot="true"
                v-on:vdropzone-file-added="addFile($event)"
                v-on:vdropzone-removed-file="removeFile($event)"
                :key="filesSubmitted"
            >
                <img src="../assets/upload_icon.png" alt="upload_icon" class="upload_icon_img">
            </vue-dropzone>
        </div>
        <div class="button-div">
            <button class="submit-btn" @click="submitFiles">
                <span v-if="!processing">Send Files<i class="fas fa-paper-plane"></i></span>
                <span v-else>Sending...</span>
            </button>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'FileManager',
    data() {
        return {
            dropzoneOptions: {
                url: 'https://httpbin.org/post',
                maxFilesize: 0.5,
                addRemoveLinks: true,
                dictRemoveFile: 'X',
                dictCancelUpload: 'Cancel'
            },
            files: [],
            fileComponent: true,
            subject: '',
            message: '',
            noFiles: false,
            noMessage: false,
            noSubject: false,
            customToolbar: [
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }]
            ],
            placeholder: 'Type message here'
        }
    },
    computed: {
      ...mapGetters(['account', 'filesSubmitted', 'processing'])
    },
    methods: {
        addFile(event) {
            this.files.push(event)
        },
        removeFile(event) {
            const index = this.files.findIndex(file => file.upload.uuid == event.upload.uuid)
            this.files.splice(index, 1)
        },
        submitFiles() {
            if(this.files.length < 1) {
                this.noFiles = true
                return
            }if(!this.subject) {
                this.noSubject = true
            }if(!this.message) {
                this.noMessage = true
            }
            this.$emit('submit-files', {files: this.files, subject: this.subject, message: this.message})
        },
        clearValues() {
            this.subject = ''
            this.message = ''
        }
    },
    watch: {
        'filesSubmitted': function() {
            this.clearValues()
        },
        'message': function() {
            this.noMessage = false
        }
    }
}
</script>

<style lang="scss">

textarea,
input[type=text] {
    font-family:Arial;
}

.input-wrapper {
    box-sizing: border-box;
    position: relative;
}

.input-error {
    border-color: red!important;
}

.file-manager-wrapper {
    box-sizing: border-box;
}

.account-label {
    position: absolute;
    top: 17px;
    left: 8px;
    background: rgb(233, 233, 233);
    font-weight: bold;
    padding: 3px 20px;
    border-radius: 3px;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.4);
}


.button-div {
    margin-top: 20px;
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

.vue-drop-wrapper {
    border: 4px dashed rgb(145, 145, 145);
    padding: 6px;
}

.fa-paper-plane {
    margin-left: 10px;
}

.upload_icon_img {
    height: 100px;
    width: auto;
}

.vue-dropzone {
    padding: 10px!important;
    margin: 0!important;
    box-sizing: border-box!important;
    display: flex!important;
    flex-direction: column!important;
}

.dz-preview {
    width: 100%;
    max-height: 40px!important;
    min-height: 40px!important;
    padding: 0!important;
    margin: 0!important;
    display: flex;
    background: white!important;
    color: white!important;
    // box-shadow: 0 0 5px 0 rgba(0,0,0,.9);
    border: 2px solid lightgray;
    border-bottom: none;
}

.dz-preview:last-of-type {
    border-bottom: 2px solid lightgray;
}

.dz-image {
    display: none!important;
}
.vue-dropzone>.dz-preview .dz-details {
    background-color: transparent!important;
}

.dz-details {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-start!important;
    color: white!important;
    max-height: 40px!important;
    min-height: 40px!important;
    opacity: 1!important;
    line-height: 0!important;
    padding-top: 19px!important;
}

.dz-filename {
    span {
        color: #9b9b9b!important;
        opacity: 1!important;
        font-weight: bold;
    }
}

.dz-size {
    span {
        color: #0077ff!important;
        opacity: 1!important;
    }
}

.dropzone .dz-preview .dz-details .dz-filename {
    margin-bottom: 1em!important;
    font-size: 16px!important;
    line-height: 0!important;
}

.vue-dropzone>.dz-preview .dz-details .dz-filename {
    overflow: visible!important;
}

.dropzone .dz-preview .dz-details .dz-size {
    margin-bottom: 1em!important;
    font-size: 16px!important;
    line-height: 0!important;
}

.dz-success-mark {
    svg {
       height: 20px!important;
       width: auto!important;
       color: green; 
    }
}

.dz-error-mark {
    svg {
        height: 20px!important;
        width: auto!important;
    }
}

.vue-dropzone>.dz-preview .dz-remove {
    color: red!important;
    opacity: 1!important;
    align-self: center!important;
    top: 8px!important;
    bottom: 10px!important;
    padding: 0 5px!important;
    padding-top: 3px!important;
    border: none!important;
}

.vue-dropzone>.dz-preview .dz-progress .dz-upload {
    background: #0077ff!important;
}

.no-files {
    border-color: red;
}

.vue-editor {
    margin-bottom: 10px;
    border: 3px solid rgb(201, 201, 201);
    border-radius: 5px;
    min-height: 150px;
}

#vueText .ql-editor { min-height:150px }
</style>
