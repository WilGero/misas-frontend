<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card opacity-75">
          <div class="card-header text-bg-secondary">
            <h3 class="card-title">Registro de la clase</h3>
            <button
              class="btn-close"
              aria-label="Close"
              @click="irAtras"
            ></button>
          </div>
          <div class="card-body text-bg-light">
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
                      v-model="formulario.fecha_hora"
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
                        placeholder="Ingrese una descripción..."
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
                        placeholder="Ingrese alguna observación/observaciones..."
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
              data-bs-toggle="modal"
              data-bs-target="#mi-modal"
              @click="agregarClase"
            >
              Registrar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal para agregar catecumeno-->
    <div class="modal fade" id="mi-modal" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Mensaje</h3>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div
              v-if="mostrarAlerta"
              class="alert alert-success alert-dismissible m-4"
            >
              <span>clase agregado satisfactoriamente</span>
            </div>
            <div v-else class="alert alert-danger alert-dismissible m-4">
              <ul
                class="error-list"
                v-for="(error, index) in errores"
                :key="index"
              >
                <li class="error-list-item">{{ error }}</li>
              </ul>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="irAtras"
            >
              {{ msgBoton }}</button
            ><button
              v-if="mostrarAlerta"
              class="btn btn-success"
              data-bs-dismiss="modal"
              @click="msgBotonNull"
            >
              Agregar más
            </button>
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
      formulario: {
        tema: null,
        fecha_hora: null,
        descripcion: null,
        observaciones: null,
        catequesis_gestion_id: null,
      },
      mostrarAlerta: false,
      errores: [],
      error: null,
      msgBoton: null,
      activeBoton: false,
    };
  },
  computed: {
    ...mapState(["auth"]),
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
    async agregarClase() {
      this.errores = [];
      this.formulario.catequesis_gestion_id = this.$route.params.catequesisGestionId;
      console.log(this.formulario);
      if (this.formulario.tema ===null) {
        this.error = "Se requiere el nombre del tema";
        this.errores.push(this.error);
      }
      const dif = this.calcularDiferenciaFechaHoraEnHoras(this.formulario.fecha_hora);
      if (this.formulario.fecha_hora === null) {
        this.error = "Se requiere la fecha y hora de la clase";
        this.errores.push(this.error);
      }else if (dif < 2) {
        this.error = "Ingrese una fecha y hora mas actual";
        this.errores.push(this.error);
      }
      console.log(this.formulario);
      console.log(this.errores);
      if (this.errores.length === 0) {
        await this.axios
          .post("/clases/agregar", this.formulario)
          .then((response) => {
            // Manejar la respuesta exitosa
            console.log("clase agregada exitosamente ", response.data.data);
            this.mostrarAlerta = true;
            this.msgBoton = "Cerrar formulario";
            this.formulario = {
              tema: null,
              fecha_hora: null,
              descripcion: null,
              observaciones: null,
              catequesis_gestion_id: null,
            };
          })
          .catch((error) => {
            // Manejar errores
            console.error("Error al agregar catecumeno:", error);
          });
      } else {
        this.msgBoton = "Cancelar";
      }
    },
    irAtras() {
      if (this.mostrarAlerta || !this.msgBoton) {
        this.$router.go(-1);
      }
      this.msgBoton = null;
    },
    msgBotonNull() {
      this.msgBoton = null;
    },
    mostrarMasCampos() {
      this.activeBoton = !this.activeBoton;
    },
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
.btn-close:hover {
  background-color: #dc3545;
}
</style>