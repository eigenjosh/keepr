import Router from 'vue-router'
import Vue from 'vue'
import Home from '@/components/Home'
import CreatedKeeps from '@/components/CreatedKeeps'
import UserVaults from '@/components/UserVaults'
import NewKeep from '@/components/NewKeep'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Keep from '@/components/Keep'


Vue.use(Router);


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/accounts/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/accounts/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/created-keeps',
      name: 'CreatedKeeps',
      component: CreatedKeeps
    },
    {
      path: '/user-vaults',
      name: 'UserVaults',
      component: UserVaults
    },
    {
      path: '/create-keep',
      name: 'NewKeep',
      component: NewKeep
    },
    {
      path: '/keep/:id',
      name: 'keep',
      component: Keep
    }
  ]
})