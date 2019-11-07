import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vueDropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import Toasted from 'vue-toasted';
import { VueEditor } from "vue2-editor";

Vue.config.productionTip = false

Vue.component('vue-dropzone', vueDropzone);
Vue.component('vue-editor', VueEditor)

Vue.use(Toasted)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
