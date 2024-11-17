<template>
  <section class="arriba mb-5">
    <menu-nav></menu-nav>
  </section>
  <section class="margen-arriba">
    <router-view />
  </section>
  <footer class="mt-5">
    <div class="container text-center">
      <p>Parroquia Inmaculada Concepción</p>
      <p>Dirección: 123 Calle Principal, Ciudad, País</p>
      <p>Teléfono: (123) 456-7890</p>
      <p>
        <a href="#" class="footer-link"
          ><i class="fab fa-facebook footer-icon"></i
        ></a>
        <a href="#" class="footer-link"
          ><i class="fab fa-whatsapp footer-icon"></i
        ></a>
        <a href="#" class="footer-link"
          ><i class="fab fa-instagram footer-icon"></i
        ></a>
      </p>
    </div>
  </footer>
</template>

<script>
import MenuNav from "./components/MenuNav.vue";
import { mapActions } from "vuex";
export default {
  components: {
    MenuNav,
  },
  data() {
    return {};
  },

  created() {
    this.setAuth();
  },
  methods: {
    ...mapActions(["setAuth"]),
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
body {
  margin-bottom: 100px; /* Para dejar espacio para el pie de página */
  background-color: #4e8693; /* Fallback color */
  background-image: linear-gradient(
    to bottom right,
    #4e8693,
    #ffffff,
    #8bc6d0
  ); /* Gradient */
}
footer {
  width: 100%;
  background-color: #4e8693; /* Fallback color */
  background-image: linear-gradient(
    to bottom right,
    #4e8693,
    #ffffff,
    #8bc6d0
  ); /* Gradient */
  padding: 20px 0;
}
.footer-icon {
  font-size: 24px;
  margin-right: 10px;
}
.footer-link {
  color: #495057;
  text-decoration: none;
}
.arriba {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

.margen-arriba {
  margin-top: 10%;
}
@media (max-width: 576px) {
  /* Estilos para pantallas de menos de 576px */
  .margen-arriba {
    margin-top: 20%;
}
}
</style>
