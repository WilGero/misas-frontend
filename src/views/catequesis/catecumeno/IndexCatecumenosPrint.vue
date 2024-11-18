<template>
  <div class="container mt-4">
    <div class="d-flex m-2 justify-content-around">
      <h1>Tabla de Catecumenos</h1>
      <section class="btn-group h-25">
        <router-link :to="{ name: 'agregarCatecumeno' }" class="btn btn-success"
          ><i class="fas fa-user-plus"></i> <span class="d-none d-lg-block">Agregar</span></router-link
        >
        <button @click="imprimirNombresApellidos" class="btn btn-primary">
        <i class="fas fa-print"></i> <span class="d-none d-lg-block">Imprimir</span>
        </button>
      </section>
    </div>

    <!-- Barra de búsqueda -->
    <div class="mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Buscar..."
        v-model="searchQuery"
      />
    </div>
    <div class="table-responsive">
      <table class="table table-hover table-bordered">
        <thead class="table-light">
          <tr>
            <th>Nro</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Celular</th>
            <th>Edad</th>
            <th>Permisos disponibles</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredCatecumenosClase" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.nombres }}</td>
            <td>{{ item.apellidos }}</td>
            <td>{{ item.celular }}</td>
            <td>{{ calcularEdad(item.fecha_nacimiento) }}</td>
            <td>{{ item.max_permiso }}</td>
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
                  <i class="fas fa-info-circle"></i> Datos
                </router-link>
                <router-link
                  :to="{
                    name: 'asistenciasCatecumeno',
                    params: { catecumenoId: item.id },
                  }"
                  type="button"
                  class="btn btn-primary"
                >
                  <i class="fas fa-user-check"></i> Asistencia
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
        .get("/catecumenos/listado")
        .then((response) => {
          this.catecumenos = response.data.data;
          console.log(this.catecumenos);
        })
        .catch((error) => {
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
            `<tr><td>${index + 1}</td><td>${item.nombres}</td><td>${item.apellidos}</td></tr>`
        )
        .join("");

      // Insertar contenido en la ventana de impresión
      printWindow.document.write(`
        <html>
          <head>
            <title>Confirmación - 2024</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { text-align: center; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
            </style>
          </head>
          <body>
            <h1>Confirmación - 2024</h1>
            <table>
              <thead>
                <tr>
                  <th>Nro</th>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>Asistencia</th>
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
