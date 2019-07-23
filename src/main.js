import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import './plugins'
import App from './App.vue'
import { sync } from 'vuex-router-sync'
import { createRouter } from './router'
import { createStore } from './store'

/* eslint-disable no-new */
// Vue Apollo
import { createProvider } from './apollo'

Vue.config.productionTip = false

const router = createRouter()
const store = createStore()

sync(store, router)

// Apollo
const apolloProvider = createProvider({}, {
  router
})

new Vue({
  router,
  store,
  apolloProvider,
  ...App
}).$mount('#app')
