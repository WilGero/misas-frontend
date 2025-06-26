<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card bg-light">
          <div class="card-header">
            <h3 class="card-title">Nuevo Examen</h3>
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
                    <label for="tema">Título:</label>
                    <input
                      v-model="formulario.titulo"
                      type="text"
                      class="form-control"
                      id="tema"
                      placeholder="Ingrese el título del examen..."
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label for="fecha">Fecha:</label>
                    <input
                      v-model="formulario.fecha"
                      type="date"
                      class="form-control"
                      id="fecha"
                    />
                  </div>
                </div>
              </div>
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
              @click="nuevoExamen"
            >
              <i class="fas fa-save"></i> Guardar
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
export default {
  data() {
    return {
      formulario: {
        titulo: null,
        fecha: null,
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
    async nuevoExamen() {
      this.errores = [];
      this.formulario.catequesis_gestion_id =
        this.$route.params.catequesisGestionId;
      if (!this.formulario.titulo) {
        this.errores.push("Se requiere el título del examen");
      }

      if (!this.formulario.fecha) {
        this.errores.push("Se requiere la fecha del examen");
      }
      console.log(this.formulario);

      if (this.errores.length === 0) {
        try {
          const response = await this.axios.post(
            "/examenes/agregar",
            this.formulario
          );
          console.log("examen guardado exitosamente ", response.data.data);
          this.mostrarAlerta = true;
          this.msgBoton = "Cerrar formulario";

          this.formulario = {
            titulo: null,
            fecha: null,
            catequesis_gestion_id: null,
          };
        } catch (error) {
          console.error("Error al guardar el examen:", error);
        }
      } else {
        this.msgBoton = "Cancelar";
      }

      console.log(this.formulario);
      console.log(this.errores);
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
btn-close:hover {
  background-color: #dc3545;
}
</style>