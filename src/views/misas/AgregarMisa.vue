<template>
  <!-- Alerta de registro exitoso -->
  <div v-if="mostrarAlerta" class="alert alert-success alert-dismissible m-4">
    <span>Misa registrada satisfactoriamente</span>
    <button class="btn-close" @click="cerrarAlerta"></button>
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
              <div class="mb-3">
                <label for="fecha" class="form-label">Fecha</label>
                <input
                  v-model="form.fecha"
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
import { mapState } from "vuex";
export default {
  data() {
    return {
      form: {
        tipo_misa_id: null,
        fecha: null,
        usuario_id: null,
      },
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
      if (this.tipoMisaSelec !== null) {
        this.form.tipo_misa_id = this.tipoMisaSelec;
      } else {
        this.form.tipo_misa_id = this.tiposMisa[1].id;
      }
      this.form.usuario_id = this.auth.data.id;
      console.log(this.form);
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