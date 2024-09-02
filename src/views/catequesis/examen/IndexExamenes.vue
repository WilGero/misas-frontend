<template>
  <div class="container">
  examenId: {{ examenId }}
    <div class="row">
      <div class="col">
        <h2 class="fs-1">Examenes</h2>
      </div>
      <div class="col">
        <router-link :to="{ name: 'nuevoExamen' }" class="btn btn-success">
          <i class="fas fa-plus"></i>
          Nuevo
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col table-responsive">
        <table class="table table-hover table-bordered">
          <thead class="table-light">
            <tr>
              <th>Nro</th>
              <th>Titulo</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in examenes" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>{{ item.titulo }}</td>
              <td>{{ formatearFecha(item.fecha) }}</td>
              <td>
                <div class="btn-group">
                  <button class="btn btn-primary">
                    <i class="fas fa-file-alt"></i>
                  </button>
                  <router-link
                    :to="{
                      name: 'editarExamen',
                      params: { examenId: item.id },
                    }"
                    class="btn btn-warning"
                  >
                    <i class="fas fa-edit"></i>
                  </router-link>
                  <button
                    class="btn btn-danger"
                    @click="guardarIdExamen(item.id)"
                    data-bs-toggle="modal"
                    data-bs-target="#mi-modal"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- modal para eliminar examen -->
        <div class="modal" id="mi-modal" data-bs-backdrop="static">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h3>Alerta!!!</h3>
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
                  ¿Esta seguro de eliminar el examen?
                </p>
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-secondary"
                  @click="cerrarModal"
                  data-bs-dismiss="modal"
                >
                  Cerrar</button
                ><button
                  v-if="!mostrarAlerta"
                  class="btn btn-danger"
                  @click="eliminarExamen"
                >
                  Eliminar
                </button>
              </div>
            </div>
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
      examenes: [],
      catecumenosExamen:[],
      mostrarAlerta: false,
      mensaje: null,
      examenId:null
    };
  },
  created() {
    this.getExamenes();
  },
  methods: {
    async getExamenes() {
      try {
        const response = await this.axios.get("/examenes/listado");
        this.examenes = response.data.data;
        console.log(this.examenes);
      } catch (error) {
        console.error("Error al listar examenes:", error);
      }
    },
    formatearFecha(fecha) {
      return moment(fecha).locale("es").format("D [de] MMMM [del] YYYY");
    },
    async getExamenCatecumenos() {
      try {
        const response = await this.axios.get(
          `/catecumenos-examen/encontrar/${this.examenId}`
        );
        this.catecumenosExamen = response.data.data;
        console.log(this.catecumenosExamen);
      } catch (error) {
        console.error("Error al encontrar catecumenos en el examen:", error);
      }
    },
    guardarIdExamen(idExamen){
      this.examenId=idExamen;
      setTimeout(() => {
          this.getExamenCatecumenos();
        }, 500);
      this.mostrarAlerta=false;
    },
    async eliminarExamen() {
      if (this.catecumenosExamen.length > 0) {
        this.mostrarAlerta = true;
        this.mensaje =
          "No se puede elimina el examen, porque contiene notas registradas";
        return;
      }

      try {
        await this.axios.delete(`/examenes/borrar/${this.examenId}`);
        console.log("Examen eliminada con éxito");

        this.mostrarAlerta = true;
        this.mensaje = "Examen eliminado con éxito";
      } catch (error) {
        console.error("Error al eliminar el examen:", error);
      }
    },
  },
};
</script>