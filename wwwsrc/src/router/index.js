import Router from 'vue-router'
import Vue from 'vue'
import Home from '@/components/Home'
import CreatedKeeps from '@/components/CreatedKeeps'
import MyKeeps from '@/components/MyKeeps'
import NewKeep from '@/components/NewKeep'
import Register from '@/components/Register'
import Login from '@/components/Login'


Vue.use(Router);


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/account/register',
      name: 'Register',
      component: Register 
    },
    {
      path: '/account/login',
      name: 'Login',
      component: Login
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