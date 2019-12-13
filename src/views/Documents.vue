<template>
    <div class="documents">
        <div class="docs-left">
            <img class="side-logo" v-if="account && account.logo" v-bind:src="logo"/>
            <ul v-if="docs">
                <li v-for="(doc, index) in docs" :class="{'selected-doc': doc.id === current}" :key="index" @click="selectDoc(doc.id)">{{doc.document_name}}</li>
            </ul>
        </div>
            <PDFDoc
                :loaded="current_doc"
                :data="url"
                v-if="url"
                :key="change"
                :file="doc"
             />
        <div class="docs-right">
            <h3 v-if="doc">{{doc.document_name}}</h3>
            <div class="doc-details">
                <span v-if="doc">Shared By: {{doc.uploaded_by}}</span>
                <span v-if="doc">Date Shared: {{doc.created_at | formatDate }}</span>
            </div>
            <button class="download-btn" type="button">Download<i class="fas fa-file-download"></i></button>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import PDFDoc from '@/components/PDFDoc.vue'
import range from 'lodash/range'
export default {
    name: 'Documents',
   components: {
       PDFDoc
  },
  data() {
    return {
        current: null,
        change: false
    };
  },
    computed: {
        ...mapGetters(['docs', 'account', 'current_doc']),
        logo() {
            return `data:image/png;base64, ${this.account.logo}`
        },
        url() {
            var blob = URL.createObjectURL(new Blob([this.current_doc]))
            return blob
        },
        doc() {
            return this.docs.filter(doc =>  doc.id === this.current)[0]
        }
    },
    methods: {
        selectDoc(id) {
            this.$store.dispatch('getDoc', id)
            this.current = id
            this.change = !this.change
        }
  },
    watch: {
        docs(value) {
            if(value.length > 0) {
                this.$store.dispatch('getDoc', value[0].id)
                this.current = value[0].id
            }
        }
    },
    created() {
        this.$store.dispatch('getDocs', JSON.parse(localStorage.getItem('client_id')))
    }
}
</script>

<style lang="scss">
.side-logo {
    margin-top: 10px;
    max-width: 150px;
    width: auto;
}

.documents {
    display: flex;
    width: 100%;
    height: calc(100vh);
}

.docs-left {
    height: calc(100% - 75px);
    width: 300px;
    background: white;
    margin-top: 75px;
    z-index: 10;

    ul {
        list-style: none;
        margin: 0;
        padding: 0;

        li {
            background: white;
            border-top: 1px solid lightgray;
            padding: 15px 10px;
            font-size: .8rem;
            text-align: left;
            cursor: pointer;

            &:hover {
                background: lightgray;
            }

            &:last-of-type {
                border-bottom: 1px solid lightgray;
            }
        }

        
        .selected-doc {
            color: #0077ff;
        }
    }
}



.docs-right {
    height: calc(100% - 75px);
    width: 300px;
    background: rgb(216, 216, 216);
    margin-top: 75px;
    z-index: 10;
    position: relative;
    padding: 10px;
    box-sizing: border-box;

    h3 {
        border-bottom: 2px solid #0077ff;
        padding-bottom: 10px;
        margin-bottom: 3px;
    }

    .doc-details {
        text-align: left;
        display: flex;
        flex-direction: column;

        span {
            font-size: .9rem;
        }
    }

    .download-btn {
        background: #0077ff;
        color: white;
        font-weight: bold;
        border: none;
        border-radius: 5px;
        padding: 10px 30px;
        position: absolute;
        bottom: 30px;
        right: 17%;
        cursor: pointer;

        .fas {
            margin-left: 10px;
        }
    }
}



</style>
