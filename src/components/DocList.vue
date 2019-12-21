<template>
    <div class="doc-list">
        <input type="text" class="search-input" placeholder="Search by name" v-model="search">
        <div class="dropdowns">
            <Dropdown :options="taxYears" :label="'Tax Year'" v-model="filterYear" />
            <Dropdown :options="paymentRequired" :label="'Payment Required'" v-model="filterPayment" />
            <Dropdown :options="signatureRequired" :label="'Signature Required'" v-model="filterSignature" />
            <button class="clear-btn" @click="clearFilters()" v-if="filtered">Clear</button>
        </div>
        <table class="doc-list-table">
            <thead>
                <tr>
                    <th>Type</th>
                    <th @click="sort('tax_year')" style="cursor: pointer;">Tax Year</th>
                    <th>Name</th>
                    <th><i class="fas fa-file-invoice-dollar"></i></th>
                    <th><i class="fas fa-file-signature"></i></th>
                    <th>Shared By</th>
                </tr>
            </thead>
            <tbody v-if="sortedDocs">
                <tr v-for="(doc, index) in sortedDocs" :key="index" @click="showDoc(doc)">
                    <th style="padding: 10px 30px!important;"><i class="far fa-file-pdf"></i></th>
                    <td>{{doc.tax_year}}</td>
                    <td style="text-align: left; padding-left: 20px!important;">{{doc.document_name}}</td>
                    <td><span v-if="doc.payment_required"><i class="fas fa-check"></i></span><span v-else><i class="fas fa-times"></i></span></td>
                    <td><span v-if="doc.signature_required"><i class="fas fa-check"></i></span><span v-else><i class="fas fa-times"></i></span></td>
                    <td>{{doc.uploaded_by}}</td>
                </tr>
            </tbody>
        </table>
        <div v-if="sortedDocs && sortedDocs.length < 1" class="no-docs">
            <i class="fas fa-file-alt"></i>
            <p>There are currently<br> no documents to view</p>   
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Dropdown from '@/components/Dropdown'
export default {
    name: 'DocList',
    props: ['allDocs'],
    components: {Dropdown},
    data() {
        return {
            search: '',
            currentSort: 'document_name',
            currentSortDir: 'asc',
            filterYear: 'All',
            filterPayment: 'All',
            filterSignature: 'All'
        }
    },
    computed: {
        taxYears() {
            const years = this.allDocs.map(doc => doc.tax_year)

            const result = years.filter((v, i) => years.indexOf(v) === i)

            return result
        },
        paymentRequired() {
            return [true, false]
        },
        signatureRequired() {
            return [true, false]
        },
        filtered() {
            if(this.filterYear != 'All' || this.filterPayment != 'All' || this.filterSignature != 'All') {
                return true
            } else return false
        },
        sortedDocs() {
            return this.allDocs.sort((a,b) => {
            let modifier = 1;
            if(this.currentSortDir === 'desc') modifier = -1;
            if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
            if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
            return 0;
            }).filter(doc => {
              if(this.filterYear === 'All'){ return doc } else{ return doc.tax_year === this.filterYear} 
            }).filter(doc => {
              if(this.filterPayment === 'All'){ return doc } else{ return doc.payment_required == this.filterPayment} 
            }).filter(doc => {
              if(this.filterSignature === 'All'){ return doc } else{ return doc.signature_required == this.filterSignature} 
            }).filter(doc => {
            return !this.search || doc.document_name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0 })
        },
    },
    methods: {
        showDoc(doc) {
            this.$router.push('/documents/pdf/'+ doc.id)
        },
        sort:function(s) {
        //if s == current sort, reverse
        if(s === this.currentSort) {
            this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
        }
            this.currentSort = s;
        },
        clearFilters() {
            this.filterYear = 'All'
            this.filterPayment = 'All'
            this.filterSignature = 'All'
            this.search = ''
            this.currentSort = 'document_name'
        }
    }
}
</script>

<style lang="scss">
    .doc-list {
        width: 100%;
        max-width: 1000px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 auto;
        height: 100%;
        max-height: calc(100vh - 300px);
        min-height: calc(100vh - 300px);
        overflow-y: scroll;
        padding: 10px;

        /*width*/
        &::-webkit-scrollbar {
            display: none!important;
        }

        .search-input {
            width: 100%;
            box-sizing: border-box;
            padding: 10px;
            border-radius: 5px 5px 0 0;
            border: 2px solid lightgray;
            font-size: 1.25rem;
        }

        .dropdowns {
            width: 100%;
            box-sizing: border-box;
            padding: 10px;
            border-left: 2px solid lightgray;
            border-right: 2px solid lightgray;
            display: flex;
            position: relative;

            .clear-btn {
                position: absolute;
                background: none;
                border: none;
                color: red;
                font-weight: bold;
                right: 20px;
                top: 20px;
                cursor: pointer;
            }
        }

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

                        i {
                            font-size: 1.25rem;;
                        }
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

    .no-docs {
        padding: 40px;
        position: relative;
        margin-top: 30px;


        i {
            font-size: 5.5rem;
            color: #0077ff;
        }

        &:after {
            content: "";
            display: block;
            height: 250px;
            width: 250px;
            border-radius: 50%;
            border: 2px solid lightgray;
            background: rgb(238, 238, 238);
            position: absolute;
            top: 0;
            left: -5px;
            z-index: -1;
        }
    }
</style>
