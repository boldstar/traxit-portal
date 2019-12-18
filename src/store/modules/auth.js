import axios from 'axios'
import router from '../../router'
import {destroySession} from '../../plugins/session'
import {startSession} from '../../plugins/session'
import {toastError} from '../../plugins/toasted'
import {toastSuccess} from '../../plugins/toasted'

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')

//this is the inital settings for axios requests dependent on local storage state
localStorage.getItem('account_fqdn') ? axios.defaults.baseURL = 'http://' + localStorage.getItem('account_fqdn') + '.traxit.test/api' : axios.defaults.baseURL = 'http://traxit.test/api';

export default {
    state: {
        token: localStorage.getItem('access_token') || null,
    },
    getters: {
        loggedIn(state) {
            return state.token;
          }
    },
    mutations: {
        createSession(state, token) {
            state.token = token
          },
        destroyToken(state) {
            state.token = null
            state.expiresIn = null
        },
        clearAlert(state) {
            state.alert = ''
            state.resetError = ''
            state.resetSuccess = ''
            state.successAlert = ''
            state.errorAlert = ''
        },
        errorAlert(state, alert) {
            state.errorAlert = alert
        },
    },
    actions: {
        registerGuest({commit}, data) {
            commit('PROCESSING')
            axios.post('/guest-register', data)
            .then(response => {
                router.push('/login')
                commit('PROCESSING')
                toastSuccess('Registration was a success, please login.')
            }).catch(error => {
                commit('PROCESSING')
                console.log(error.response.data)
            })
        },
        destroyToken(context) {
            if (context.getters.loggedIn) {
              return new Promise((resolve, reject) => {
                axios.post('/guest-logout', {'provider': 'guests'})
                .then(response => {
                    destroySession()
                    context.commit('destroyToken')
                    router.push('/login')
                    resolve(response)
                })
                .catch(error => {
                    destroySession()
                    context.commit('destroyToken')
                    router.push('/login')
                    reject(error)
                })
              })
            }
          },
          retrieveToken({ commit }, credentials) {
            commit('PROCESSING')
            return new Promise((resolve, reject) => {
                axios.post('/guest-login', {
                    username: credentials.username,
                    password: credentials.password,
                    fqdn: localStorage.getItem('account_fqdn')
                })
                .then(response => {
                    commit('clearAlert')
                    // start session sets a couple of the local storage items and make sure that the response contains the proper data
                    if(startSession(response)) {
                        setTimeout(() => {
                            commit('createSession', response.data.access_token);
                            localStorage.setItem('access_token', response.data.access_token);
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
                            router.push('/documents')
                            toastSuccess('Welcome to the Document Portal!')
                            commit('PROCESSING')
                        }, 2000)
                    }
                    resolve(response)
                })
                .catch(error => {
                    toastError(error.response.data)
                    commit('PROCESSING')
                    reject(error)
                })
            })
          },
    },
}