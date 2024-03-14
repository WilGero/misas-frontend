<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header bg-secondary text-white">
            <h4 class="mb-0">Registrar Intención para Misa</h4>
            <button
              data-bs-toggle="modal"
              data-bs-target="#mi-modal"
              class="btn btn-danger position-absolute end-0 top-0"
              @click="abrirModal"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="card-body bg-light">
            <form @submit.prevent="agregarIntencion">
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
                  data-bs-toggle="modal"
                  data-bs-target="#mi-modal"
                  type="submit"
                  class="btn btn-secondary me-2"
                  @click="abrirModal"
                >
                  Cancelar
                </button>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#mi-modal"
                  type="submit"
                  class="btn btn-success"
                >
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- modal para agregar mas intenciones-->
    <div class="modal fade" id="mi-modal" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h3
              v-if="mostrarAlerta2"
              class="modal-title fs-4 fw-bolder text-danger"
            >
              Alerta
            </h3>
            <button
              class="btn-close"
              data-bs-dismiss="modal"
              @click="cerrarModal"
            ></button>
          </div>
          <div class="modal-body">
            <div
              v-if="mostrarAlerta"
              class="alert alert-success alert-dismissible m-4"
            >
              <span>{{ mensaje }}</span>
            </div>
            <div
              v-else-if="mostrarAlerta2"
              class="alert alert-danger alert-dismissible m-4"
            >
              <span>{{ mensaje }}</span>
            </div>
            <div v-else class="alert alert-danger alert-dismissible m-4">
              <ul class="list-group" v-for="(error,index) in errores" :key="index">
                <li class="list-group-item text-danger">{{error}}</li>

              </ul>
            </div>
          </div>
          <div class="modal-footer">
            <div class="" v-if="mostrarAlerta">
              <button class="btn btn-success m-4" data-bs-dismiss="modal">
                Agregar otra intencion</button
              ><button
                class="btn btn-primary"
                data-bs-dismiss="modal"
                @click="irPago"
              >
                Pagar
              </button>
            </div>
            <div class="" v-else-if="mostrarAlerta2">
              <button
                class="btn btn-primary m-4"
                @click="cerrarFormulario"
                data-bs-dismiss="modal"
              >
                SI</button
              ><button
                class="btn btn-danger"
                data-bs-dismiss="modal"
                @click="cerrarModal"
              >
                NO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- boton de pago -->
    <div class="d-grid gap-2 col-6 mx-auto">
      <button class="btn btn-outline-primary mt-4" @click="irPago">
        Pagar intenciones
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      form: {
        razon: null,
        descripcion: null,
        misa_id: null,
        tipo_intencion_id: null,
        usuario_id: null,
        lista_id: null,
      },
      mensaje: "",
      tipoIntenSelec: null,
      mostrarAlerta: false,
      mostrarAlerta2: false,
      sesion: {},
      errores: [],
      error: null,
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

    async agregarIntencion() {
      if (this.tipoIntenSelec !== null) {
        this.form.tipo_intencion_id = this.tipoIntenSelec;
      }
      this.form.misa_id = this.$route.params.misaId;
      this.form.usuario_id = this.auth.data.id;
      this.form.lista_id = this.$route.params.listaId;
      // Validando los campos importantes
      if (this.form.razon === null) {
        this.error = "Se requiere la información de quien ofrece la intención";
        this.errores.push(this.error);
      }
      if (this.form.descripcion === null) {
        this.error = "Se requiere la descripción de la intención";
        this.errores.push(this.error);
      }
      if (this.form.tipo_intencion_id === null) {
        this.error = "Se require el tipo de intención";
        this.errores.push(this.error);
      }
      console.log(this.form);

      console.log(this.errores.length);
      if (this.errores.length === 0) {
        await this.axios
          .post("/intenciones/agregar", this.form)
          .then((response) => {
            // Manejar la respuesta exitosa
            console.log(
              "intencion registrada exitosamente ",
              response.data.data
            );
            this.mostrarAlerta = true;
            this.mensaje = "Intencion agregada satisfactoriamente";
            this.form = {
              razon: "",
              descripcion: "",
              misa_id: "",
              tipo_intencion_id: "",
              usuario_id: "",
              lista_id: "",
            };
            this.tipoIntenSelec = null;
          })
          .catch((error) => {
            // Manejar errores

            console.error("Error al registrar intencion:", error);
          });
      }
    },
    async crearSesionPago(id) {
      await this.axios
        .post("/pagos/create-checkout-session/" + id)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.sesion = response.data.data;
          console.log(this.sesion);
          window.location.href = this.sesion.url;
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al crear la sesion de pago:", error);
        });
    },
    irPago() {
      this.$router.push({
        name: "listadoIntenciones",
        params: {
          misaId: this.$route.params.misaId,
          listaId: this.$route.params.listaId,
        },
      });
    },
    abrirModal() {
      this.mostrarAlerta2 = true;
      this.mensaje =
        "¿Esta seguro de volver atrás?, no se guardo la información.";
    },
    cerrarFormulario() {
      this.$router.push({ name: "home" });
    },
    cerrarModal() {
      this.mostrarAlerta = false;
      this.mostrarAlerta2 = false;
      this.errores = [];
    },
    cerrarAlerta() {
      this.mostrarAlerta = false;
    },
  },
};
</script>

<style>
</style>