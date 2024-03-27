<template>
  <div class="container mt-5">
    <div class="position-relative">
    <div class="position-absolute top-0 left-0">
        <button class="btn btn-secondary" @click="verIntencionesMisa">
          <i class="fas fa-arrow-left"></i> Ver Intenciones
        </button>
      </div>
    </div>
    <h3 class="fs-1 fw-bold t
    ext-success">
      Su Pago fue realizado satisfactoriamente
    </h3>
    <img
      class="rounded mx-auto d-block"
      src="../../assets/success.png"
    />
    <button class="btn btn-info" @click="verDetalle">Ver Detalle</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        id: null,
        estado_pago: 0,
      },
      intenciones: [],
      misaId:null
    };
  },
  created() {
    this.getIntenciones();
    this.actualizarEstadoPagoLista();
  },
  methods: {
    async getIntenciones() {
      await this.axios
        .get("/lista-intenciones/encontrar/" + this.$route.params.listaId)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.intenciones = response.data.data;
          console.log(this.intenciones);
          this.misaId=this.intenciones[0].misa_id;
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar las intenciones:", error);
        });
    },
    async actualizarEstadoPagoLista() {
      this.form = {
        id: this.$route.params.listaId,
        estado_pago: 1, //indica estado pagado
      };
      console.log(this.form);
      await this.axios
        .patch("/lista-intenciones/actualizar-estado", this.form)
        .then((response) => {
          // Manejar la respuesta exitosa
          console.log(
            "estado de pago de la lista actualizada exitosamente ",
            response.data.data
          );
          this.actualizarEstadoPagoIntencion();
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al actualizar estado:", error);
        });
    },
    async actualizarEstadoPagoIntencion() {
      this.form = {
        id: this.$route.params.listaId,
        estado_pago: 1, //indica estado pagado
      };
      for (var i = 0; i < this.intenciones.length; i++) {
        this.form = {
          id: this.intenciones[i].id,
          estado_pago: 1,
        };
        console.log(this.form);
        await this.axios
          .patch("/intenciones/actualizar-estado", this.form)
          .then((response) => {
            // Manejar la respuesta exitosa
            console.log(
              "estado de pago actualizada exitosamente ",
              response.data.data
            );
          })
          .catch((error) => {
            // Manejar errores
            console.error("Error al actualizar estado:", error);
          });
      }
    },
    verDetalle() {
      this.$router.push({
        name: "detalleIntencion",
        params: {
          listaId: this.$route.params.listaId,
        },
      });
    },
    verIntencionesMisa(){
      this.$router.push({
        name:'listadoIntencionesMisa',
        params:{misaId:this.misaId}
      })
    }
  },
};
</script>

<style scoped>
img {
  width: 350px;
  height: 300px;
}
</style>