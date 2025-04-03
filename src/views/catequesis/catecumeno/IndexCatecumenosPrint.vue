<template>
  <div class="container mt-4">
    {{ $route.params.catequesisId }}
    <div class="row m-2 align-items-center">
      <!-- Barra de búsqueda -->
      <div class="col-12 col-lg-8 mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Buscar..."
          v-model="searchQuery"
        />
      </div>
      <section class="col-12 col-lg-4 btn-group h-25 py-4">
        <router-link
          :to="{
            name: 'agregarCatecumeno',
            params: {
              catequesisId: $route.params.catequesisId,
              gestionId: $route.params.gestionId,
            },
          }"
          class="btn btn-success"
          ><i class="fas fa-user-plus"></i>
          <span class="d-none d-md-block">Nuevo</span></router-link
        >
        <button @click="imprimirNombresApellidos" class="btn btn-primary">
          <i class="fas fa-print"></i>
          <span class="d-none d-md-block">Imprimir</span>
        </button>
      </section>
    </div>
    <router-view></router-view>
    <div class="table-responsive">
      <table class="table table-hover table-bordered caption-top">
        <caption class="text-center text-bg-dark bg-opacity-75">
          Lista de Catecúmenos
        </caption>
        <thead class="table-secondary">
          <tr>
            <th>Nro</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th class="d-none d-lg-table-cell">Celular</th>
            <th class="d-none d-lg-table-cell">Edad</th>
            <th class="d-none d-md-table-cell">Permisos disponibles</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredCatecumenosClase" :key="item.id">
            <td class="table-secondary">{{ index + 1 }}</td>
            <td>{{ item.nombres }}</td>
            <td>{{ item.apellidos }}</td>
            <td class="d-none d-lg-table-cell">{{ item.celular }}</td>
            <td class="d-none d-lg-table-cell">
              {{ calcularEdad(item.fecha_nacimiento) }}
            </td>
            <td class="d-none d-md-table-cell">{{ item.max_permiso }}</td>
            <td>
              <div class="btn-group">
                <router-link
                  :to="{
                    name: 'detalleCatecumeno',
                    params: { catecumenoId: item.id },
                  }"
                  type="button"
                  class="btn btn-secondary"
                >
                  <i class="fas fa-info-circle"></i>
                  <span class="d-none d-lg-block">Datos</span>
                </router-link>
                <router-link
                  :to="{
                    name: 'asistenciasCatecumeno',
                    params: { catecumenoId: item.id },
                  }"
                  type="button"
                  class="btn btn-primary"
                >
                  <i class="fas fa-user-check"></i>
                  <span class="d-none d-lg-block">Asistencia</span>
                </router-link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      catecumenos: [],
      searchQuery: "",
    };
  },
  created() {
    this.getCatecumenos();
  },
  updated(){
    this.getCatecumenos();

  },
  computed: {
    filteredCatecumenosClase() {
      return this.catecumenos.filter((item) => {
        const term = this.searchQuery.toLowerCase();
        return (
          item.nombres.toLowerCase().includes(term) ||
          item.apellidos.toLowerCase().includes(term)
        );
      });
    },
  },
  methods: {
    async getCatecumenos() {
      await this.axios
        .get(
          "/catecumenos/listado/" +
            this.$route.params.catequesisId +
            "/" +
            this.$route.params.gestionId
        )
        .then((response) => {
          // Manejar la respuesta exitosa
          this.catecumenos = response.data.data;
          console.log(this.catecumenos);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar catecumenos:", error);
        });
    },
    calcularEdad(fecha_nacimiento) {
      if (!fecha_nacimiento) {
        alert("Por favor selecciona una fecha de nacimiento.");
        return;
      }
      const fechaNacimientoMoment = moment(fecha_nacimiento);
      const fechaActualMoment = moment();
      return fechaActualMoment.diff(fechaNacimientoMoment, "years");
    },
    imprimirNombresApellidos() {
      // Crear una nueva ventana de impresión
      const printWindow = window.open("", "_blank");
      const lista = this.filteredCatecumenosClase
        .map(
          (item, index) =>
            `<tr><td>${index + 1}</td><td>${item.nombres}</td><td>${
              item.apellidos
            }</td></tr>`
        )
        .join("");

      // Insertar contenido en la ventana de impresión
      printWindow.document.write(`
        <html>
          <head>
            <title>Confirmación - 2024</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 5px; }
              h3,h4 { text-align: center; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size:14px}
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
            </style>
          </head>
          <body>
            <h3>Parroquia Inmaculada Concepción de Vinto</h3>
            <h4>Confirmación - 2024</h4>
            <table>
              <thead>
                <tr>
                  <th>Nro</th>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                </tr>
              </thead>
              <tbody>
                ${lista}
                <td></td>
              </tbody>
            </table>
          </body>
        </html>
      `);

      // Cerrar el documento y enviar a impresión
      printWindow.document.close();
      printWindow.print();
    },
  },
};
</script>

<style>
.table-responsive {
  overflow-x: auto;
}
</style>
