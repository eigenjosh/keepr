import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from 'axios'
import store from './store'


// var server = axios.create({
//   baseURL: window.location.host.includes("localhost") ? '//localhost:8080/' : '/',
//   timeout: 2000,
//   withCredentials: true
// })

// server.post('account/login', { email: 'j@j.com', password: 'test' }).then(res => {
//   console.log(res)
// }).catch(er => console.log(er))
// server.get('account/authenticate').then(x => console.log(x))

// server.get("api/values").then(res => {
//   console.log(res)
// }).catch(err => console.log(err))


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})