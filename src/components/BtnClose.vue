<template>
  <button
    type="button"
    @click="irAtras"
    class="btn-close"
    aria-label="Close"
  ></button>
</template>
<script>
export default {
  methods: {
    irAtras() {
      this.$router.go(-1);
    },
  },
};
</script>
<style>
.btn-close {
  background-color: #d4cece9e;
}
.btn-close:hover {
  background-color: #dc3545;
}
</style>