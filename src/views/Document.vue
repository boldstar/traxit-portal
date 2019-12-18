<template>
    <div class="document-wrapper">
            <PDFDoc
                :loaded="doc"
                :data="url"
                v-if="url"
                :file="doc"
             />
        <div class="docs-right">
            <div v-if="doc_details">
                <h3 v-if="doc_details.document_name">{{doc_details.document_name}}</h3>
                <div class="doc-details">
                    <div>
                        <span v-if="doc_details.uploaded_by">Shared By: </span><span>{{doc_details.uploaded_by}}</span>
                    </div>
                    <div>
                        <span v-if="doc_details.created_at">Date Shared: </span><span>{{doc_details.created_at | formatDate }}</span>
                    </div>
                </div>
                <button class="download-btn" type="button">Download<i class="fas fa-file-download"></i></button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import PDFDoc from '@/components/PDFDoc.vue'
import range from 'lodash/range'
export default {
    name: 'Document',
    components: {PDFDoc},
    computed: {
        ...mapGetters(['account', 'doc', 'doc_details']),
        logo() {
            return `data:image/png;base64, ${this.account.logo}`
        },
        url() {
            var blob = URL.createObjectURL(new Blob([this.doc]))
            return blob
        },
    },
    created() {
        this.$store.dispatch('getDoc', this.$route.params.id)
        this.$store.dispatch('getDocDetails', this.$route.params.id)
    }
}
</script>

<style lang="scss">
.side-logo {
    margin-top: 10px;
    max-width: 150px;
    width: auto;
}

.document-wrapper {
    display: flex;
    width: 100%;
    height: calc(100vh);
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
        margin-top: 0;
    }

    .doc-details {
        text-align: left;
        display: flex;
        flex-direction: column;

        div {
            display: flex;
            justify-content: space-between;

            span {
                font-size: .9rem;
            }
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
