<template>
  <!-- Alerta de registro exitoso -->
  <div v-if="mostrarAlerta" class="alert alert-success alert-dismissible m-4">
    <span>Misa registrada satisfactoriamente</span>
    <button class="btn-close" @click="cerrarAlerta"></button>
  </div>
  <!-- Alerta error de formulario -->
  <div v-if="mostrarAlerta2" class="alert alert-danger alert-dismissible m-4">
    <ul class="error-list" v-for="(error, index) in errores" :key="index">
      <li class="error-list-item">{{ error }}</li>
    </ul>
  </div>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <!-- formulario de registro de usuarios -->
        <div class="card">
          <div class="card-header bg-secondary text-white">
            <h3 class="card-title">Agregar nueva misa</h3>
            <button
              class="btn btn-danger position-absolute end-0 top-0"
              @click="cerrarFormulario"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="card-body">
            <form @submit.prevent="agregarMisa">
              <div class="mb-3">
                <label for="tipoMisa" class="form-label">Tipo de Misa</label>
                <select
                  v-model="tipoMisaSelec"
                  id="tipoMisa"
                  class="form-select"
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
                  v-model="form.descripcion"
                  class="form-control"
                  id="descripcion"
                  rows="3"
                  placeholder="Ingrese la descripción de la misa"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="fecha" class="form-label">Fecha</label>
                <input
                  v-model="form.fecha"
                  type="datetime-local"
                  id="fecha"
                  class="form-control"
                />
              </div>
              <button
                type="submit"
                class="btn btn-secondary"
                @click="cerrarFormulario"
              >
                Cancelar
              </button>
              <button type="submit" class="btn btn-success">Guardar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
      form: {
        descripcion:null,
        tipo_misa_id: null,
        fecha: null,
        usuario_id: null,
      },
      tiposMisa: [],
      tipoMisaSelec: null,
      mostrarAlerta: false,
      mostrarAlerta2: false,
      errores: [],
      error: null,
    };
  },
  computed: {
    ...mapState(["auth"]),
  },
  created() {
    this.getTiposMisa();
  },
  methods: {
    async getTiposMisa() {
      await this.axios
        .get("/tiposmisa/listado")
        .then((response) => {
          // Manejar la respuesta exitosa
          this.tiposMisa = response.data.data;

          // Agregar la opción predeterminada "Seleccione un rol"
          this.tiposMisa.unshift({
            id: null,
            tipo_misa: "Seleccione un tipo de misa...",
          });
          console.log(this.tiposMisa);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar tipos de misa:", error);
        });
    },
    async agregarMisa() {
      this.errores=[];
      if (this.tipoMisaSelec !== null) {
        this.form.tipo_misa_id = this.tipoMisaSelec;
      }
      this.form.usuario_id = this.auth.data.id;
      console.log(this.form);
      if (this.form.tipo_misa_id === null) {
        this.error = "Se requiere de un tipo de misa";
        this.errores.push(this.error);
      }
      const dif = this.calcularDiferenciaFechaHoraEnHoras(this.form.fecha);
      if (this.form.fecha === null) {
        this.error = "Se requiere la fecha y hora de la misa";
        this.errores.push(this.error);
      } else if (dif < 2) {
        this.error = "Ingrese una fecha y hora mas actual";
        this.errores.push(this.error);
      }
      if (this.errores.length === 0) {
        await this.axios
          .post("/misas/agregar", this.form)
          .then((response) => {
            // Manejar la respuesta exitosa
            console.log("misa agregada exitosamente ", response.data.data);
            this.mostrarAlerta = true;
            setTimeout(() => {
              // Cambia "nombreDeLaRuta" con el nombre de la ruta a la que deseas redirigir
              this.mostrarAlerta = false;
            }, 1500); //
            this.form = {
              tipo_misa_id: null,
              fecha: null,
              usuario_id: null,
            };
            this.tipoMisaSelec = null;
          })
          .catch((error) => {
            // Manejar errores
            console.error("Error al agregar misa:", error);
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
  },
};
</script>

<style scoped>
.error-list {
  list-style: none;
  padding-left: 0;
}
.error-list-item {
  color: #dc3545;
  margin-bottom: 5px;
}
</style>