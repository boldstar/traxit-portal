import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      props: true,
      meta: {
        layout: 'default',
        sharingFiles: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue'),
      props: true,
      meta: {
        layout: 'default',
        requiresVisitor: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "about" */ './views/Register.vue'),
      props: true,
      meta: {
        layout: 'default',
        requiresVisitor: true
      }
    },
    {
      path: '/reset',
      name: 'reset',
      component: () => import(/* webpackChunkName: "about" */ './views/PasswordReset.vue'),
      props: true,
      meta: {
        layout: 'default',
      }
    },
    {
      path: '/documents',
      name: 'documents',
      component: () => import(/* webpackChunkName: "about" */ './views/Documents.vue'),
      props: true,
      meta: {
        layout: 'default',
        requiresAuth: true
      },
      children: [
        {
          path: 'pdf/:id',
          name: 'document',
          component: () => import(/* webpackChunkName: "about" */ './views/Document.vue'),
          props: true,
          meta: {
            layout: 'default',
            requiresAuth: true
          },
        }
      ]
    },
  ]
})
