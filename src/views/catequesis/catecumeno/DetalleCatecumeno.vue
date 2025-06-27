<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6">
        <div class="card opacity-75">
          <div
            class="card-header d-flex text-bg-dark align-items-center justify-content-between"
          >
            <h3 class="card-title text-light">Detalles del Catecúmeno</h3>
            <btn-close />
          </div>
          <div class="card-body text-start p-4">
            <div class="d-md-flex">
              <div class="me-4">
                <p><strong>Nombres:</strong> {{ catecumeno.nombres }}</p>
                <p><strong>Apellidos:</strong> {{ catecumeno.apellidos }}</p>
                <p><strong>CI:</strong> {{ catecumeno.ci }}</p>
                <p>
                  <strong>Fecha de Nacimiento: </strong
                  >{{
                    formatDatetimeWithMonthInLetters(
                      catecumeno.fecha_nacimiento
                    )
                  }}
                </p>
                <p><strong>Celular:</strong> {{ catecumeno.celular }}</p>
                <p>
                  <strong>Celular del Padre/Madre:</strong>
                  {{ catecumeno.celular2 }}
                </p>
                <p><strong>Dirección:</strong> {{ catecumeno.direccion }}</p>
              </div>
              <div class="d-md-flex align-items-start">
                <div class="btn-group ms-2">
                  <button class="btn btn-dark disabled">
                    Máximo de permisos:
                  </button>
                  <input
                    class="btn btn-info"
                    type="button"
                    v-model="catecumeno.max_permiso"
                    disabled
                  />
                </div>
                <div class="text-center btn-group ms-2">
                  <button class="btn btn-dark disabled">
                    Aumentar permisos
                  </button>
                  <button
                    class="btn btn-outline-primary px-3"
                    data-bs-toggle="modal"
                    data-bs-target="#mi-modal2"
                    @click="reiniciarEstados"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
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
    <!-- modal para aumentar permisos-->
    <div class="modal fade" id="mi-modal2" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Alerta!!!</h3>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div
              v-if="mostrarAlerta"
              class="alert alert-success alert-dismissible m-4"
            >
              <span>{{ mensaje }}</span>
            </div>
            <p class="fw-bold text-warning fs-4" v-else>
              ¿Estas seguro de aumentar un permiso extra?
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
              class="btn btn-primary"
              @click="aumentarPermiso"
            >
              Aumentar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import BtnClose from "@/components/BtnClose.vue";
export default {
  components: {
    BtnClose,
  },
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
      } else {
        this.mostrarAlerta = true;
        this.mensaje =
          "No se puede eliminar el catecumeno porque tiene asistencias";
      }
    },
    async aumentarPermiso() {
      try {
        await this.axios.put("/catecumenos/aumentar-per", {
          id: this.$route.params.catecumenoId,
          max_permiso: this.catecumeno.max_permiso + 1,
        });
        // Manejar la respuesta exitosa
        console.log("permiso aumentado con éxito");
        this.mostrarAlerta = true;
        this.msgBtn = "Aceptar";
        this.mensaje = "Permiso Aumentado con éxito";
        this.getCatecumeno();
        // setTimeout(() => {

        //   }, 1500);
      } catch (error) {
        // Manejar errores
        console.error("Error al aumentar permiso:", error);
      }
    },
    reiniciarEstados() {
      this.mostrarAlerta = false;
      this.msgBtn = "Cancelar";
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
    cerrarModal() {
      if (this.msgBtn === "Cerrar") {
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style>
</style>