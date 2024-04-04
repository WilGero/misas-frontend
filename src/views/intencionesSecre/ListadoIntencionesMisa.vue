<template>
  <!-- Cabecera con información de la misa -->
  <div class="container">
    <div class="position-relative">
      <div class="position-absolute top-0 left-0">
        <button class="btn btn-secondary" @click="irAtras">
          <i class="fas fa-arrow-left"></i> Volver Atrás
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col col-md-7">
        <h1>{{ tipoMisa }}</h1>
        <p>
          <span class="fw-bold">Fecha y Hora: </span>
          {{ formatDatetimeWithMonthInLetters(fechaHoraMisa) }}
        </p>
      </div>
      <div class="col col-md-3">
        <img
          src="../../assets/logo-parro.jpeg"
          alt="Logo Parroquia"
          class="logo-parroquia"
        />
      </div>
      <div class="col col-md-2 text-end">
        <div class="btn-group">
          <button class="btn btn-primary boton-imprimir" @click="imprimir">
            Imprimir
          </button>
          <button class="btn btn-success btn-sm boton-imprimir" @click="agregarIntencion">
            Agregar intención
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Lista de intenciones -->
  <div class="container mt-4">
    <h2>Intenciones</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Nro</th>
          <th scope="col">Descripción</th>
          <th scope="col">Ofrece</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in intencionesMisa" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.descripcion }}</td>
          <td>{{ item.razon }}</td>
        </tr>
        <tr v-if="mensaje">

          <td colspan="3" class="fs-3"> {{ mensaje }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      intencionesMisa: [],
      misa:{},
      respuesta: [],
      tipoMisa: null,
      fechaHoraMisa: null,
      mensaje:null
    };
  },
  created() {
    this.getMisa();
    this.getIntencionesMisa();
  },
  methods: {
    formatDatetimeWithMonthInLetters(datetime) {
      return moment(datetime).locale("es").format("D [de] MMMM YYYY, h:mm a");
    },
    async getMisa() {
      await this.axios
        .get("/misas/encontrar/" + this.$route.params.misaId)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.misa = response.data.data;
          this.tipoMisa = this.misa.tipo_misa;
          this.fechaHoraMisa = this.misa.fecha;
          console.log(this.misa);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al encontrar misa:", error);
        });
    },
    async getIntencionesMisa() {
      await this.axios
        .get("/misas/encontrar-intenciones/" + this.$route.params.misaId)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.respuesta = response.data.data;
          console.log(this.respuesta);
          for (let i = 0; this.respuesta.length; i++) {
            if (this.respuesta[i].estado === 1) {
              this.intencionesMisa.push(this.respuesta[i]);
            }
          }
          if(this.intencionesMisa.length===0){
            this.mensaje='No se registro ninguna intención'
          }
          console.log(this.intencionesMisa);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar misas:", error);
        });
    },
    async agregarLista() {
      await this.axios
        .post("/lista-intenciones/agregar")
        .then((response) => {
          // Manejar la respuesta exitosa
          console.log("lista agregado exitosamente ", response.data.data);
          this.getUltimaLista();
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al agregar la lista:", error);
        });
    },
    async getUltimaLista() {
      await this.axios
        .get("/lista-intenciones/listar-ultimo")
        .then((response) => {
          // Manejar la respuesta exitosa
          this.ultimaLista = response.data.data;
          console.log(this.ultimaLista);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar:", error);
        });
    },
    async agregarIntencion(){
      await this.agregarLista();
      setTimeout(() => {
        this.$router.push({
          name: "registrarIntencion",
          params: { misaId: this.$route.params.misaId, listaId: this.ultimaLista.id },
        });
      }, 1000);
    },
    imprimir() {
      // Lógica para imprimir factura
      window.print();
    },
    irAtras(){
      this.$router.push({name:'misas'});
    }
  },
};
</script>

<style scoped>
.logo-parroquia {
  max-width: 200px;
  height: auto;
}
@media print {
  .boton-imprimir {
    display: none !important; /* Ocultar el botón de impresión durante la impresión */
  }
}
</style>