require('./bootstrap');
import Vue from 'vue'
import App from './vue/components/App'
import store from './vue/store'

Vue.component('games', App)

const app = new Vue({
    el: '#app',
    store,
});

