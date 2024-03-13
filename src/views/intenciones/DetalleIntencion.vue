<template>
  <div class="container mt-5">

    <div class="card w-50 m-auto">
      <div class="card-header">
        Detalle de Intención
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ intencion.tipo }}</h5>
        <p class="card-text">{{ intencion.descripcion }}</p>
      </div>
      <ul class="list-group list-group-flush text-start ">
        <li class="list-group-item px-4"><strong>Misa: </strong> {{intencion.tipo_misa}}</li>
        <li class="list-group-item px-4"><strong>Fecha: </strong> {{  formatearFecha(intencion.fecha) }}</li>
        <li class="list-group-item px-4"><strong>Hora: </strong> {{  formatearHora(intencion.fecha) }}</li>
        <li class="list-group-item px-4"><strong>Ofrecido por: </strong> {{ intencion.razon }}</li>
        <li class="list-group-item px-4"><strong>Costo: </strong> {{ intencion.costo }} Bs</li>
        <li class="list-group-item px-4"><strong>Estado: </strong> {{ intencion.estado_pago===1 ? 'Pagado':'No Pagado'}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  data() {
    return {
      intencion: {},
    };
  },
  created(){
    this.getIntencion();
  },
  methods: {
    formatearFecha(fechaHora) {
      return moment(fechaHora).locale("es").format("D, MMMM YYYY");
    },
    formatearHora(fechaHora) {
      return moment(fechaHora).format("h:mm a");
    },
    async getIntencion() {
      await this.axios
        .get("/intenciones/encontrar/" + this.$route.params.id)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.intencion = response.data.data;
          console.log(this.intencion);
          return this.intencion;
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar el usuario:", error);
        });
    },
  },
};
</script>

<style>
</style>