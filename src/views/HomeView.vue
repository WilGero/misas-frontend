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
              @click="RegistrarIntencion(item.id_misa)"
            >
              Registrar Intención
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
    guardarIdMisa(id) {
      this.idMisa = id;
      this.mostrarAlerta = false;
    },
    async eliminarMisa() {
      this.msgBoton = "Cancelar";
      if (this.idMisa !== null) {
        try {
          await this.axios.delete("/misas/borrar/" + this.idMisa);
          // Manejar la respuesta exitosa
          console.log("misa eliminado con éxito");
          this.mostrarAlerta = true;
          this.msgBoton = "Cerrar";
          this.misas = this.misas.filter((misa) => misa.id_misa != this.idMisa);
        } catch (error) {
          // Manejar errores
          console.error("Error al eliminar la misa:", error);
        } finally {
          // Limpia el ID y cierra el modal, independientemente del resultado
          this.idMisa = null;
        }
      }
    },
    RegistrarIntencion(id) {
      console.log(id);
      this.$router.push({ name: "registrarIntencion", params: { misaId: id } });
    },
  },
};
</script>