import Router from 'vue-router'
import Vue from 'vue'
import Home from '@/components/Home'
import CreatedKeeps from '@/components/CreatedKeeps'
import MyKeeps from '@/components/MyKeeps'
import NewKeep from '@/components/NewKeep'


Vue.use(Router);


export default new Router({
  routes: [
    {
      path: '/',
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
    },
    {
      path: '/create-keep',
      name: 'NewKeep',
      component: NewKeep
    }
  ]
})