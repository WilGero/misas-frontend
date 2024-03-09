<template>
  <div class="container mt-5">
    <!-- Alerta de registro exitoso -->
    <div v-if="mostrarAlerta" class="alert alert-success alert-dismissible m-4">
      <span>Intencion registrada satisfactoriamente</span>
      <button class="btn-close" @click="cerrarAlerta"></button>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header bg-secondary text-white">
            <h4 class="mb-0">Registrar Intención para Misa</h4>
            <button
              class="btn btn-danger position-absolute end-0 top-0"
              @click="cerrarFormulario"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="card-body bg-light">
            <form @submit.prevent="registrarIntencion">
              <!-- Quien ofrece la intencion -->
              <div class="mb-3">
                <label for="ofrecidaPor" class="form-label"
                  >Ofrecida por:</label
                >
                <input
                  v-model="form.razon"
                  type="text"
                  class="form-control"
                  id="ofrecidaPor"
                  required
                />
              </div>

              <!-- Descripcion -->
              <div class="mb-3">
                <label for="descripcion" class="form-label">Descripción:</label>
                <textarea
                  v-model="form.descripcion"
                  class="form-control"
                  id="descripcion"
                  rows="3"
                  required
                ></textarea>
              </div>

              <!-- Tipo de Intencion -->
              <div class="mb-3">
                <label for="tipoIntencion" class="form-label"
                  >Tipo de Intención:</label
                >
                <select
                  v-model="tipoIntenSelec"
                  id="tipoIntencion"
                  class="form-select"
                  required
                >
                  <option
                    v-for="item in tiposIntencion"
                    :key="item.id"
                    :value="item.id"
                  >
                    {{ item.tipo }} - costo: {{ item.costo }} Bs
                  </option>
                </select>
              </div>

              <!-- Botón de Enviar -->
              <div class="mb-3 text-end">
                <button
                  type="submit"
                  class="btn btn-secondary me-2"
                  @click="cerrarFormulario"
                >
                  Cancelar
                </button>
                <button type="submit" class="btn btn-primary">
                  Registrar Intención
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
import { mapState } from "vuex";
export default {
  data: function () {
    return {
      tiposIntencion: [],
      form: {
        razon: "",
        descripcion: "",
        misa_id: "",
        tipo_intencion_id: "",
        usuario_id: "",
      },
      tipoIntenSelec: null,
      mostrarAlerta:false
    };
  },
  computed: {
    ...mapState(["auth"]),
  },
  created() {
    this.getTiposIntencion();
  },
  methods: {
    async getTiposIntencion() {
      await this.axios
        .get("/tiposintencion/listado")
        .then((response) => {
          // Manejar la respuesta exitosa
          this.tiposIntencion = response.data.data;

          // Agregar la opción predeterminada "Seleccione un rol"
          this.tiposIntencion.unshift({
            id: null,
            tipo: "Seleccione un tipo de intención...",
          });
          console.log(this.tiposIntencion);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar tipos de intencion:", error);
        });
    },
    async registrarIntencion() {
      if (this.tipoIntenSelec !== null) {
        this.form.tipo_intencion_id = this.tipoIntenSelec;
      } else {
        this.form.tipo_intencion_id = this.tiposIntencion[1].id;
      }
      this.form.misa_id = this.$route.params.misaId;
      this.form.usuario_id = this.auth.data.id;
      console.log(this.form);
      await this.axios
        .post("/intenciones/agregar", this.form)
        .then((response) => {
          // Manejar la respuesta exitosa
          console.log("intencion registrada exitosamente ", response.data.data);
          this.mostrarAlerta = true;
          setTimeout(() => {
            // Cambia "nombreDeLaRuta" con el nombre de la ruta a la que deseas redirigir
            this.mostrarAlerta = false;
          }, 1500); //
          this.form = {
            razon: "",
            descripcion: "",
            misa_id: "",
            tipo_intencion_id: "",
            usuario_id: "",
          };
          this.tipoIntenSelec = null;
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al registrar intencion:", error);
        });
    },
    cerrarFormulario() {
      this.$router.push({ name: "home" });
    },
    cerrarAlerta() {
      this.mostrarAlerta = false;
    },
  },
};
</script>

<style>
</style>