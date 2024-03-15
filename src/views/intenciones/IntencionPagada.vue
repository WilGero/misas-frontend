<template>
  <div class="container mt-5">
    <h3 class="fs-1 fw-bold text-success">
      Su Pago fue realalizado satisfactoriamente
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
    };
  },
  created(){
    this.actualizarEstadoPago();
  },
  methods: {
    async actualizarEstadoPago() {
      this.form = {
        id: this.$route.params.id,
        estado_pago: 1,
      };
      console.log(this.form);
      await this.axios
        .patch("/intenciones/actualizar-estado", this.form)
        .then((response) => {
          // Manejar la respuesta exitosa
          console.log("estado de pago actualizada exitosamente ", response.data.data);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al actualizar misa:", error);
        });
    },
    verDetalle(){
      this.$router.push({
        name:'detalleIntencion',
        params:{
          id:this.$route.params.id
        }
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