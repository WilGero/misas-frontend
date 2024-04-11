<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6">
        <div class="card">
          <div
            class="card-header bg-primary text-white d-flex justify-content-between align-items-center"
          >
            Información del Catecúmeno
            <button
              type="button"
              @click="irAtras"
              class="btn-close"
              aria-label="Close"
            ></button>
          </div>
          <div class="card-body">
            <p><strong>Nombres:</strong> {{ catecumeno.nombres }}</p>
            <p><strong>Apellidos:</strong> {{ catecumeno.apellidos }}</p>
            <p><strong>CI:</strong> {{ catecumeno.ci }}</p>
            <p>
              <strong>Fecha de Nacimiento: </strong
              >{{
                formatDatetimeWithMonthInLetters(catecumeno.fecha_nacimiento)
              }}
            </p>
            <p><strong>Celular:</strong> {{ catecumeno.celular }}</p>
            <p>
              <strong>Celular del Padre/Madre:</strong>
              {{ catecumeno.celular2 }}
            </p>
            <p><strong>Dirección:</strong> {{ catecumeno.direccion }}</p>
            <p><strong>Padrinos:</strong> {{ catecumeno.padrinos }}</p>
          </div>
          <div class="card-footer d-flex justify-content-end">
            <button
              type="button"
              class="btn btn-danger me-2"
              data-bs-toggle="modal"
              data-bs-target="#mi-modal"
            >
              <i class="fas fa-trash-alt"></i> Eliminar
            </button>
            <router-link
              :to="{
                name: 'editarCatecumeno',
                params: { catecumenoId: $route.params.catecumenoId },
              }"
              type="button"
              class="btn btn-warning me-2"
            >
              <i class="fas fa-edit"></i> Editar
            </router-link>
            <button type="button" @click="irAtras" class="btn btn-secondary">
              <i class="fas fa-times"></i> Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal para eliminar catecumeno-->
    <div class="modal fade" id="mi-modal" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Alerta!!!</h3>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div
              v-if="mostrarAlerta"
              class="alert alert-danger alert-dismissible m-4"
            >
              <span>{{ mensaje }}</span>
            </div>
            <p class="fw-bold text-danger" v-else>
              ¿Esta seguro de eliminar el catecúmeno?
            </p>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary"
              @click="cerrarModal"
              data-bs-dismiss="modal"
            >
              {{ msgBtn }}</button
            ><button
              v-if="!mostrarAlerta"
              class="btn btn-danger"
              @click="eliminarCatecumeno"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      claseCatecumenos: [],
      catecumeno: {},
      mostrarAlerta: false,
      msgBtn: "Cancelar",
      mensaje: null,
    };
  },
  created() {
    this.getCatecumeno();
    this.getClaseCatecumenos();
  },
  methods: {
    async getClaseCatecumenos() {
      await this.axios
        .get("/clases/encontrar/" + this.$route.params.claseId)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.claseCatecumenos = response.data.data;
          console.log(this.claseCatecumenos);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al encontrar la clase:", error);
        });
    },

    async eliminarCatecumeno() {
      if (this.claseCatecumenos.lenght === 0) {
        try {
          await this.axios.delete(
            "/catecumenos/borrar/" + this.$route.params.catecumenoId
          );
          // Manejar la respuesta exitosa
          console.log("catecumeno eliminado con éxito");
          this.mostrarAlerta = true;
          this.msgBtn = "Cerrar";
          this.mensaje = "Catecumeno eliminado con éxito";
        } catch (error) {
          // Manejar errores
          console.error("Error al eliminar catecumeno:", error);
        }
      }else{
        this.mostrarAlerta = true;
        this.mensaje = "No se puede eliminar el catecumeno porque tiene asistencias";
      }
    },
    formatDatetimeWithMonthInLetters(datetime) {
      return moment(datetime).locale("es").format("D [de] MMMM [del] YYYY");
    },
    async getCatecumeno() {
      await this.axios
        .get("/catecumenos/encontrar/" + this.$route.params.catecumenoId)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.catecumeno = response.data.data;
          console.log(this.catecumeno);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al encontrar catecumeno:", error);
        });
    },
    irAtras() {
      this.$router.go(-1);
    },
    cerrarModal() {
      if (this.msgBtn === "Cerrar") {
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style>
.card-header .btn {
  color: #fff;
}
</style>