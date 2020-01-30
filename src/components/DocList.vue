<template>
    <div class="doc-list">
        <input type="text" class="search-input" placeholder="Search by name" v-model="search">
        <div class="doc-tabs">
            <button class="clear-btn" @click="clearFilters()" v-if="filtered">Clear Filters</button>
            <DocTab :filter_tab="'All'" @filter="filterNone" :active="show_all" />
            <DocTab :filter_tab="'Needs Payment'" @filter="filterPayment" :active="payment_required" />
            <DocTab :filter_tab="'Needs Signature'" @filter="filterSignature" :active="signature_required" />
        </div>
        <table class="doc-list-table">
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Name</th>
                    <th style="cursor: pointer;"><Dropdown :options="taxYears" :label="'Tax Year'" v-model="filterYear" class="tax-year-dropdown" /></th>
                    <th>Shared By</th>
                </tr>
            </thead>
            <tbody v-if="sortedDocs">
                <tr v-for="(doc, index) in sortedDocs" :key="index" @click="showDoc(doc)">
                    <th style="padding: 10px 30px!important;"><i class="far fa-file-pdf"></i></th>
                    <td>{{doc.document_name}}</td>
                    <td>{{doc.tax_year}}</td>
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
import DocTab from '@/components/DocTab'
export default {
    name: 'DocList',
    props: ['allDocs'],
    components: {Dropdown, DocTab},
    data() {
        return {
            search: '',
            currentSort: 'document_name',
            currentSortDir: 'asc',
            show_all: true,
            payment_required: false,
            signature_required: false,
            filterYear: 'All'
        }
    },
    computed: {
        taxYears() {
            const years = this.allDocs.map(doc => doc.tax_year)

            const result = years.filter((v, i) => years.indexOf(v) === i)

            return result
        },
        filtered() {
            if(this.filterYear != 'All') {
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
              if(!this.payment_required){ return doc } else{ return doc.payment_required == this.payment_required} 
            }).filter(doc => {
              if(!this.signature_required){ return doc } else{ return doc.signature_required == this.signature_required} 
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
        },
        filterNone() {
            this.show_all = true
            this.payment_required = false
            this.signature_required = false
        },
        filterPayment() {
            this.show_all = false
            this.payment_required = true
            this.signature_required = false
        },
        filterSignature() {
            this.show_all = false
            this.payment_required = false
            this.signature_required = true

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

        .doc-tabs {
            width: 100%;
            box-sizing: border-box;
            border-left: 2px solid lightgray;
            border-right: 2px solid lightgray;
            display: flex;
            position: relative;
            background: rgb(238, 238, 238);
            padding-top: 5px;

            .tax-year-dropdown {
                align-self:  center;
                margin: 0 30px;
            }

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
                        border-top: none;
                        box-shadow: 0 0 5px 0 rgba(0,0,0,.3);
                    th {
                        padding: 10px 0;
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

// <th><i class="fas fa-file-invoice-dollar"></i></th>
//                     <th><i class="fas fa-file-signature"></i></th>
