<script> 
import MultasCatecumenos from '@/components/MultasCatecumenos.vue'; 
export default {
    components:{
        MultasCatecumenos
    },
    data() {
    return {
      balanceAsistencias: [],
      gastos: [
        {
          description: "Paquete de hojas boom tamaño carta",
          costo: 40,
        },
        {
          description: "Impresión de hojas",
          costo: 20,
        },
        {
          description: "25 rosarios",
          costo: 75,
        },
        {
          description: "25 folletos para rezar el rosario",
          costo: 60,
        },
      ],
    };
  },
  mounted() {
    this.getBalanceAsistencias();
  },
  computed: {
    totalGastos() {
      return this.gastos.reduce((total, item) => total + item.costo, 0);
    },
    totalRecaudado() {
      return this.balanceAsistencias.reduce(
        (total, item) => total + item.cant * item.multa,
        0
      );
    },
  },
  methods: {
    async getBalanceAsistencias() {
      try {
        const response = await this.axios.get("/asistencias/balance");
        this.balanceAsistencias = response.data.data;
        console.log(this.balanceAsistencias);
      } catch (error) {
        console.error("Error al listar:", error);
      }
    },
  },
};
</script>

<template>
  <div>
    <h2 class="text-uppercase text-light fw-bold">Balance General</h2>
    <div class="row">
      <!-- tabla de dinero recaudado-->
      <div class="col-12 col-lg-5 table-responsive">
        <table class="table table-hover table-bordered caption-top">
          <caption class="text-bg-dark bg-opacity-75 fw-bolder text-center">
            Dinero recaudado
          </caption>
          <thead class="table-secondary">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tipo de Asistencia</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Multa (Bs)</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in balanceAsistencias"
              :key="item.asistencia_id"
            >
              <th scope="row" class="table-secondary">{{ index + 1 }}</th>
              <td class="table-light">{{ item.tipo }}</td>
              <td class="table-light">{{ item.cant }}</td>
              <td class="table-light">{{ item.multa }}</td>
            </tr>
            <tr class="table-success">
              <th colspan="3" scope="row" class="text-end">Total recaudado:</th>
              <th>{{ totalRecaudado }} Bs</th>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- tabla de gastos -->
      <div class="col-12 col-lg-4 table-responsive">
        <table class="table table-hover table-bordered caption-top">
          <caption class="text-bg-dark bg-opacity-75 fw-bolder text-center">
            Gastos
          </caption>
          <thead class="table-secondary">
            <tr>
              <th>#</th>
              <th>Descripción</th>
              <th>Costo (Bs)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in gastos" :key="index">
              <th class="table-secondary">{{ index + 1 }}</th>
              <td>{{ item.description }}</td>
              <td>{{ item.costo }}</td>
            </tr>
            <tr class="table-danger">
              <th colspan="2" class="text-end">Total:</th>
              <th>{{ totalGastos }} Bs</th>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- tabla de Dinero sobrante -->
      <div class="col-12 col-lg-3 table-responsive">
        <table class="table table-hover table-bordered caption-top">
          <caption class="fw-bolder text-bg-dark bg-opacity-75 text-center">
            Dinero sobrante
          </caption>
          <thead class="table-secondary">
            <tr>
              <th>Dinero recaudado (Bs)</th>
              <th>Dinero gastado (Bs)</th>
              <th>Dinero sobrante (Bs)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {{ totalRecaudado }}
              </td>
              <td>
                {{ totalGastos }}
              </td>
              <th class="table-primary">
                {{ totalRecaudado - totalGastos }}
              </th>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-12 col-lg-10 mx-auto table-responsive">
            <MultasCatecumenos/>
      </div>
    </div>
  </div>
</template>
<style scoped>

</style>