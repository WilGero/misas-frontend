<template>
  <div class="container">
    <div class="table-responsive">
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th colspan="4" class="bgr"><h2 class="fw-bold text-light">Asistencias</h2></th>
            <th class="bgr fs-3" colspan="3">{{ nombreCatecumeno }}</th>
          </tr>
          <tr>
            <th colspan="4" class="text-end fw-bold">Multa Total:</th>
            <th class="fw-bolder bg-warning fs-4">{{ multaTotal }} Bs</th>
            <th colspan="2"></th>
          </tr>
          <tr>
            <th>Nro</th>
            <th>Clases</th>
            <th>Fecha</th>
            <th>Asistencia</th>
            <!-- <th>CI</th> -->
            <th>Multa (Bs)</th>
            <th>Accion</th>
            <th>Estado Multa</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in asistencias" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.tema }}</td>
            <td>{{ formatDatetimeWithMonthInLetters(item.fecha_hora) }}</td>
            <td>{{ item.tipo }}</td>
            <td>{{ item.multa }}</td>
            <td>
              <!-- boton para pagar -->
              <button
                v-if="item.estado_multa === 0"
                @click="cambiarEstadoMulta(item.id, 1)"
                type="button"
                class="btn btn-success me-2"
                :class="{ disabled: item.multa === 0 }"
              >
                <i class="fas fa-dollar"></i> Pagar
              </button>
              <!-- boton para cancelar -->
              <button
                v-else
                @click="cambiarEstadoMulta(item.id, 0)"
                type="button"
                class="btn btn-warning me-2"
              >
                <i class="fas fa-close"></i>
              </button>
            </td>
            <td>
              {{
                item.estado_multa != 0
                  ? "Pagado"
                  : item.tipo === "Presente"
                  ? "No hay deuda"
                  : "Debe"
              }}
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
      asistencias: [],
      multaTotal: 0,
      nombreCatecumeno:null
    };
  },
  created() {
    this.getAsistencias();
  },
  methods: {
    formatDatetimeWithMonthInLetters(datetime) {
      return moment(datetime)
        .locale("es")
        .format("D [de] MMMM [del] YYYY, h:mm a");
    },
    async getAsistencias() {
      await this.axios
        .get("/catecumenos/asistencias/" + this.$route.params.catecumenoId)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.multaTotal = 0;
          this.asistencias = response.data.data;
          this.nombreCatecumeno=this.asistencias[0].nombres;
          console.log(this.asistencias);
          for (let i = 0; i < this.asistencias.length; i++) {
            if (this.asistencias[i].estado_multa === 0) {
              this.multaTotal = this.multaTotal + this.asistencias[i].multa;
            }
          }
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar asistencias:", error);
        });
    },
    cambiarEstadoMulta(id, estadoMulta) {
      this.axios
        .put("/catecumenos-clase/cambiar-estado-multa", {
          id: id,
          estado_multa: estadoMulta,
        })
        .then((response) => {
          // Manejar la respuesta exitosa
          console.log(
            "estado de la multa cambiada exitosamente ",
            response.data.data
          );
          this.getAsistencias();
        })
        .catch((error) => {
          // Manejar errores
          console.error(
            "Error al actualizar la asistencia del catecumeno:",
            error
          );
        });
    },
  },
};
</script>
<style scoped>
  .bgr{
    background:#2993D5
  }
</style>