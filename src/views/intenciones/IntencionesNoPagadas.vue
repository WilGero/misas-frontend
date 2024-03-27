<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-12 d-flex justify-content-end">
        <router-link
          class="btn btn-success btn-sm"
          :to="{ name: 'intencionesPagadas' }"
        >
          Ver Intenciones pagadas
        </router-link>
      </div>
      <div class="col-12">
        <h2 class="text-center mb-4">Lista de Intenciones No Pagadas</h2>
      </div>
    </div>
    <div v-if="activarMsg" class="col-md-6 m-auto">
            <p class="text-center">
              No se registro ninguna intención, por favor agregue al menos una
              intención
            </p>
          </div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Nro</th>
            <th>Fecha de Pago</th>
            <th>Hora de pago</th>
            <th>Misa</th>
            <th>Fecha de misa</th>
            <th>Hora de misa</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
      
          <tr
            v-for="(item, index) in listasIntencionesNoPagadas"
            :key="item.id"
          >
            <th>{{ index + 1 }}</th>
            <td>{{ formatearFecha(item.created_at) }}</td>
            <td>{{ formatearHora(item.created_at) }}</td>
            <td>{{ item.tipo_misa }}</td>
            <td>{{ formatearFecha(item.fecha) }}</td>
            <td>{{ formatearHora(item.fecha) }}</td>
            <td>
              <router-link class="btn btn-ver-detalle" :to="{name:'listadoIntenciones',params:{misaId:item.misa_id,listaId:item.id}}">
                Pagar
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";
export default {
  data() {
    return {
      listasIntenciones: [],
      listasIntencionesNoPagadas: [],
      activarMsg: false,
    };
  },
  computed:{
    ...mapState(['auth'])
  },
  created() {
    this.getListasIntenciones();
  },
  methods: {
    formatearFecha(fechaHora) {
      return moment(fechaHora).locale("es").format("D [de] MMMM YYYY");
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
            if (
              this.listasIntenciones[i].estado_pago === 0 &&
              this.listasIntenciones[i].estado_misa === 1 &&
              this.listasIntenciones[i].usuario_id === this.auth.data.id
            ) {
              this.listasIntencionesNoPagadas.unshift(
                this.listasIntenciones[i]
              );
            }
          }
          console.log(this.listasIntencionesNoPagadas);
          if (this.listasIntencionesNoPagadas.length === 0) {
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