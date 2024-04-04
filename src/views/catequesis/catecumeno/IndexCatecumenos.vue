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
    <div class="table-responsive">
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Nro</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <!-- <th>CI</th> -->
            <th>Celular</th>
            <th>Edad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in catecumenos" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.nombres }}</td>
            <td>{{ item.apellidos }}</td>
            <!-- <td>{{ item.ci }}</td> -->
            <td>{{ item.celular }}</td>
            <td>{{ calcularEdad(item.fecha_nacimiento) }}</td>
            <td>
              <!-- Botón de detalles -->
              <router-link
                :to="{
                  name: 'detalleCatecumeno',
                  params: { catecumenoId: item.id },
                }"
                type="button"
                class="btn btn-primary me-2"
              >
                <i class="fas fa-info-circle"></i> Detalles
              </router-link>
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
  data() {
    return {
      catecumenos: [],
    };
  },
  created() {
    this.getCatecumenos();
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