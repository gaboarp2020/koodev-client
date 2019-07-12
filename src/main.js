import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import './plugins/vuetify'
import VueApollo from 'vue-apollo'
import App from './App.vue'
import router from './router'
import ApolloClient from 'apollo-boost'

const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  uri: 'http://localhost:4000/graphql'
})

Vue.use(VueApollo)

Vue.config.productionTip = false

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

new Vue({
  router,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
