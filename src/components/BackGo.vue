<template>
  <!-- para el boton para ir atras -->
    <button class="btn btn-secondary" @click="irAtras">
      <i class="fas fa-arrow-left"></i>
      <span class="d-none d-md-block">Atrás</span>
    </button>
</template>
<script>
export default {
  methods: {
    irAtras(){
        this.$router.go(-1);
    }
  },
};
</script>