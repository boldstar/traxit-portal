<template>
    <div class="documents">
        <div class="docs-left">
            <img class="side-logo" v-if="account && account.logo" v-bind:src="logo"/>
            <ul v-if="docs">
                <li v-for="(doc, index) in docs" :key="index">{{doc.document_name}}</li>
            </ul>
        </div>
        <div class="document">
            document
            <pdf 
            v-for="i in numPages"
			:key="i"
            :page="i"
            :src="url" 
            v-if="current_doc"
            @num-pages="pageCount = $event"
			@page-loaded="currentPage = $event"
             />
        </div>
        <div class="docs-right">
            <h3 v-if="docs">{{docs[0].document_name}}</h3>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import pdf from 'vue-pdf'
export default {
    name: 'Documents',
   components: {
       pdf
  },
  data() {
    return {
        pageCount: 0,
        currentPage: 0,
        numPages: undefined
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
        }
    },
    methods: {
        viewportAttr() {
            var loadingTask = pdf.createLoadingTask(this.url)

            loadingTask.promise.then(pdf => {
                this.numPages = pdf.numPages
            })
        }
  },
    watch: {
        'docs': function(value) {
            if(value.length > 0) {
                this.$store.dispatch('getDoc', value[0].id)
                this.viewportAttr()
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
    background: gray;
    margin-top: 75px;
    z-index: 10;

    ul {
        list-style: none;
        margin: 0;
        padding: 0;

        li {
            background: white;
            border: 1px solid lightgray;
            padding: 15px 10px;
        }
    }
}

.document {
    flex-grow: 1;
    height: 100%;
    min-height: calc(100% - 70px);
    background: rgb(53, 53, 53);
    width: 100%;

    span {
        width: 90%;

        canvas {
            margin-top: 100px;
        }
    }

}


.docs-right {
    height: calc(100% - 75px);
    width: 300px;
    background: rgb(216, 216, 216);
    margin-top: 75px;
    z-index: 10;
}

</style>
