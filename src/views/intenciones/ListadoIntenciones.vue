<template>
  <div class="container my-5">
    <h1 class="text-center my-5">Listado de Intenciones</h1>

    <!-- Lista de intenciones -->
    <div id="intenciones-lista" v-for="(item,index) in intenciones" :key="item.id">
      <!-- Ejemplo de una intención -->
      <div class="intencion-item" >
        <div class="row align-items-center" >
          <div class="col-md-2">
            <p>{{ index+1 }}</p>
          </div>
          <div class="col-md-4">
            <h4>Ofrece: {{ item.razon }}</h4>
            <p>{{ item.descripcion }}</p>
          </div>
          <div class="col-md-3">
            <p>Tipo: {{ item.tipo }}</p>
            <p>Costo: {{ item.costo }} Bs</p>
          </div>
          <div class="col-md-3 text-end">
            <button class="btn btn-danger">
              <i class="fas fa-trash"></i> Eliminar
            </button>
          </div>
        </div>
      </div>
      <!-- Fin del ejemplo -->
    </div>

    <!-- Botón para proceder al pago -->
    <div class="text-end mt-5">
      <button class="btn btn-primary btn-lg">
        <i class="fas fa-credit-card"></i> Pagar todas las intenciones
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      intenciones: [],
    };
  },
  created() {
    this.getIntenciones();
  },
  methods: {
    async getIntenciones() {
      await this.axios
        .get("/lista-intenciones/encontrar/" + this.$route.params.listaId)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.intenciones = response.data.data;
          console.log(this.intenciones);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar las intenciones:", error);
        });
    },
  },
};
</script>

<style scoped>
.intencion-item {
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 15px;
  background-color: #f8f9fa;
}
</style>