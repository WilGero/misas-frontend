<template>
  <div class="container">
    <div class="d-flex justify-content-end">
      <ul class="nav bg-dark">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
          Balance
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
              <router-link
                class="dropdown-item"
                :to="{name:'multas'}"
                exact
                >Multas</router-link
              >
            </li>
            <li><router-link
                class="dropdown-item"
                :to="{name:'general'}"
                exact
                >General</router-link
              ></li>
          </ul>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{ name: 'calificaciones' }"
            exact
            exact-active-class="active"
            >Examenes</router-link
          >
        </li>
      </ul>
    </div>
    <div class="d-flex justify-content-start">
      <button class="btn btn-primary" @click="printSection">
        <i class="fas fa-print"></i> Imprimir
      </button>
    </div>

    <h2>{{ titulo }}</h2>
    <div id="printable">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      asistenciaCatecumenos: [],
      catecumenos: [],
      falta: 0,
      permiso: 0,
      atraso: 0,
      cont: 0,
      multaTotal: 0,
    };
  },
  created() {},
  methods: {
    printSection() {
      const printContent = document.getElementById("printable").innerHTML;
      const originalContent = document.body.innerHTML;

      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContent;

      window.location.reload(); // Recargar la página para restaurar los scripts y el estado original
    },
  },
};
</script>
<style>
.nav-link.active {
  font-weight: bold;
  color: #007bff; /* Cambia el color o estilos como desees */
}
</style>