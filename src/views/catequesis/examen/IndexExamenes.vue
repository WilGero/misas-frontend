<template>
  <div class="container">
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
                  <button class="btn btn-warning">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-danger">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
  },
};
</script>