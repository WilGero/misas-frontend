<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-8">
        <div class="card">
          <div
            class="card-header bg-primary text-white d-flex justify-content-between align-items-center"
          >
            Información de la clase
            <button
              type="button"
              @click="irAtras"
              class="btn-close"
              aria-label="Close"
            ></button>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <p>
                  <strong>{{ nombre }}</strong>
                </p>
                <p><strong>tema:</strong> {{ tema }}</p>
                <p>
                  <strong>Fecha y hora: </strong
                  >{{ formatDatetimeWithMonthInLetters(fechaHora) }}
                </p>

                <p><strong>Descripcion:</strong> {{ descripcion }}</p>
                <p><strong>Observaciones:</strong> {{ observaciones }}</p>
              </div>
              <div class="col-md-6">
                <p>
                  <strong>Estadística de la clase</strong>
                </p>
                <span>Catecúmenos:</span>
                <p><strong>Presentes:</strong> {{ presentes }}</p>

                <p><strong>Atrasos:</strong> {{ atrasos }}</p>
                <p><strong>Permisos:</strong> {{ permisos }}</p>
                <p><strong>Faltas:</strong> {{ faltas }}</p>
              </div>
            </div>
          </div>
          <div class="card-footer d-flex justify-content-end">
            <router-link
              :to="{
                name: 'asistenciaClase',
                params: { claseId: $route.params.claseId },
              }"
              class="btn btn-info me-2"
              >Asistencia</router-link
            >
            <router-link
              :to="{
                name: 'editarClase',
                params: { catecumenoId: $route.params.claseId },
              }"
              type="button"
              class="btn btn-warning me-2"
            >
              <i class="fas fa-edit"></i> Editar </router-link
            ><button
              type="button"
              class="btn btn-danger me-2"
              data-bs-toggle="modal"
              data-bs-target="#mi-modal"
            >
              <i class="fas fa-trash-alt"></i> Eliminar
            </button>
            <button type="button" @click="irAtras" class="btn btn-secondary">
              <i class="fas fa-times"></i> Cancelar
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-6"></div>
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
              @click="eliminarClase"
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
      clase: {},
      mostrarAlerta: false,
      msgBtn: "Cancelar",
      mensaje: null,
      nombre: null,
      tema: null,
      fechaHora: null,
      descripcion: null,
      observaciones: null,
      presentes: 0,
      atrasos: 0,
      permisos: 0,
      faltas: 0,
    };
  },
  created() {
    this.getClaseCatecumenos();
    this.getClase();
  },
  methods: {
    async eliminarClase() {
      console.log(this.claseCatecumenos.length);
      if (this.claseCatecumenos.length === 0) {
        try {
          await this.axios.delete(
            "/clases/borrar/" + this.$route.params.claseId
          );
          // Manejar la respuesta exitosa
          console.log("clase eliminada con éxito");
          this.mostrarAlerta = true;
          this.msgBtn = "Cerrar";
          this.mensaje = "Clase eliminada con éxito";
        } catch (error) {
          // Manejar errores
          console.error("Error al eliminar clase:", error);
        }
      }else{
        this.mostrarAlerta=true;
        this.mensaje="No se puede eliminar la clase, porque contiene asistencias";
      }
    },
    formatDatetimeWithMonthInLetters(datetime) {
      return moment(datetime)
        .locale("es")
        .format("D [de] MMMM [del] YYYY, h:mm a");
    },
    async getClaseCatecumenos() {
      await this.axios
        .get("/clases/encontrar/" + this.$route.params.claseId)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.claseCatecumenos = response.data.data;

          for (let i = 0; i < this.claseCatecumenos.length; i++) {
            if (this.claseCatecumenos[i].asistencia_id === 1) {
              this.presentes += 1;
            } else if (this.claseCatecumenos[i].asistencia_id === 2) {
              this.atrasos += 1;
            } else if (this.claseCatecumenos[i].asistencia_id === 3) {
              this.permisos += 1;
            } else {
              this.faltas += 1;
            }
          }
          console.log(this.claseCatecumenos);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al encontrar la clase:", error);
        });
    },
    async getClase() {
      await this.axios
        .get("/clases/encontrar2/" + this.$route.params.claseId)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.clase = response.data.data;
          this.nombre = this.clase.nombre;
          this.tema = this.clase.tema;
          this.fechaHora = this.clase.fecha_hora;
          this.descripcion = this.clase.descripcion;
          this.observaciones = this.clase.observaciones;
          console.log(this.clase);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al encontrar la clase:", error);
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