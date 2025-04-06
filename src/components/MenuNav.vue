<template>
  <!-- Navbar principal -->
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid">
      <img
        class="img-thumbnail img-fluid me-2"
        src="../assets/logo-parro.jpeg"
        alt="logo"
      />
      <a class="navbar-brand d-none d-md-block" href="#"
        >Parroquia Inmaculada <br />
        Concepción - Vinto</a
      >
      <!-- Menú hamburguesa para pantallas pequeñas -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Enlaces del menú -->
      <div class="collapse navbar-collapse nav nav-tabs" id="navbarNav">
        <!-- Menu 1 -->
        <div
          v-if="!auth"
          class="d-lg-flex w-100 justify-content-between align-items-end"
        >
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'home' }"
                ><i class="fas fa-home"></i>Inicio</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'about' }"
                >Acerca de...</router-link
              >
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'login' }"
                >Iniciar Sesión</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'register' }"
                >Registrarse</router-link
              >
            </li>
          </ul>
        </div>
        <div
          v-else
          class="d-lg-flex w-100 justify-content-between align-items-end"
        >
          <!-- Menu 2 -->
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'home' }"
                ><i class="fas fa-home"></i> Inicio</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'intencionesPagadas' }"
                ><i class="fas fa-list"></i> Intenciones</router-link
              >
            </li>
            <li class="nav-item" v-if="auth.data.rol_id === 2">
              <router-link class="nav-link" :to="{ name: 'misas' }"
                ><i class="fas fa-church"></i> Misas</router-link
              >
            </li>
            <li class="nav-item" v-if="auth.data.rol_id === 4">
              <router-link class="nav-link" :to="{ name: 'catequesis' }"
                ><i class="fas fa-chalkboard"></i> Catequesis</router-link
              >
            </li>
            <!-- <li class="nav-item" v-if="auth.data.rol_id === 4">
              <router-link class="nav-link" :to="{ name: 'clases' }"
                ><i class="fas fa-chalkboard"></i> Clases</router-link
              >
            </li> -->
            <!-- <li class="nav-item" v-if="auth.data.rol_id === 4">
              <router-link class="nav-link" :to="{ name: 'catecumenos' }"
                ><i class="fas fa-user-graduate"></i> Catecumenos</router-link
              >
            </li> -->
            <li class="nav-item" v-if="auth.data.rol_id === 4">
              <router-link class="nav-link" :to="{ name: 'examenes' }"
                ><i class="fas fa-pen"></i> Examenes</router-link
              >
            </li>
            <li class="nav-item" v-if="auth.data.rol_id === 4">
              <router-link class="nav-link" to="/estadisticas"
                ><i class="fas fa-chart-bar"></i>Estadísticas</router-link
              >
            </li>
            <li class="nav-item" v-if="auth.data.rol_id === 1">
              <router-link class="nav-link" :to="{ name: 'usuarios' }"
                ><i class="fas fa-users"></i> Usuarios</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'about' }"
                >Acerca de...</router-link
              >
            </li>
          </ul>
          <!-- para usuario -->
          <ul class="navbar-nav">
            <li class="nav-item dropdown d-flex">
              <div class="d-flex align-items-center">
                <span class="fs-4 text-light">{{
                  mayuscula(auth.data.usuario)
                }}</span>
              </div>
              <button
                class="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i
                  class="fas fa-user-circle py-2 px-2 bg-success rounded rounded-5 fs-3"
                ></i>
              </button>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">Perfil</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a class="dropdown-item" @click="logout">
                    <span class="text-danger">
                      <i class="fas fa-sign-out"></i> Cerrar sesión</span
                    ></a
                  >
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      activeMenu2: false,
    };
  },
  computed: {
    ...mapState(["auth"]),
  },
  methods: {
    ...mapActions(["logout"]),
    mayuscula(usuario) {
      var resultado = usuario.toUpperCase();
      return resultado;
    },
  },
};
</script>

<style>
nav {
  background-color: #001f3f;
}
nav > div > img {
  height: 100px;
  width: 100px;
}

@media (max-width: 991.98px) {
  .navbar-expand-lg .navbar-collapse {
    background-color: #001f3f; /* Color de fondo del menú desplegable en pantallas pequeñas */
  }
}
@media (max-width: 576px) {
  nav > div > img {
    height: 50px;
    width: 50px;
  }
}
</style>