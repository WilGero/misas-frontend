<template>
  <div class="container mt-5">
    <!-- Alerta de registro exitoso -->
    <div v-if="mostrarAlerta" class="alert alert-success alert-dismissible m-4">
      <span class="fs-4 fw-bolder text-success"
        >Intención actualizada satisfactoriamente</span
      >
    </div>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div
            class="card-header d-flex justify-content-between align-items-center"
          >
            <h5 class="mb-0 fs-3">Editar Intención</h5>
            <span class="close-button fs-4 " @click="cancelarEdicion"
              ><i class="fas fa-times"></i
            ></span>
          </div>
          <div class="card-body">
            <form @submit.prevent="actualizarIntencion">
              <div class="mb-3">
                <label for="ofrece" class="form-label">Ofrece:</label>
                <input
                  v-model="intencion.razon"
                  type="text"
                  class="form-control"
                  id="ofrece"
                  placeholder="Introduce lo que ofrece la intención"
                />
              </div>
              <div class="mb-3">
                <label for="descripcion" class="form-label">Descripción:</label>
                <textarea
                  v-model="intencion.descripcion"
                  class="form-control"
                  id="descripcion"
                  rows="3"
                  placeholder="Introduce la descripción de la intención"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="tipoIntencion" class="form-label"
                  >Tipo de Intención</label
                >
                <select
                  v-model="seleccion"
                  class="form-select"
                  id="tipoIntencion"
                >
                  <option
                    v-for="item in tiposIntencion"
                    :key="item.id"
                    :value="item.id"
                  >
                    {{ item.tipo }} - {{ item.costo }} Bs
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <button
                  type="button"
                  class="btn btn-secondary me-2"
                  @click="cancelarEdicion"
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
export default {
  data() {
    return {
      intencion: {},
      tiposIntencion: [],
      seleccion: null, //para seleccionar un tipo de intencion con v-model
      form: {},
      mostrarAlerta: false,
    };
  },
  created() {
    this.getIntencion();
    this.getTiposIntencion();
  },
  methods: {
    async getIntencion() {
      await this.axios
        .get("/intenciones/encontrar/" + this.$route.params.intencionId)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.intencion = response.data.data;
          console.log(this.intencion);
          this.seleccion = this.intencion.tipo_intencion_id;
        })
        .catch((error) => {
          // Manejar errorestipo
          console.error("Error al encontrar la intención:", error);
        });
    },
    async getTiposIntencion() {
      await this.axios
        .get("/tiposintencion/listado")
        .then((response) => {
          // Manejar la respuesta exitosa
          this.tiposIntencion = response.data.data;
          console.log(this.tiposIntencion);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar tipos de misa:", error);
        });
    },
    async actualizarIntencion() {
      // asignacion de atributos para el formulario
      const { razon, descripcion, id } = this.intencion;
      Object.assign(this.form, {
        razon: razon,
        descripcion: descripcion,
        tipo_intencion_id: this.seleccion,
        id: id,
      });
      console.log(this.form);
      await this.axios
        .put("/intenciones/actualizar", this.form)
        .then((response) => {
          // Manejar la respuesta exitosa
          console.log(
            "intencion actualizada exitosamente ",
            response.data.data
          );
          this.mostrarAlerta = true;
          setTimeout(() => {
            // Cambia "nombreDeLaRuta" con el nombre de la ruta a la que deseas redirigir
            this.$router.go(-1);
          }, 1500); // 3000 milisegundos = 2 segundos
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al actualizar misa:", error);
        });
    },
    cancelarEdicion() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
/* Estilo personalizado */
.card-body {
  padding: 20px;
}
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
</style>