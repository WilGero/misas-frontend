<template>
  <div class="container position-relative">
    <div class="position-absolute mt-2 top-0 left-0">
      <button class="btn btn-secondary" @click="irAtras">
        <i class="fas fa-arrow-left"></i> Atrás
      </button>
    </div>
    <h2>Catequesis de {{ nombre }}</h2>
    <span class="fs-3 text-start me-5"
      ><strong>Tema:</strong> {{ temaClase }}</span
    >
    <span class="fs-4">{{
      formatDatetimeWithMonthInLetters(fechaHoraClase)
    }}</span>
    <h3>Lista de Catecumenos</h3>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Nro</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Asistencia</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in catecumenosClase"
            :key="'catecumeno' + item.id"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ item.nombres }}</td>
            <td>{{ item.apellidos }}</td>
            <td>
              <section class="btn-group">
                <button
                  @click="actualizarAsistencia(item.id, asistencias[0].id)"
                  class="btn btn-success btn-attendance"
                >
                  <i class="fas fa-check"></i>
                </button>
                <button
                  @click="actualizarAsistencia(item.id, asistencias[1].id)"
                  class="btn btn-warning btn-attendance"
                >
                  <i class="fas fa-clock"></i>
                </button>
                <button
                  @click="actualizarAsistencia(item.id, asistencias[2].id)"
                  class="btn btn-info btn-attendance"
                >
                  <i class="fas fa-user-clock"></i>
                </button>
                <button
                  @click="actualizarAsistencia(item.id, asistencias[3].id)"
                  class="btn btn-danger btn-attendance"
                >
                  <i class="fas fa-times"></i>
                </button>
              </section>
            </td>
            <td class="fs-4">
              {{ item.tipo }}
            </td>
          </tr>
          <!-- Aquí puedes agregar más filas con otros estudiantes -->
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
      asistencias: [],
      clase: {},
      respuestas: [],
      catecumenosClase: [],
      catecumeno: {},
      estadoAsistencia: null,
      formulario: {
        asistencia_id: null,
        clase_id: null,
        catecumeno_id: null,
      },
      temaClase: null,
      fechaHoraClase: null,
      nombre: null,
    };
  },
  created() {
    this.getAsistencias();
    this.getCatecumenosClase();
    this.getClase();
  },

  methods: {
    formatDatetimeWithMonthInLetters(datetime) {
      return moment(datetime)
        .locale("es")
        .format("D [de] MMMM [del] YYYY, h:mm a");
    },
    async getAsistencias() {
      await this.axios
        .get("/asistencias/listado")
        .then((response) => {
          // Manejar la respuesta exitosa
          this.asistencias = response.data.data;
          console.log(this.asistencias);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar asistencias:", error);
        });
    },
    async getCatecumenosClase() {
      await this.axios
        .get("/catecumenos/listado/" + this.$route.params.claseId)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.catecumenosClase = response.data.data;
          console.log(this.catecumenoClase);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al encontrar catecumeno:", error);
        });
    },
    async getClase() {
      await this.axios
        .get("/clases/encontrar2/" + this.$route.params.claseId)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.clase = response.data.data;
          this.nombre = this.clase.nombre;
          this.temaClase = this.clase.tema;
          this.fechaHoraClase = this.clase.fecha_hora;
          console.log(this.clase);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al encontrar la clase:", error);
        });
    },

    actualizarAsistencia(id, asistencia) {
      this.axios
        .put("/catecumenos-clase/actualizar-asistencia", {
          id: id,
          asistencia_id: asistencia,
        })
        .then((response) => {
          // Manejar la respuesta exitosa
          console.log(
            "asistencia del catecumeno actualizada exitosamente ",
            response.data.data
          );
          this.getCatecumenosClase();
        })
        .catch((error) => {
          // Manejar errores
          console.error(
            "Error al actualizar la asistencia del catecumeno:",
            error
          );
        });
    },
    irAtras() {
      this.$router.go(-1);
    },
  },
};
</script>
<style>
.container {
  padding: 20px;
}
.table-responsive {
  margin-top: 20px;
}
.btn-attendance i {
  margin-right: 5px;
}
</style>