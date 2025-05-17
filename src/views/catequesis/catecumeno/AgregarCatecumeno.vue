<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card text-bg-secondary opacity-75 mb-3">
          <div class="card-header">
            <h3 class="card-title text-light">Registro de Catecumeno</h3>
            <button
              class="btn-close"
              aria-label="Close"
              @click="irAtras"
            ></button>
          </div>
          <div class="card-body text-bg-light">
            <form>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="nombres">Nombres</label>
                    <input
                      v-model="formulario.nombres"
                      type="text"
                      class="form-control"
                      id="nombres"
                      placeholder="Ingrese los nombres..."
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="apellidos">Apellidos</label>
                    <input
                      v-model="formulario.apellidos"
                      type="text"
                      class="form-control"
                      id="apellidos"
                      placeholder="Ingrese los apellidos..."
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="fecha-nacimiento">Fecha de Nacimiento</label>
                    <input
                      v-model="formulario.fecha_nacimiento"
                      type="date"
                      class="form-control"
                      id="fecha-nacimiento"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="celular">Celular</label>
                    <input
                      v-model="formulario.celular"
                      type="number"
                      class="form-control"
                      id="celular"
                      placeholder="Ingrese un numero de celular..."
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
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="ci">CI</label>
                      <input
                        v-model="formulario.ci"
                        type="text"
                        class="form-control"
                        id="ci"
                        placeholder="Ingrese el carnet de identidad..."
                      />
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="celular-padre">Celular del Padre/Madre</label>
                      <input
                        v-model="formulario.celular2"
                        type="text"
                        class="form-control"
                        id="celular-padre"
                        placeholder="Ingrese otro numero de celular..."
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="direccion">Dirección</label>
                  <input
                    v-model="formulario.direccion"
                    type="text"
                    class="form-control"
                    id="direccion"
                    placeholder="Ej: Urb. Bustillos, nro 15"
                  />
                </div>
              </section>
            </form>
          </div>
          <div class="card-footer text-bg-light text-center">
            <button class="btn btn-danger me-2" @click="irAtras">
              Cancelar
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#mi-modal"
              @click="agregarCatecumeno"
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
              <span>Catecumeno agregado satisfactoriamente</span>
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
export default {
  data() {
    return {
      formulario: {
        nombres: null,
        apellidos: null,
        ci: null,
        fecha_nacimiento: null,
        celular: null,
        celular2: null,
        direccion: null,
        usuario_id: null,
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
    async agregarCatecumeno() {
      this.errores = [];
      this.formulario.usuario_id = this.auth.data.id;
      this.formulario.catequesis_gestion_id = this.$route.params.catequesisGestionId;
      
      if (this.formulario.nombres === null) {
        this.error = "Se requiere el nombre del catecúmeno";
        this.errores.push(this.error);
      }
      if (this.formulario.apellidos === null) {
        this.error = "Se requiere el apellido del catecúmeno";
        this.errores.push(this.error);
      }
      // if (this.formulario.ci === (null||"")) {
      //   this.error = "Se requiere el carnet de indentidad del catecúmeno";
      //   this.errores.push(this.error);
      // }
      if (this.formulario.fecha_nacimiento === null) {
        this.error = "Se requiere la fecha de nacimiento del catecúmeno";
        this.errores.push(this.error);
      }
      // if (this.formulario.direccion === (null||"")) {
      //   this.error = "Se requiere la dirección de donde vive el catecúmeno";
      //   this.errores.push(this.error);
      // }
      console.log(this.formulario);
      console.log(this.errores);
      if (this.errores.length === 0) {
        await this.axios
          .post("/catecumenos/agregar", this.formulario)
          .then((response) => {
            // Manejar la respuesta exitosa
            console.log(
              "catecumeno agregado exitosamente ",
              response.data.data
            );
            this.mostrarAlerta = true;
            this.msgBoton = "Cerrar formulario";
            this.formulario = {
              nombres: null,
              apellidos: null,
              ci: null,
              fecha_nacimiento: null,
              celular: null,
              celular2: null,
              direccion: null,
              padrinos: null,
              usuario_id: null,
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