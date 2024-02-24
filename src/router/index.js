import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/LoginApp.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('auth')) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/auth/RegisterVue.vue'),
    // meta:{
    //   requiresAuth:true
    // }
  },
  {
    path: '/usuarios',
    name: 'usuarios',
    component: () => import('../views/usuarios/IndexUser.vue'),
    children: [
      {
        path: 'agregar',
        component: () => import('../views/usuarios/AgregarUser.vue')

      }
    ]
    ,
    meta: {
      requiresAuth: true
    }
  },
  {
    path:'/usuarios/:id',
    name:'usuario',
    component: () => import('../views/usuarios/DetalleUsuario.vue')
  },
  {
    path:'/editarUsuario/:id',
    name:'editarUsuario',
    component: () => import('../views/usuarios/EditarUser.vue')
  },
  {
    path: '/:patMatch(.*)',
    name: 'notfound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const protectedRoute = to.matched.some(record => record.meta.requiresAuth)
  if (protectedRoute && !localStorage.getItem('auth')) {
    next('/login')
  } else {
    next()
  }
})
export default router
