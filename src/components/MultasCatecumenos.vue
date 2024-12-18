<script>
export default {
    data() {
    return {
      catecumenosMultas: [],
    };
  },
  mounted() {
    this.getCatecumenosMultas();
  },
  computed: {
    total() {
      return this.catecumenosMultas.reduce(
        (total, item) => total + item.dinero_pagado,
        0
      );
    },
  },
  methods: {
    async getCatecumenosMultas() {
      try {
        const response = await this.axios.get("/asistencias/multa-pagada-catecumenos");
        this.catecumenosMultas = response.data.data;
        console.log(this.catecumenosMultas);
      } catch (error) {
        console.error("Error al listar:", error);
      }
    },
  },
};
</script>
<template>
    <table class="table table-hover table-bordered caption-top">
        <caption class="text-bg-dark text-center fw-bold bg-opacity-75">Multa pagada por los Catecumenos</caption>
    <thead class="table-secondary">
        <tr>
            <th>#</th>
            <th>Apellidos</th>
            <th>Nombres</th>
            <th>Multa pagada (Bs)</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(item,index) in catecumenosMultas" :key="item.catecumeno_id">
            <th class="table-secondary">{{ index+1 }}</th>
            <td>{{ item.apellidos }}</td>
            <td>{{ item.nombres }}</td>
            <td>{{ item.dinero_pagado }}</td>
        </tr>
        <tr class="table-info">
            <th colspan="3" class="text-end">Total:</th>
            <th>{{ total }}</th>
        </tr>
    </tbody>
    </table>
</template>