import Vue from 'vue'
import Router from 'vue-router'

// Views
import LandingPage from './views/LandingPage.vue'
import Home from './views/Home.vue'
import AdminLogin from './views/AdminLogin.vue'
import Admin from './views/Admin.vue'
import PageNotFound from './views/PageNotFound.vue'

// Vuex Store
import { createStore } from './store'

Vue.use(Router)

const routes = [{
  path: '/',
  name: 'ladingPage',
  component: LandingPage
},
{
  path: '/33',
  name: '33',
  component: AdminLogin
},
{
  path: '/home',
  name: 'home',
  component: Home,
  meta: { requiresAuth: true }
},
{
  path: '/admin',
  name: 'admin',
  component: Admin,
  meta: {
    requiresAuth: true,
    requiresAdmin: true
  }
},
{
  path: '*',
  component: PageNotFound
}
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

  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      const store = createStore()
      store.dispatch('loginValidation').then((response) => {
        const logged = !!response

        console.log(logged)
        if (!logged) {
          next({
            path: '/'
          })
        } else {
          if (to.matched.some(record => record.meta.requiresAdmin)) {
            const isAdmin = response.isAdmin
            if (!isAdmin) {
              next({
                path: '/'
              })
            } else {
              next()
            }
          }

          next()
        }
      }, error => {
        // handle error here
        console.log(error)
      })
    } else {
      next() // make sure to always call next()!
    }
  })

  return router
}
