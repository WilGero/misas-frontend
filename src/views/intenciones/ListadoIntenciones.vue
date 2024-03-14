<template>
  <div class="container my-5">
    <div class="position-relative">
      <div class="position-absolute top-0 left-0">
        <button class="btn btn-secondary" @click="irAtras">
          <i class="fas fa-arrow-left"></i> Volver Atrás
        </button>
      </div>
      <h1 class="text-center my-5">Listado de Intenciones</h1>
    </div>
    <!-- Lista de intenciones -->
    <div v-if="activarMsg" class="col-md-6 m-auto ">
      <p class="text-center">
        No se agrego ninguna intención, por favor agregue al menos una itención
      </p>
    </div>
    <div
      id="intenciones-lista"
      v-for="(item, index) in intenciones"
      :key="item.id"
    >
      <!-- Ejemplo de una intención -->
      <div class="intencion-item">
        <div class="row align-items-center">
          <div class="col-md-2">
            <p>{{ index + 1 }}</p>
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
    <div class="text-end mt-5" v-if="!activarMsg">
      <button  class="btn btn-primary btn-lg">
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
      activarMsg: false,
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

          if (this.intenciones.length === 0) {
            this.activarMsg = true;
          }
          console.log(this.intenciones);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar las intenciones:", error);
        });
    },
    irAtras() {
      this.$router.push({
        name: "registrarIntencion",
        params: {
          misaId: this.$route.params.misaId,
          listaId: this.$route.params.listaId,
        },
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