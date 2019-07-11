import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#2196f3',
    secondary: '#00bcd4',
    accent: '#607d8b',
    error: '#f44336',
    warning: '#ffeb3b',
    info: '#03a9f4',
    success: '#4caf50'
  }
})
