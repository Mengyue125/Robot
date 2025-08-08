import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'
import 'animate.css';
import PubSub from 'pubsub-js'
import i18n from './plugins/i18n'

// axios
Vue.prototype.$axios = axios

//lazy懒加载
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'path/to/error-image.png',
  loading: 'path/to/loading-spinner.gif',
  attempt: 1
})

Vue.use(VueRouter)
Vue.use(PubSub)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  i18n,
}).$mount('#app')
