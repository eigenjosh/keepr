import Router from 'vue-router'
import Vue from 'vue'
// import BootstrapVue from 'bootstrap-vue'
import Home from '@/components/Home'
import CreatedKeeps from '@/components/CreatedKeeps'
import MyKeeps from '@/components/MyKeeps'


Vue.use(Router);
// Vue.use(BootstrapVue);


export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/created-keeps',
      name: 'CreatedKeeps',
      component: CreatedKeeps
    },
    {
      path: '/my-keeps',
      name: 'MyKeeps',
      component: MyKeeps
    }
  ]
})