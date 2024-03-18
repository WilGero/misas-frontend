<template>
  <div class="container mt-5">
    <h3 class="fs-1 fw-bold text-success">
      Su Pago fue realizado satisfactoriamente
    </h3>
    <img
      class="rounded mx-auto d-block"
      src="../../assets/success.png"
      alt="success"
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
  },
};
</script>

<style scoped>
img {
  width: 350px;
  height: 300px;
}
</style>