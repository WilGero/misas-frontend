<template>
  <!-- Alerta de registro exitoso -->
  <div v-if="mostrarAlerta" class="alert alert-success alert-dismissible m-4">
    <span>Misa actualizada satisfactoriamente</span>
    <button class="btn-close" @click="cerrarAlerta"></button>
  </div>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <!-- formulario de registro de usuarios -->
        <div class="card">
          <div class="card-header bg-secondary text-white">
            <h3 class="card-title">Editar misa</h3>
            <button
              class="btn btn-danger position-absolute end-0 top-0"
              @click="cerrarFormulario"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="card-body">
            <form @submit.prevent="actualizarMisa">
              <div class="mb-3 d-flex px-4">
                <label for="tipoMisa" class="form-label fw-bold w-50">Tipo de Misa:</label>
                <input
                  v-model="tipoMisa.tipo_misa"
                  id="tipoMisa"
                  class="form-control ms-0 w-50"
                  required
                  disabled
                />
              </div>
              <div class="mb-3 px-4">
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
              <div class="mb-3 d-flex px-4 justify-content-center ">
                <label for="fecha" class="form-label w-50 text-center"> <span class="fw-bold">Fecha: </span><span>{{formatDatetimeWithMonthInLetters(misa.fecha)}}</span></label>
              </div>
              <div class="mb-3 px-4">
                <label for="fecha" class="form-label fst-italic">Cambiar fecha:</label>
                <input
                  v-model="misa.fecha"
                  type="datetime-local"
                  id="fecha"
                  class="form-control"
                  required
                />
              </div>
              <button type="submit" class="btn btn-secondary" @click="cerrarFormulario">Cancelar</button>
              <button type="submit" class="btn btn-success">Guardar</button>
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
    formatDatetimeWithMonthInLetters(datetime) {
      return moment(datetime).locale('es').format('D, MMMM YYYY, h:mm a');
    },
    async getTiposMisa() {
      await this.axios
        .get("/tiposmisa/listado")
        .then((response) => {
          // Manejar la respuesta exitosa
          this.tiposMisa = response.data.data;    

          // Agregar la opción predeterminada "Seleccione un rol"
          this.tiposMisa.unshift({
            id: null,
            tipo_misa: "Seleccione otro tipo de misa...",
          });
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
      if (this.tipoMisaSelec !== null) {
        this.misa.tipo_misa_id = this.tipoMisaSelec;
      }
      this.misa.usuario_id=this.auth.data.usuario.id;
      console.log(this.misa);
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
          }, 2000); // 3000 milisegundos = 2 segundos
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al actualizar misa:", error);
        });
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