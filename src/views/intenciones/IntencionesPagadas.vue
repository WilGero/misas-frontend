<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Lista de Intenciones Pagadas</h2>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Nro</th>
            <th>Fecha de Pago</th>
            <th>Hora de pago</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <div v-if="activarMsg" class="col-md-6 m-auto">
            <p class="text-center">
              No se pago por ninguna intención, por favor agregue al menos una
              intención
            </p>
          </div>
          <tr v-for="(item, index) in listasIntencionesPagadas" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ formatearFecha(item.created_at) }}</td>
            <td>{{ formatearHora(item.created_at) }}</td>
            <td>
              <button class="btn btn-ver-detalle" @click="verDetalle(item.id)">
                Ver Detalle
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      listasIntenciones: [],
      listasIntencionesPagadas: [],
      activarMsg: false,
    };
  },
  created() {
    this.getListasIntenciones();
  },
  methods: {
    formatearFecha(fechaHora) {
      return moment(fechaHora).locale("es").format("D, MMMM YYYY");
    },
    formatearHora(fechaHora) {
      return moment(fechaHora).format("h:mm a");
    },
    async getListasIntenciones() {
      await this.axios
        .get("/lista-intenciones/listado")
        .then((response) => {
          // Manejar la respuesta exitosa
          this.listasIntenciones = response.data.data;
          console.log(this.listasIntenciones);
          for (let i = 0; i < this.listasIntenciones.length; i++) {
            if (this.listasIntenciones[i].estado_pago === 1) {
              this.listasIntencionesPagadas.unshift(this.listasIntenciones[i]);
            }
          }
          console.log(this.listasIntencionesPagadas);
          if (this.listasIntencionesPagadas.length === 0) {
            this.activarMsg = true;
          }
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar las intenciones:", error);
        });
    },
    verDetalle(listaId) {
      this.$router.push({
        name: "detalleIntencion",
        params: { listaId: listaId },
      });
    },
    
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
}
.container {
  padding-top: 50px;
}
.table-responsive {
  margin-top: 20px;
}
.btn-ver-detalle {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}
.btn-ver-detalle:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}
</style>