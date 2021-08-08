import Vue from 'vue'
import App from './components/App'
import store from './store'

Vue.component('games', require('./components/App'))

new Vue({
  render: h => h(App),
  store,
}).$mount('#game')
