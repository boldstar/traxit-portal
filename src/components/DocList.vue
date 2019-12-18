<template>
    <div class="doc-list">
        <table class="doc-list-table">
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Tax Year</th>
                    <th>Name</th>
                    <th>Payment Required</th>
                    <th>Signature Required</th>
                    <th>Shared By</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(doc, index) in allDocs" :key="index" @click="showDoc(doc)">
                    <th><i class="far fa-file-pdf"></i></th>
                    <td>{{doc.tax_year}}</td>
                    <td>{{doc.document_name}}</td>
                    <td><span v-if="doc.payment_required"><i class="fas fa-check"></i></span><span v-else><i class="fas fa-times"></i></span></td>
                    <td><span v-if="doc.signature_required"><i class="fas fa-check"></i></span><span v-else><i class="fas fa-times"></i></span></td>
                    <td>{{doc.uploaded_by}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'DocList',
    props: ['allDocs'],
    methods: {
        showDoc(doc) {
            this.$router.push('/documents/pdf/'+ doc.id)
        }
    }
}
</script>

<style lang="scss">
    .doc-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .doc-list-table {
        border-collapse: collapse;
        max-width: 1000px;
        width: 100%;
            thead {

                tr {
                        border: 1px solid rgb(204, 204, 204);
                        box-shadow: 0 0 10px 0 rgba(0,0,0,.3);
                    th {
                        padding: 15px 0;
                        font-size: 14px;
                    }
                }
            }
            tbody {
                tr {
                    cursor: pointer;
                    transition: box-shadow .2s ease;

                    th {
                        padding: 10px!important;

                        i {
                            color: red!important;
                            font-weight: bold!important;
                            font-size: 1.5rem;
                        }
                    }

                    td {
                        padding: 10px!important;

                        .fa-times {
                            color: red!important;
                        }

                        .fa-check {
                            position: static!important;
                        }
                    }

                    &:hover {
                        box-shadow: 0 0 3px 0 rgba(0,0,0,.5);
                        background: rgba(0,0,0,.1);
                    }
                }
            }
        }
    }
</style>
