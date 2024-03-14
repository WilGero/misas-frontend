<template>
  <div class="container mt-5">
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <!-- Card 1 -->
      <div class="col" v-for="item in misas" :key="item.id_misa">
        <div class="card shadow h-100">
          <div class="card-body">
            <h5 class="card-title fw-bolder fs-4">{{ item.tipo_misa }}</h5>
            <p class="card-text">
              <span class="fw-bold">Fecha: </span
              >{{ formatearFecha(item.fecha) }}
            </p>
            <p class="card-text">
              <span class="fw-bold">Hora: </span>{{ formatearHora(item.fecha) }}
            </p>

            <button
              class="btn btn-primary"
              @click="agregarIntencion(item.id_misa)"
            >
              Agregar Intención
            </button>
          </div>
        </div>
      </div>
      <!-- Puedes agregar más cards según sea necesario -->
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      misas: [],
      mostrarAlerta: false,
      idMisa: null,
      tipoMisa: {},
      msgBoton: "Cancelar",
      fechaFormateada: "",
      horaFormateada: "",
      ultimaLista: { id: null },
    };
  },
  created() {
    this.getMisas();
  },
  methods: {
    formatearFecha(fechaHora) {
      return moment(fechaHora).locale("es").format("D, MMMM YYYY");
    },
    formatearHora(fechaHora) {
      return moment(fechaHora).format("h:mm a");
    },
    async getMisas() {
      await this.axios
        .get("/misas/listado")
        .then((response) => {
          // Manejar la respuesta exitosa
          this.misas = response.data.data;
          console.log(this.misas);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar misas:", error);
        });
    },
    async getTipoMisa(id) {
      await this.axios
        .get("/tiposmisa/encontrar/" + id)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.tipoMisa = response.data.data;
          console.log(this.tipoMisa);
          return this.tipoMisa.tipo_misa;
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar el usuario:", error);
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
    async agregarIntencion(id) {
      console.log(id);
      await this.agregarLista();
      setTimeout(() => {
        this.$router.push({
          name: "registrarIntencion",
          params: { misaId: id, listaId: this.ultimaLista.id },
        });
      }, 1000);
    },
  },
};
</script>