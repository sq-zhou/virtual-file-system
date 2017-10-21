import Vue from 'vue'
import Router from 'vue-router'
import director from '@/components/director/director'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'director',
      component: director
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
