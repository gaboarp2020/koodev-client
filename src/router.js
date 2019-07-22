import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from './views/LandingPage.vue'

Vue.use(Router)

const routes = [{
  path: '/',
  name: 'ladingPage',
  component: LandingPage
},
{
  path: '/home',
  name: 'home',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ './views/Home.vue')
}
// {
//   path: '/admin',
//   name: 'admin',
//   component: PageAdmin
// },
// {
//   path: '*',
//   component: PageNotFound
// }
]

export function createRouter () {
  const router = new Router({
    routes,
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      }
      if (to.hash) {
        return {
          selector: to.hash
        }
      }
      return {
        x: 0,
        y: 0
      }
    }
  })

  return router
}
