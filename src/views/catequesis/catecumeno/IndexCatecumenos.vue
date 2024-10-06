<template>
  <div class="container mt-4">
    <div class="d-flex m-2 justify-content-around">
      <h1>Tabla de Catecumenos</h1>
      <section>
        <router-link :to="{ name: 'agregarCatecumeno' }" class="btn btn-success"
          ><i class="fas fa-user-plus"></i> Agregar</router-link
        >
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
            <!-- <th>CI</th> -->
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
            <!-- <td>{{ item.ci }}</td> -->
            <td>{{ item.celular }}</td>
            <td>{{ calcularEdad(item.fecha_nacimiento) }}</td>
            <td>{{ item.max_permiso }}</td>
            <td>
              <div class="btn-group">
                <!-- Botón de detos del catecumeno -->
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
                <!-- Botón de asistencia del catecumeno -->
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
          <!-- Agrega más filas según sea necesario -->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  setup(){
    return{
      
    }
  },
  data() {
    return {
      catecumenos: [],
      searchQuery: "", // Añadir searchQuery al estado
    };
  },
  created() {
    this.getCatecumenos();
  },
  computed: {
    filteredCatecumenosClase() {
      // Filtrar catecumenosClase basado en searchQuery
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
      // Validar si se ha seleccionado una fecha
      if (!fecha_nacimiento) {
        alert("Por favor selecciona una fecha de nacimiento.");
        return;
      }
      // Calcular la edad
      const fechaNacimientoMoment = moment(fecha_nacimiento);
      const fechaActualMoment = moment();
      return fechaActualMoment.diff(fechaNacimientoMoment, "years");
    },
  },
};
</script>

<style>
/* Estilos personalizados */
.table-responsive {
  overflow-x: auto;
}
</style>