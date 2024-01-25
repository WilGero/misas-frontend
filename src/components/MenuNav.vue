<template>
  <!-- Navbar principal -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
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
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'home'}">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'about'}">Acerca de...</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'login'}">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'register'}">Registrarse</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style>

@media (max-width: 991.98px) {
  .navbar-expand-lg .navbar-collapse {
    background-color: #007bff; /* Color de fondo del menú desplegable en pantallas pequeñas */
  }
}
</style>