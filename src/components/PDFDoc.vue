<template>
    <div class="document" id="document"  :class="{'hide-overflow': file && file.payment_required}">
        <pdf 
            v-for="i in numPages"
			:key="i"
            :page="i"
            :src="src"
            v-if="!loading"
            @num-pages="pageCount = $event"
			@page-loaded="currentPage = $event"
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
            loading: true
        }
    },
    methods: {
        getDoc() {
            var loadingTask = pdf.createLoadingTask(this.data)
            this.src = loadingTask

            this.src.promise.then(pdf => {
                this.loading = false
                this.numPages = pdf.numPages
            })
        },
    },
    watch: {
        'data': function(value) {
            if(this.data) {
                this.getDoc()
            }
        }
    },
    beforeDestroy() {
        this.numPages = undefined
        this.pageCount = 0
        this.currentPage = undefined
    }
}
</script>

<style lang="scss">

.document {
    flex-grow: 1;
    height: 100%;
    max-height: calc(100% - 70px);
    background: rgb(53, 53, 53);
    width: 100%;
    overflow-y: scroll;
    margin-top: 70px;
    position: relative;

    span {
        width: 90%;

        canvas {
            margin-top: 25px;
            margin-bottom: 25px;
        }
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
</style>
