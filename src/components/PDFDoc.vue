<template>
    <div class="document" ref="document"  :class="{'hide-overflow': file && file.payment_required}">
        <nav class="toolbar">
            <button class="back-btn" @click="goBack()"><i class="fas fa-chevron-left"></i> Back</button>
            <span>Page: <input type="number" v-model="currentPage" @click="scrollTo($event)" @keyup="scrollTo($event)" :min="1" :max="numPages">/{{numPages}}</span>
            <span>Zoom: <strong>{{100 + currentZoom + '%  '}}</strong><button class="zoom-btn" type="button" @click="zoomIn()"><i class="fas fa-search-plus"></i></button>|<button class="zoom-btn" type="button" @click="zoomOut"><i class="fas fa-search-minus"></i></button></span>
        </nav>
        <pdf 
            v-for="i in numPages"
			:key="i"
            :page="i"
            :src="src"
            v-if="!loading"
            @num-pages="pageCount = $event"
            :ref="`${i}`"
            :id="`${i}`"
        />
        <PaymentModal v-if="file && file.payment_required" />
        <div v-if="loading" class="loading">
            <Spinner />
            <p>Loading...</p>
        </div>
    </div>
</template>

<script>
import pdf from 'vue-pdf'
import Spinner from '@/components/Spinner'
import PaymentModal from '@/components/PaymentModal'
import {setPage, scrollTo} from '../plugins/pdfx'
export default {
    name: 'PDFDoc',
    props: ['loaded', 'data', 'file'],
    components: {pdf, Spinner, PaymentModal},
    data() {
        return {
            pageCount: 0,
            currentPage: undefined,
            numPages: undefined,
            pages: [],
            src: '',
            loading: true,
            document: undefined,
            currentZoom: 0,
            startingZoom: 90
        }
    },
    methods: {
        getDoc() {
            var loadingTask = pdf.createLoadingTask(this.data)
            this.src = loadingTask

            this.src.promise.then(pdf => {
                this.loading = false
                this.numPages = pdf.numPages
                this.currentPage = 1
                setTimeout(() => {
                    this.addListener()
                }, 300)
            })
        },
        addListener() {
            if(this.numPages > 0) {
                for(var i = 0; i < this.numPages; i++) {
                    var span = this.$refs[i+1][0].$el
                    span.addEventListener('mouseover', (e) => {
                        this.setPage(e)
                    })
                }
            }
        },
        setPage(e) {
            this.currentPage = setPage(e)
        },
        scrollTo(event) {
            if(scrollTo(event, this.numPages)) {
                this.currentPage = event.target.value
                let page = this.$refs[this.currentPage][0].$el
                page.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
            }
        },
        zoomIn() {
            if(this.currentZoom < 50) {
                this.currentZoom = this.currentZoom+10
                for(var i = 0; i < this.numPages; i++) {
                    var page = this.$refs[i+1][0].$el
                    page.style.width = JSON.stringify(this.startingZoom+this.currentZoom)+'%'
                }
            }
        },
        zoomOut() {
            if(this.currentZoom > -50) {
                this.currentZoom = this.currentZoom-10
                for(var i = 0; i < this.numPages; i++) {
                    var page = this.$refs[i+1][0].$el
                    page.style.width = JSON.stringify(this.startingZoom+this.currentZoom)+'%'
                }
            }
        },
        goBack() {
            this.$router.push('/documents')
        }
    },
    watch: {
        data(value) {
            if(this.data) {
                this.getDoc()
            }
        }
    },
    beforeDestroy() {
        this.numPages = undefined
        this.pageCount = 0
        this.currentPage = undefined
        document.removeEventListener('mouseover', this.setPage)
    }
}
</script>

<style lang="scss">
input[type=number] {
    width: 50px;
    padding: 5px;
    margin-right: 5px;
    border-radius: 3px;
    border: 1px solid black;
}
input[type=number]::-webkit-inner-spin-button {
  opacity: 1;
}

.document {
    flex-grow: 1;
    height: 100%;
    max-height: calc(100% - 70px);
    background: rgb(53, 53, 53);
    width: 100%;
    overflow-y: scroll;
    margin-top: 70px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
        width: 90%;

        canvas {
            margin-top: 25px;
            margin-bottom: 25px;
        }
    }

    nav {
        position: -webkit-sticky;
        position: sticky;
        top: 5px;
        height: 50px;
        width: 100%;
        box-sizing: border-box;
        z-index: 1000;
        background: white;
        border-bottom: 1px solid black;
    }

}

.hide-overflow {
    overflow-y: hidden!important;
}

/*width*/
#document::-webkit-scrollbar {
    width: 10px!important;
}

    /* Track */
#document::-webkit-scrollbar-track {
    background: #f1f1f1!important; 
}

/* Handle */
#document::-webkit-scrollbar-thumb {
    background: #888; 
}

/* Handle on hover */
#document::-webkit-scrollbar-thumb:hover {
    background: #555; 
}

.loading {
    margin-top: 50px;

    p {
        color: white;
    }
}

.toolbar {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;

    span {
        align-self: center;
    }
}

.zoom-btn {
    background: none;
    color: #0077ff;
    cursor: pointer;
    border: none;
    font-size: 1.25rem;
}

.back-btn {
    background: none;
    border: none;
    color: #0077ff;
    font-weight: bold;
    display: flex;
    font-size: 1.3rem;
    position: absolute;
    left: 0;
    height: 48px;
    top: 0;
    border-right: 1px solid black;
    cursor: pointer;

    i {
        margin-right: 10px;
        margin-top: 2px;
    }

    &:hover {
        background: lightgray;
    }
}
</style>
