import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'


let server = axios.create({
  baseURL: window.location.host.includes("localhost") ? '//localhost:5000/' : '/',
  timeout: 2000,
  withCredentials: true
})

server.post('accounts/login', { email: document.getElementById("inputEmail"), password: document.getElementById("inputPassword") }).then(res => {
  this.$store.dispatch('setUser')
  console.log(res)
}).catch(err => console.log(err))

server.get('accounts/authenticate').then(x => console.log(x))

server.post('accounts/register', { username: document.getElementById("inputUsername"), email: document.getElementById("inputEmail"), password: document.getElementById("inputPassword"), rPassword: document.getElementById("inputrPassword") }).then(res => {
  
})

server.get("api/keeps").then(res => {
  console.log(res)
}).catch(err => console.log(err))

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})