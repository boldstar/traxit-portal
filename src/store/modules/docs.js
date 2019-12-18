import axios from 'axios'

export default {
    state: {
        docs: [],
        doc: '',
        doc_details: null
    },
    getters: {
        docs(state) {
            return state.docs
        },
        doc(state) {
            return state.doc
        },
        doc_details(state) {
            return state.doc_details
        }
    },
    mutations: {
        ALL_DOCS(state, docs) {
            state.docs = docs
        },
        CURRENT_DOC(state, doc) {
            state.doc = doc
        },
        CURRENT_DOC_DETAILS(state, doc) {
            state.doc_details = doc
        }
    },
    actions: {
        getDocs({commit}, id) {
            axios.post('/get-guest-documents',{
                provider: 'guests',
                id: id
            })
            .then(res => {
                commit('ALL_DOCS', res.data)
            }).catch(err => {
                console.log(err.response.data)
            })
        },
        getDoc({commit}, id) {
            axios.post('/get-guest-document', {
                id:id,
                provider: 'guests'
            },{responseType:'blob'}).then(res => {
                commit('CURRENT_DOC', res.data)
            }).catch(err => {
                console.log(err.response.data)
            })
        },
        getDocDetails({commit}, id) {
            axios.post('/get-guest-document-details', {
                id:id,
                provider: 'guests'
            }).then(res => {
                commit('CURRENT_DOC_DETAILS', res.data)
            }).catch(err => {
                console.log(err.response.data)
            })
        }
    }
}