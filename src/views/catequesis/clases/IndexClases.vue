<template>
  <div class="container mt-4">
    <div class="d-flex m-2 justify-content-around">
      <h1>Clases de la catequesis</h1>
      <section>
        <router-link :to="{ name: 'agregarClase' }" class="btn btn-success"
          ><i class="fas fa-plus"></i> Agregar</router-link
        >
      </section>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Nro</th>
            <th>Tema</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in clases" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.tema }}</td>
            <td>{{ formatDatetimeWithMonthInLetters(item.fecha_hora) }}</td>
            <td>
              <!-- Botón de detalles -->
              <router-link
                :to="{
                  name: 'detalleClase',
                  params: { claseId: item.id },
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
      clases: [],
    };
  },
  created() {
    this.getClases();
  },
  methods: {
    formatDatetimeWithMonthInLetters(datetime) {
      return moment(datetime).locale("es").format("D [de] MMMM [del] YYYY, h:mm a");
    },
    async getClases() {
      await this.axios
        .get("/clases/listado")
        .then((response) => {
          // Manejar la respuesta exitosa
          this.clases = response.data.data;
          console.log(this.clases);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar las clases:", error);
        });
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