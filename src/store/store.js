import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Toasted from 'vue-toasted';
import router from '../router'
import auth from './modules/auth'
import docs from './modules/docs'
import {toastError} from '../plugins/toasted'
import {toastSuccess} from '../plugins/toasted'

Vue.use(Vuex)
Vue.use(Toasted)

var fqdn = router.history.current.query.fqdn ? router.history.current.query.fqdn : localStorage.getItem('account_fqdn')

export default new Vuex.Store({
  modules: {
    auth,
    docs
  },
  state: {
    account: null,
    files_state: false,
    upload_success: false,
    processing: false,
    client:  {
      first_name: '',
      last_name: '',
      email: ''
    }
  },
  getters: {
    account(state) {
      return state.account
    },
    filesSubmitted(state) {
      return state.files_state
    },
    upload_success(state) {
      return state.upload_success
    },
    processing(state) {
      return state.processing
    },
    client(state) {
      return state.client
    }
  },
  mutations: {
    SET_ACCOUNT(state, account) {
      state.account = account
    },
    FILES_KEY(state) {
      state.files_state = !state.files_state
    },
    UPLOAD_SUCCESS(state) {
      state.upload_success = !state.upload_success
    },
    PROCESSING(state) {
      state.processing = !state.processing
    },
    RESET_CLIENT(state) {
      state.client =  {
        first_name: '',
        last_name: '',
        email: ''
      }
    }
  },
  actions: {
    getAccount(context) {
      axios.get('http://'+fqdn+'.traxit.test/api/account')
      .then(response => {
        context.commit('SET_ACCOUNT', response.data[0])
      })
      .catch(error => {
        console.log(error.response.data)
      })
    },
    submitFiles(context, data) {
      let formData = new FormData();
      for( var i = 0; i < data.files.length; i++ ){
        let file = data.files[i];
        formData.append('files[' + i + ']', file);
      } formData.append('data', JSON.stringify(data.details))
        formData.append('fqdn', fqdn)
      context.commit('PROCESSING')
      axios.post('http://'+fqdn+'.traxit.test/api/files', formData, {headers: {
        'Content-Type': 'multipart/form-data'
      }})
      .then(response => {
        console.log(response.data)
        context.commit('PROCESSING')
        context.commit('FILES_KEY')
        context.commit('UPLOAD_SUCCESS')
        context.commit('RESET_CLIENT')
        Vue.toasted.show('Upload Succesful', {type: 'success', className: 'toast-message'}).goAway(6000);
      }).catch(error => {
        context.commit('PROCESSING')
        toastError('Oops, something went wrong! Please try again.')
        console.log(error.response.data)
      })
    }
  }
})
