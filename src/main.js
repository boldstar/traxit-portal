import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import vueDropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import Toasted from 'vue-toasted';
import { VueEditor } from "vue2-editor";
import Default from './layouts/Default.vue';
import {beforeEachCustom} from './plugins/guards'
import { ValidationProvider } from 'vee-validate';
import { ValidationObserver } from 'vee-validate';
import './plugins/http'
import './plugins/filters'


Vue.config.productionTip = false

Vue.component('vue-dropzone', vueDropzone);
Vue.component('vue-editor', VueEditor)
Vue.component('default-layout', Default);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.use(Toasted)
router.beforeEach(beforeEachCustom)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
