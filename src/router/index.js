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
        name: 'agregarUsuario',
        component: () => import('../views/usuarios/AgregarUser.vue')

      }
    ]
    ,
    meta: {
      requiresAuth: true, requiredRole: 1
    }
  },
  {
    path: '/usuarios/:id',
    name: 'usuario',
    component: () => import('../views/usuarios/DetalleUsuario.vue'), meta: {
      requiresAuth: true, requiredRole: 1
    }
  },
  {
    path: '/editarUsuario/:id',
    name: 'editarUsuario',
    component: () => import('../views/usuarios/EditarUser.vue'), meta: {
      requiresAuth: true, requiredRole: 1
    }
  },
  {
    path: '/misas',
    name: 'misas',
    component: () => import('../views/misas/IndexMisas.vue'),
    meta: {
      requiresAuth: true, requiredRole: 2
    }
  },
  {
    path: '/agregarmisa',
    name: 'agregarMisa',
    component: () => import('../views/misas/AgregarMisa.vue'),
    meta: {
      requiresAuth: true, requiredRole: 2
    }
  },
  {
    path: '/editarmisa/:id',
    name: 'editarMisa',
    component: () => import('../views/misas/EditarMisa.vue'),
    meta: {
      requiresAuth: true, requiredRole: 2
    }
  },
  {
    path: '/registrar-intencion/:misaId/:listaId',
    name: 'registrarIntencion',
    component: () => import('../views/intenciones/RegistrarIntencion.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/intencion-pagada/:listaId',
    name: 'intencionPagada',
    component: () => import('../views/intenciones/IntencionPagada.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/detalle-intencion/:listaId',
    name: 'detalleIntencion',
    component: () => import('../views/intenciones/DetalleIntencion.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/listado-intenciones/:misaId/:listaId',
    name: 'listadoIntenciones',
    component: () => import('../views/intenciones/ListadoIntenciones.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/editar-intencion/:intencionId',
    name: 'editarIntencion',
    component: () => import('../views/intenciones/EditarIntencion.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/intenciones-pagadas',
    name: 'intencionesPagadas',
    component: () => import('../views/intenciones/IntencionesPagadas.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/intenciones-no-pagadas',
    name: 'intencionesNoPagadas',
    component: () => import('../views/intenciones/IntencionesNoPagadas.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/listado-intenciones-misa/:misaId',
    name: 'listadoIntencionesMisa',
    component: () => import('../views/intencionesSecre/ListadoIntencionesMisa.vue'),
    meta: {
      requiresAuth: true,requiredRole:2
    }
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
// funcion que itera todas las rutas
router.beforeEach((to, from, next) => {
  const protectedRoute = to.matched.some(record => record.meta.requiresAuth)
  let rol = null;
  if (localStorage.getItem('auth')) {
    rol = JSON.parse(localStorage.getItem('auth')).data.rol_id;
    console.log(rol);
  }
  if (protectedRoute && !localStorage.getItem('auth')) {
    next('/login')
  } else if (to.meta.requiredRole) {
    if (rol != to.meta.requiredRole) {
      next('/');
    }else{
      next()
    }    

  }
  else {
    next()
  }
})
export default router
