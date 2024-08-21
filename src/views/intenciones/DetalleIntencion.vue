<template>
  <div class="container my-4 position-relative">
    <div class="position-absolute top-0 left-0">
      <button class="btn btn-secondary acciones" @click="irAtras">
        <i class="fas fa-arrow-left"></i> Atrás
      </button>
    </div>
    <div class="factura">
      <!-- Encabezado de la factura -->
      <div class="factura-header">
        <div>
          <h1 class="mt-5">Recibo</h1>
          <p class="fw-bold">{{ tipoMisa }}</p>
          <p class="fw-bold">Hora y Fecha: {{ formatearFecha(fechaMisa) }}, {{ formatearHora(fechaMisa)}}</p>
          <section class="text-start">
            <p>Nombre del Cliente:  {{ nombreCliente }}</p>
            <p>Fecha de pago:  {{ formatearFecha(fechaPago) }}</p>
            <p>Hora de pago:  {{ formatearHora(fechaPago) }}</p>
          </section>
        </div>
        <img
          src="../../assets/logo-parro.jpeg"
          alt="Logo Parroquia"
          class="logo-parroquia"
        />
      </div>
      <!-- Tabla de intenciones -->
      <table class="table intenciones-table">
        <thead>
          <tr>
            <th>Nro</th>
            <th>Ofrece</th>
            <th>Tipo de Intención</th>
            <th>Costo(Bs)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(intencion, index) in intenciones" :key="intencion.id">
            <td>{{ index + 1 }}</td>
            <td>{{ intencion.razon }}</td>
            <td>{{ intencion.tipo }}</td>
            <td>{{ intencion.costo }}</td>
          </tr>
          <tr class="total-row">
            <td colspan="2"></td>
            <td>Total</td>
            <td>{{ suma }} Bs</td>
          </tr>
        </tbody>
      </table>
      <!-- Acciones -->
      <div class="acciones btn-group">
        <!-- <button class="btn btn-danger">Exportar a PDF</button> -->
        <button class="btn btn-primary" @click="imprimirFactura">
          Imprimir
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      intenciones: [],
      suma: 0,
      nombreCliente: null,
      tipoMisa: null,
      fechaPago: null,
      fechaMisa:null
    };
  },
  created() {
    this.getIntenciones();
  },
  methods: {
    formatearFecha(fechaHora) {
      return moment(fechaHora).locale("es").format("D [de] MMMM YYYY");
    },
    formatearHora(fechaHora) {
      return moment(fechaHora).format("h:mm a");
    },
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
          for (let i = 0; i < this.intenciones.length; i++) {
            this.suma = this.suma + this.intenciones[i].costo;
          }
          this.nombreCliente = this.intenciones[0].nombre;
          this.tipoMisa = this.intenciones[0].tipo_misa;
          this.fechaPago = this.intenciones[0].created_at;
          this.fechaMisa = this.intenciones[0].fecha;

        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar las intenciones:", error);
        });
    },
    imprimirFactura() {
      // Lógica para imprimir factura
      window.print();
    },
    irAtras() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.factura {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
}
.factura-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.logo-parroquia {
  max-width: 200px;
  height: auto;
}
.intenciones-table {
  width: 100%;
  margin-bottom: 20px;
}
.intenciones-table th,
.intenciones-table td {
  padding: 8px;
  text-align: left;
}
.total-row {
  font-weight: bold;
}
.acciones {
  text-align: right;
}
@media print {
  .acciones {
    display: none;
  }
}
</style>