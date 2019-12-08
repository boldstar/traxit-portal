import axios from 'axios'

export default {
    state: {
        docs: [],
        doc: ''
    },
    getters: {
        docs(state) {
            return state.docs
        },
        current_doc(state) {
            return state.doc
        }
    },
    mutations: {
        ALL_DOCS(state, docs) {
            state.docs = docs
        },
        CURRENT_DOC(state, doc) {
            state.doc = doc
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
        }
    }
}