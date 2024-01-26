<template>
  <!-- Navbar principal -->
  <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #001F3F;">
    <div class="container">
      <a class="navbar-brand" href="#">Mi Sitio</a>
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
        <ul v-if="!auth" class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'login' }"
              >Login</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'register' }"
              >Registrarse</router-link
            >
          </li>
        </ul>
        <div v-else class="d-flex w-100 justify-content-between">
          <!-- Menu 2 -->
          <ul class="navbar-nav ">
            <li class="nav-item" >
              <router-link class="nav-link" :to="{ name: 'home' }"
                >Home</router-link
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
                <span class="fs-4 text-light">{{ auth.data.usuario }}</span>
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
                  <a class="dropdown-item" @click="logout"> <span class="text-danger">                <i
                  class="fas fa-sign-out"
                ></i> Cerrar sesión</span></a>
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
import { mapState,mapActions } from "vuex";
export default {
  data() {
    return {
      activeMenu2: false,
    };
  },
  computed: {
    ...mapState(["auth"]),
  },
  methods:{
    ...mapActions(['logout'])
  }
};
</script>

<style>
@media (max-width: 991.98px) {
  .navbar-expand-lg .navbar-collapse {
    background-color: #007bff; /* Color de fondo del menú desplegable en pantallas pequeñas */
  }
}
</style>