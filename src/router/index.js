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
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView2.vue')
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
      requiresAuth: true, requiredRole: 2
    }
  },
  {
    path: '/catecumenos/:catequesisGestionId',
    name: 'catecumenos',
    component: () => import('../views/catequesis/catecumeno/IndexCatecumenosPrint'),
    children: [
      {
        path: 'agregar-catecumeno',
        name: 'agregarCatecumeno',
        component: () => import('../views/catequesis/catecumeno/AgregarCatecumeno')

      },
    ],
    meta: {
      requiresAuth: true, requiredRole: 4
    }
  },

  {
    path: '/detalle-catecumeno/:catecumenoId',
    name: 'detalleCatecumeno',
    component: () => import('../views/catequesis/catecumeno/DetalleCatecumeno'),
    meta: {
      requiresAuth: true, requiredRole: 4
    }
  },
  {
    path: '/asistencias-catecumeno/:catecumenoId',
    name: 'asistenciasCatecumeno',
    component: () => import('../views/catequesis/catecumeno/AsistenciasCatecumeno'),
    meta: {
      requiresAuth: true, requiredRole: 4
    }
  },
  {
    path: '/editar-catecumeno/:catecumenoId',
    name: 'editarCatecumeno',
    component: () => import('../views/catequesis/catecumeno/EditarCatecumeno'),
    meta: {
      requiresAuth: true, requiredRole: 4
    }
  },
  // rutas para catequesis
  {
    path: '/catequesis',
    name: 'catequesis',
    component: () => import('../views/catequesis/catequesis/IndexCatequesis.vue'),
    meta: {
      requiresAuth: true, requiredRole: 4
    }
  },
  {
    path: '/catequesis/opciones/:catequesisId/:gestionId',
    name: 'opciones',
    component: () => import('../views/catequesis/catequesis/SelectCatequesis.vue'),
    meta: {
      requiresAuth: true, requiredRole: 4
    }
  },
  {
    path: '/catequesis/agregar-catequesis',
    name: 'agregarCatequesis',
    component: () => import('../views/catequesis/catequesis/AgregarCatequesis.vue'),
    meta: {
      requiresAuth: true, requiredRole: 4
    }
  },
  // rutas para clases
  {
    path: '/clases/:catequesisGestionId',
    name: 'clases',
    component: () => import('../views/catequesis/clases/IndexClases'),
    meta: {
      requiresAuth: true, requiredRole: 4
    }
  },
  {
    path: '/agregar-clase/:catequesisGestionId',
    name: 'agregarClase',
    component: () => import('../views/catequesis/clases/AgregarClase'),
    meta: {
      requiresAuth: true, requiredRole: 4
    }
  },
  {
    path: '/detalle-clase/:claseId',
    name: 'detalleClase',
    component: () => import('../views/catequesis/clases/DetalleClase'),
    meta: {
      requiresAuth: true, requiredRole: 4
    }
  },
  {
    path: '/editar-clase/:claseId',
    name: 'editarClase',
    component: () => import('../views/catequesis/clases/EditarClase'),
    meta: {
      requiresAuth: true, requiredRole: 4
    }
  },
  {
    path: '/asistencia-clase/:claseId',
    name: 'asistenciaClase',
    component: () => import('../views/catequesis/clases/AsistenciaClase'),
    meta: {
      requiresAuth: true, requiredRole: 4
    }
  },
  {
    path: '/examenes/:catequesisGestionId',
    name: 'examenes',
    component: () => import('../views/catequesis/examen/IndexExamenes'),
    meta: {
      requiresAuth: true, requiredRole: 4
    }
  },
  {
    path: '/nuevo-examen',
    name: 'nuevoExamen',
    component: () => import('../views/catequesis/examen/NuevoExamen'),
    meta: {
      requiresAuth: true, requiredRole: 4
    }
  },
  {
    path: '/editar-examen/:examenId',
    name: 'editarExamen',
    component: () => import('../views/catequesis/examen/EditarExamen'),
    meta: {
      requiresAuth: true, requiredRole: 4
    }
  },
  {
    path: '/notas-examen/:examenId',
    name: 'notasExamen',
    component: () => import('../views/catequesis/examen/NotasExamen'),
    meta: {
      requiresAuth: true, requiredRole: 4
    }
  },
  {
    path: '/estadisticas',
    name: 'estadisticas',
    component: () => import('../views/catequesis/estadistica/EstadisticasVue'),
    children: [
      {
        path: 'multas',
        name: 'multas',
        component: () => import('../views/catequesis/estadistica/MultasVue')

      },
      {
        path: 'general',
        name: 'general',
        component: () => import('../views/catequesis/estadistica/GeneralVue')

      },
      {
        path: 'calificaciones',
        name: 'calificaciones',
        component: () => import('../views/catequesis/estadistica/ExamenesVue')

      },
    ],
    meta: {
      requiresAuth: true, requiredRole: 4
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
    } else {
      next()
    }

  }
  else {
    next()
  }
})
export default router
