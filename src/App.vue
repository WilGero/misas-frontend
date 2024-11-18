<template>
  <section class="arriba mb-5">
    <menu-nav></menu-nav>
  </section>
  <section class="margen-arriba pt-2">
    <router-view />
  </section>
  <footer class=" bg-dark text-info py-3">
    <div class="container text-center">
      <p>Parroquia Inmaculada Concepción</p>
      <p>Dirección: 123 Calle Principal, Ciudad, País</p>
      <p>Teléfono: (123) 456-7890</p>
      <p>
        <a href="#" class="footer-link"><i class="fab fa-facebook footer-icon"></i></a>
        <a href="#" class="footer-link"><i class="fab fa-whatsapp footer-icon"></i></a>
        <a href="#" class="footer-link"><i class="fab fa-instagram footer-icon"></i></a>
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
  height: 75px; /* Altura fija para calcular el margen dinámico */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.margen-arriba {
  margin-top: 8%; /* Igual a la altura del menú */
  background-image:url("./assets/fondo-parroquia.jpg") ;
  background-size: cover;
  background-position: center;
  height: 100%;
}

@media (max-width: 576px) {


  .margen-arriba {
  margin-top: 20%; /* Igual a la altura del menú */
  background-image:url("./assets/fondo-parroquia.jpg") ;
  background-size: cover;
  background-position: center;
  height: 100%;
}

}
@media (max-width: 768px) {
  .arriba {
  height: 8%; /* Altura fija para calcular el margen dinámico */

}


.margen-arriba {
  margin-top: 12%; /* Igual a la altura del menú */
  background-image:url("./assets/fondo-parroquia.jpg") ;
  background-size: cover;
  background-position: center;
  height: 100%;
}}
</style>
