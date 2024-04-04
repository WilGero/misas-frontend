<template>
  <div class="container mt-5">
    <section>
      <div
        v-if="mostrarAlerta"
        class="alert alert-success alert-dismissible m-4"
      >
        <span>Clase actualizada satisfactoriamente</span>
      </div>
      <div
        v-else-if="mostrarAlerta === false"
        class="alert alert-danger alert-dismissible m-4"
      >
        <ul class="error-list" v-for="(error, index) in errores" :key="index">
          <li class="error-list-item">{{ error }}</li>
        </ul>
      </div>
    </section>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card bg-light">
          <div class="card-header">
            <h3 class="card-title">Editar Clase</h3>
            <button
              class="btn-close"
              aria-label="Close"
              @click="irAtras"
            ></button>
          </div>
          <div class="card-body">
            <form>
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label for="tema">tema:</label>
                    <input
                      v-model="formulario.tema"
                      type="text"
                      class="form-control"
                      id="tema"
                      placeholder="Ingrese el nombre del tema..."
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label for="fecha-hora">Fecha y hora:</label>
                    <input
                    :value="fechaHora"
                      @input="formulario.fecha_hora=$event.target.value"
                      type="datetime-local"
                      class="form-control"
                      id="fecha-hora"
                    />
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  class="btn btn-light btn-sm"
                  @click="mostrarMasCampos"
                >
                  Mostrar más campos...
                </button>
              </div>
              <!-- Mostrar mas campos -->
              <section v-if="activeBoton">
                <div class="row">
                  <div class="col-12">
                    <div class="form-group">
                      <label for="descripcion">Descripción:</label>
                      <textarea
                        class="form-control"
                        v-model="formulario.descripcion"
                        name="descripcion"
                        id="descripcion"
                        cols="30"
                        rows="5"
                      ></textarea>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <label for="observaciones">Observaciones</label>
                      <textarea
                        class="form-control"
                        v-model="formulario.observaciones"
                        name="observaciones"
                        id="observaciones"
                        cols="30"
                        rows="5"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </section>
            </form>
          </div>
          <div class="card-footer text-center">
            <button class="btn btn-danger me-2" @click="irAtras">
              Cancelar
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              @click="actualizarClase"
            >
              Guardar
            </button>
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
      formulario: {},
      mostrarAlerta: null,
      errores: [],
      error: null,
      msgBoton: null,
      fechaHora: null,
      activeBoton:false
    };
  },
  computed: {
    ...mapState(["auth"]),
  },
  created() {
    this.getClase();
  },
  methods: {
    formatDateTime(datetime) {
      return moment(datetime).locale("es").format("YYYY-MM-DDTHH:MM");
    },
    async getClase() {
      await this.axios
        .get("/clases/encontrar/" + this.$route.params.claseId)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.formulario = response.data.data;
          console.log(this.formulario);
          this.fechaHora = this.formatDateTime(
            this.formulario.fecha_hora
          );
          console.log(this.fechaHora);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al encontrar la clase:", error);
        });
    },
    async actualizarClase() {
      this.errores = [];
      console.log(this.formulario);
      if (this.formulario.tema === (null || "")) {
        this.error = "Se requiere el tema de la clase...";
        this.errores.push(this.error);
      }
      if (this.formulario.fecha_hora === (null || "")) {
        this.error = "Se requiere la fecha y hora de la clase...";
        this.errores.push(this.error);
      }
      delete this.formulario.nombre;
      console.log(this.formulario);
      console.log(this.errores);
      if (this.errores.length === 0) {
        await this.axios
          .put("/clases/actualizar", this.formulario)
          .then((response) => {
            // Manejar la respuesta exitosa
            console.log(
              "clase actualizada exitosamente ",
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
            console.error("Error al actualizar la clase:", error);
          });
      } else {
        this.mostrarAlerta = false;
      }
    },
    irAtras() {
      this.$router.go(-1);
    },
    mostrarMasCampos(){
      this.activeBoton=!this.activeBoton;
    }
  },
};
</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-body {
  padding: 20px;
}
.form-group {
  margin-bottom: 20px;
}

.error-list {
  list-style: none;
  padding-left: 0;
}
.error-list-item {
  color: #dc3545;
  margin-bottom: 5px;
}
btn-close:hover {
  background-color: #dc3545;
}
</style>