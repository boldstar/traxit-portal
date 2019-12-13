import axios from 'axios'
import router from '../router'
import {toastError} from '../plugins/toasted'
import store from '../store/store'

axios.interceptors.response.use((response) => {return response},(error) => {
    if(error.response.status === 401) {
        store.commit('destroyToken')
        router.push('/login')
        localStorage.removeItem('access_token')
        localStorage.removeItem('expires_on')
        toastError('Please login')
    }
    return Promise.reject(error)
});
  