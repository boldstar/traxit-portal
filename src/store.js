import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Toasted from 'vue-toasted';
import router from './router'

Vue.use(Vuex)
Vue.use(Toasted)

var fqdn = router.history.current.query.fqdn ? router.history.current.query.fqdn : localStorage.getItem('account_fqdn')

export default new Vuex.Store({
  state: {
    account: null,
    files_state: false,
    upload_success: false,
    processing: false,
    show_code_modal: false,
    requesting_code: false,
    confirming_code: false,
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
    },
    showCodeModal(state) {
      return state.show_code_modal
    },
    requesting_code(state) {
      return state.requesting_code
    },
    confirming_code(state) {
      return state.confirming_code
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
    CODE_MODAL(state) {
      state.show_code_modal = !state.show_code_modal
    },
    REQEUSTING_CODE(state) {
      state.requesting_code = !state.requesting_code
    },
    CONFIRMING_CODE(state) {
      state.confirming_code = !state.confirming_code
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
      axios.get('https://'+fqdn+'.traxit.pro/api/account')
      .then(response => {
        context.commit('SET_ACCOUNT', response.data[0])
      })
      .catch(error => {
        console.log(error.response.data)
      })
    },
    createCode(context, data) {
      context.commit('PROCESSING')
      return new Promise((resolve, reject) => {
        axios.post('https://'+fqdn+'.traxit.pro/api/create-code', data)
        .then(response => {
          context.commit('PROCESSING')
          resolve(response)
        }).catch(error => {
          context.commit('PROCESSING')
          console.log(error.response.data)
          reject(error)
        })
      })
    },
    createNewCode(context, data) {
      context.commit('REQEUSTING_CODE')
      return new Promise((resolve, reject) => {
        axios.post('https://'+fqdn+'.traxit.pro/api/create-new-code', data)
        .then(response => {
          context.commit('REQEUSTING_CODE')
          resolve(response)
        }).catch(error => {
          context.commit('REQEUSTING_CODE')
          console.log(error.response.data)
          reject(error)
        })
      })
    },
    confirmCode(context, data) {
      context.commit('CONFIRMING_CODE')
      return new Promise((resolve, reject) => {
        axios.post('https://'+fqdn+'.traxit.pro/api/confirm-code', {code: data})
        .then(response => {
          context.commit('CONFIRMING_CODE')
          resolve(response)
        }).catch(error => {
          context.commit('CONFIRMING_CODE')
          reject(error)
          Vue.toasted.show(error.response.data, 
          {
            type: 'error', 
            className: 'toast-message',
            action: [
              {
                text: 'X',
                onClick: (e, toastObject) => {
                  toastObject.goAway(0)
                },
                className: 'close-btn'
              }
            ]
          })
        })
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
      axios.post('https://'+fqdn+'.traxit.pro/api/files', formData, {headers: {
        'Content-Type': 'multipart/form-data'
      }})
      .then(response => {
        context.commit('PROCESSING')
        context.commit('FILES_KEY')
        context.commit('UPLOAD_SUCCESS')
        context.commit('RESET_CLIENT')
        Vue.toasted.show('Upload Succesful', {type: 'success', className: 'toast-message'}).goAway(6000);
      }).catch(error => {
        context.commit('PROCESSING')
        Vue.toasted.show('Oops, something went wrong! Please try again.', 
        {
          type: 'error', 
          className: 'toast-message',
          action: [
            {
              text: 'X',
              onClick: (e, toastObject) => {
                toastObject.goAway(0)
              },
              className: 'close-btn'
            }
          ]
        })
        console.log(error.response.data)
      })
    }
  }
})
