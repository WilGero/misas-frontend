<template>
  <div class="container">
    <!-- <button @click="fCatecumenosNuevos">obtener catecuemnos nuevos</button>
    <p>{{ catecumenosNuevos }}</p> -->
    <div class="row justify-content-center mt-5">
      <div class="col-md-8">
        <div class="card opacity-75">
          <div class="card-header d-flex text-bg-dark align-items-center justify-content-between">
            <h3 class="card-title">Información de la sesión</h3>
            <btn-close/>
          </div>
          <div class="card-body">
            <div class="row justify-content-center text-start">
              <div class="col-md-5 ps-5 ps-md-0 my-md-auto">
                <p><strong>Tema:</strong> {{ tema }}</p>
                <p>
                  <strong>Fecha y hora: </strong
                  >{{ formatDatetimeWithMonthInLetters(fechaHora) }}
                </p>

                <p><strong>Descripcion:</strong> {{ descripcion }}</p>
                <p><strong>Observaciones:</strong> {{ observaciones }}</p>
              </div>
              <div class="col-md-5 ps-5">
                <h5 class="text-center">
                  <strong>Estadística de la clase</strong>
                </h5>
                <h6 class="text-center">Catecúmenos</h6>
                <p><strong>Presentes:</strong> {{ presentes }}</p>

                <p><strong>Atrasos:</strong> {{ atrasos }}</p>
                <p><strong>Permisos:</strong> {{ permisos }}</p>
                <p><strong>Faltas:</strong> {{ faltas }}</p>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="btn-group">
              <!-- <button class="btn btn-info" @click="irAsistencia">
                <i class="fas fa-calendar-check"></i>
              </button> -->
              <router-link
                :to="{
                  name: 'editarClase',
                  params: { catecumenoId: $route.params.claseId },
                }"
                type="button"
                class="btn btn-warning"
              >
                <i class="fas fa-edit"></i></router-link
              ><button
                type="button"
                class="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#mi-modal"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
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
              ¿Esta seguro de eliminar la clase?
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
import BtnClose from "@/components/BtnClose.vue";
export default {
  components:{BtnClose},
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
      catecumenosLength: null,
      claseCatecumenosLength: null,
      catecumenosNuevos: [],
    };
  },
  created() {
    this.getClaseCatecumenos();
    this.getCatecumenos();
    this.getClase();
  },
  methods: {
    // metodo para listar los catecumenos que asistieron a una clase
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
            } else if (this.claseCatecumenos[i].asistencia_id === 4) {
              this.faltas += 1;
            }
          }
          // this.claseCatecumenosLength = this.claseCatecumenos.length;
          console.log(this.claseCatecumenos);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al encontrar la clase:", error);
        });
    },
    async getCatecumenos() {
      await this.axios
        .get("/catecumenos/listado")
        .then((response) => {
          // Manejar la respuesta exitosa
          this.catecumenos = response.data.data;
          console.log(this.catecumenos);
          this.catecumenosLength = this.catecumenos.length;
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar catecumenos:", error);
        });
    },
    fCatecumenosNuevos() {
      this.catecumenosNuevos = this.catecumenos.filter(
        (estudiante) =>
          !this.claseCatecumenos.some((e) => e.catecumeno_id === estudiante.id)
      );
      // .concat(
      //   this.claseCatecumenos.filter(
      //     (estudiante) => !.some((e) => e.id === estudiante.id)
      //   )
      // );
      // for(let i=0;i<this.catecumenos.length;i++){
      //   this.catecumenosNuevos = this.catecumenos.filter(estudiante => estudiante.id === 27);
      // }
    },
    async agregarCatecumenoClase(formulario) {
      console.log("Este es el formulario para agregar", formulario);

      try {
        const response = await this.axios.post(
          "/catecumenos-clase/agregar",
          formulario
        );
        console.log("Asistencia registrada exitosamente", response.data.data);
      } catch (error) {
        console.error("Error al registrar la asistencia:", error);
      }
    },
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
      } else {
        this.mostrarAlerta = true;
        this.mensaje =
          "No se puede eliminar la clase, porque contiene asistencias";
      }
    },
    formatDatetimeWithMonthInLetters(datetime) {
      return moment(datetime)
        .locale("es")
        .format("D [de] MMMM [del] YYYY, h:mm a");
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
    irAsistencia() {
      console.log(this.claseCatecumenos.length);
      this.fCatecumenosNuevos();
      console.log(this.catecumenosNuevos);
      if (this.claseCatecumenos.length === 0) {
        console.log(this.catecumenos.length);
        for (let i = 0; i < this.catecumenos.length; i++) {
          this.formulario = {
            clase_id: this.$route.params.claseId,
            catecumeno_id: this.catecumenos[i].id,
          };
          this.agregarCatecumenoClase(this.formulario);
        }
      } else if (this.catecumenosNuevos.length > 0) {
        for (let i = 0; i < this.catecumenosNuevos.length; i++) {
          this.formulario = {
            clase_id: this.$route.params.claseId,
            catecumeno_id: this.catecumenosNuevos[i].id,
          };
          this.agregarCatecumenoClase(this.formulario);
        }
      }
      this.$router.push({
        name: "asistenciaClase",
        params: { claseId: this.$route.params.claseId },
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
.btn-close {
  background-color: #d4cece9e;
}
.btn-close:hover {
  background-color: #dc3545;
}
</style>