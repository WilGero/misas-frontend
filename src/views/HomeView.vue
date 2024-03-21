<template>
  <div class="container mt-4">
    <h2 class="text-center mb-2 fs-1 fw-bolder">Misas Disponibles</h2>
    <!-- Alerta de inicio de sesión -->
    <div
      v-if="!auth"
      class="alert alert-warning alert-dismissible fade show alert-container mb-4"
      role="alert"
    >
      <strong>¡Aviso!</strong> Para agregar tu intención, primero debes iniciar
      sesión.
    </div>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <!-- Card 1 -->
      <div class="col" v-for="misa in misasDisponibles" :key="misa.id_misa">
        <div class="card shadow h-100">
          <div class="card-body">
            <h5 class="card-title fw-bolder fs-4">{{ misa.tipo_misa }}</h5>
            <p class="card-text">
              <span class="fw-bold">Fecha: </span
              >{{ formatearFecha(misa.fecha) }}
            </p>
            <p class="card-text">
              <span class="fw-bold">Hora: </span>{{ formatearHora(misa.fecha) }}
            </p>

            <button
              class="btn btn-primary"
              @click="agregarIntencion(misa.id_misa)"
              :disabled="!auth"
            >
              Agregar Intención
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";
export default {
  data() {
    return {
      misas: [],
      misasDisponibles: [],
      mostrarAlerta: false,
      idMisa: null,
      tipoMisa: {},
      msgBoton: "Cancelar",
      fechaFormateada: "",
      horaFormateada: "",
      ultimaLista: { id: null },
      fechaHoraActual: null,
    };
  },
  computed: {
    ...mapState(["auth"]),
  },
  created() {
    this.getMisas();
  },
  methods: {
    formatearFecha(fechaHora) {
      return moment(fechaHora).locale("es").format("D [de] MMMM YYYY");
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
          for (let i = 0; this.misas.length; i++) {
            let diferencia = this.calcularDiferenciaFechaHoraEnHoras(
              this.misas[i].fecha
            );
            console.log(diferencia);

            if (diferencia >= 1) {
              this.misasDisponibles.push(this.misas[i]);
            }
          }
          console.log(this.misasDisponibles);
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
    calcularDiferenciaFechaHoraEnHoras(fechaHora) {
      // Convertir la fecha y hora específica a un objeto Moment
      const fechaHoraMoment = moment(fechaHora); //fecha de momento objetivo

      // Obtener la fecha y hora actual
      const fechaHoraActual = moment(); //fecha de momento base

      // Calcular la diferencia en milisegundos entre las dos fechas y horas
      const diferenciaEnHoras = fechaHoraMoment.diff(fechaHoraActual, "hours");
      console.log(diferenciaEnHoras);
      return diferenciaEnHoras;
    },
  },
};
</script>
<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
}
.container {
  padding-top: 50px;
}
.misas-container {
  margin-top: 20px;
}
.misas-container .card {
  margin-bottom: 20px;
}
.card-body {
  background-color: #f8f9fa;
}
.alert-container {
  max-width: 400px;
  margin: 0 auto;
  margin-top: 50px;
}
</style>