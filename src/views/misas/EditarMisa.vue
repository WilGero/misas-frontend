<template>
  <div class="container mt-5 py-4">
    <!-- Alerta de registro exitoso -->
    <div v-if="mostrarAlerta" class="alert alert-success alert-dismissible m-4">
      <span>Misa actualizada satisfactoriamente</span>
      <button class="btn-close" @click="cerrarAlerta"></button>
    </div>
    <!-- Alerta error de formulario -->
    <div v-if="mostrarAlerta2" class="alert alert-danger alert-dismissible m-4">
      <ul class="error-list" v-for="(error, index) in errores" :key="index">
        <li class="error-list-item">{{ error }}</li>
      </ul>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div
            class="card-header d-flex justify-content-between align-items-center"
          >
            <h5 class="mb-0 fs-3">Editar Misa</h5>
            <span class="close-button fs-4" @click="cerrarFormulario"
              ><i class="fas fa-times"></i
            ></span>
          </div>
          <div class="card-body">
            <form @submit.prevent="actualizarMisa">
              <div class="mb-3">
                <label for="tipoMisa" class="form-label">Tipo de misa:</label>
                <select
                  v-model="tipoMisaSelec"
                  id="tipoMisa"
                  class="form-select"
                  required
                >
                  <option
                    v-for="item in tiposMisa"
                    :key="item.id"
                    :value="item.id"
                  >
                    {{ item.tipo_misa }}
                  </option>
                </select>
              </div>
              <!-- Descripcion -->
              <div class="mb-3">
                <label for="descripcion" class="form-label">Descripción:</label>
                <textarea
                  v-model="misa.descripcion"
                  class="form-control"
                  id="descripcion"
                  rows="3"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="fecha" class="form-label">Fecha y hora: </label>
                <input
                  :value="fechaHora"
                  @input="misa.fecha = $event.target.value"
                  type="datetime-local"
                  id="fecha"
                  class="form-control"
                />
              </div>
              <div class="mb-3">
                <button
                  type="button"
                  class="btn btn-secondary me-2"
                  @click="cerrarFormulario"
                >
                  Cancelar
                </button>
                <button type="submit" class="btn btn-primary">
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";
export default {
  data() {
    return {
      misa: {},
      tipoMisa: {},
      tiposMisa: [],
      tipoMisaSelec: null,
      mostrarAlerta: false,
      mostrarAlerta2: false,
      fechaHora: null,
    };
  },
  computed: {
    ...mapState(["auth"]),
  },
  created() {
    this.getTiposMisa();
    this.getMisa();
  },
  methods: {
    calcularDiferenciaFechaHoraEnHoras(fechaHora) {
      // Convertir la fecha y hora específica a un objeto Moment
      const fechaHoraMoment = moment(fechaHora); //fecha de momento objetivo

      // Obtener la fecha y hora actual
      const fechaHoraActual = moment(); //fecha de momento base

      // Calcular la diferencia en milisegundos entre las dos fechas y horas
      const diferenciaEnHoras = fechaHoraMoment.diff(fechaHoraActual, "hours");
      console.log(diferenciaEnHoras);
      return diferenciaEnHoras;
    },
    formatDateTime(datetime) {
      return moment(datetime).format("YYYY-MM-DDTHH:MM");
    },
    formatDatetimeWithMonthInLetters(datetime) {
      return moment(datetime).locale("es").format("D, MMMM YYYY, h:mm a");
    },
    async getTiposMisa() {
      await this.axios
        .get("/tiposmisa/listado")
        .then((response) => {
          // Manejar la respuesta exitosa
          this.tiposMisa = response.data.data;

          // Agregar la opción predeterminada "Seleccione un rol"

          console.log(this.tiposMisa);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar tipos de misa:", error);
        });
    },
    async getMisa() {
      await this.axios
        .get("/misas/encontrar/" + this.$route.params.id)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.misa = response.data.data;
          console.log(this.misa);
          this.tipoMisaSelec = this.misa.tipo_misa_id;
          console.log(this.misa.fecha);
          this.fechaHora = this.formatDateTime(this.misa.fecha);
          console.log(this.fechaHora);
          this.getTipoMisa();
        })
        .catch((error) => {
          // Manejar errorestipo
          console.error("Error al listar misa:", error);
        });
    },
    async getTipoMisa() {
      console.log(this.misa.tipo_misa_id);
      await this.axios
        .get("/tiposmisa/encontrar/" + this.misa.tipo_misa_id)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.tipoMisa = response.data.data;
          console.log(this.tipoMisa);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar tipo de misa:", error);
        });
    },
    async actualizarMisa() {
      this.errores = [];
      if (this.tipoMisaSelec !== null) {
        this.misa.tipo_misa_id = this.tipoMisaSelec;
      }0
      this.misa.usuario_id = this.auth.data.id;
      console.log(this.form);
      if (this.misa.tipo_misa_id === null) {
        this.error = "Se requiere de un tipo de misa";
        this.errores.push(this.error);
      }
      const dif = this.calcularDiferenciaFechaHoraEnHoras(this.misa.fecha);
      if (this.misa.fecha === null) {
        this.error = "Se requiere la fecha y hora de la misa";
        this.errores.push(this.error);
      } else if (dif < 2) {
        this.error = "Ingrese una fecha y hora mas actual";
        this.errores.push(this.error);
      }
      if (this.errores.length === 0) {
        await this.axios
          .put("/misas/actualizar", this.misa)
          .then((response) => {
            // Manejar la respuesta exitosa
            console.log("misa actualizada exitosamente ", response.data.data);
            this.mostrarAlerta = true;
            setTimeout(() => {
              // Cambia "nombreDeLaRuta" con el nombre de la ruta a la que deseas redirigir
              this.$router.push({
                name: "misas",
              });
            }, 1500); // 3000 milisegundos = 2 segundos
          })
          .catch((error) => {
            // Manejar errores
            console.error("Error al actualizar misa:", error);
          });
      } else {
        this.mostrarAlerta2 = true;
        setTimeout(() => {
          // Cambia "nombreDeLaRuta" con el nombre de la ruta a la que deseas redirigir
          this.mostrarAlerta2 = false;
        }, 1500); //
      }
    },
    cerrarFormulario() {
      this.$router.push({ name: "misas" });
    },
    cerrarAlerta() {
      this.mostrarAlerta = false;
    },
  },
};
</script>

<style>
</style>