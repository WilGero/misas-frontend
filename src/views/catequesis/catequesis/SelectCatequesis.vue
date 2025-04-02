<template>
  <div class="container mt-4">
    <div class="col-12 p-3">
      <section
        class="d-flex justify-content-around align-items-center text-bg-primary bg-opacity-75"
      >
        <h2 class="fs-1">{{ nameCateqesis }}</h2>
        {{ selectGestion }}
      </section>
      <!-- Barra de búsqueda -->
      <div class="row mb-3 justify-content-center">
        <label
          for="selectGestion"
          class="col-3 form-label p-2 text-bg-dark bg-opacity-75 rounded"
          >Selecciona la Gestión:</label
        >
        <div class="col-4 p-0">
          <select
            v-model="selectGestion"
            id="selectGestion"
            class="form-select"
          >
            <option v-for="item in gestiones" :key="item.id" :value="item.id">
              {{ item.gestion }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-3" v-for="(item, index) in opciones" :key="index">
        <div class="card shadow h-100">
          <div class="card-body">
            <h5 class="card-title fw-bolder fs-4">{{ item }}</h5>
            <p class="card-text"></p>
            <button class="btn btn-primary" @click="catecumenos()">Seleccionar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  setup() {
    return {};
  },
  data() {
    return {
      opciones: [
        "Catecúmenos",
        "Sesiones de catequesis",
        "Examenes",
        "Estadísticas",
      ],
      gestiones: [],
      catequesis: null,
      nameCateqesis: null,
      selectGestion: null, // Añadir searchQuery al estado
    };
  },
  created() {
    this.getGestion();
    this.encontrarCatequesis();
  },
  computed: {},
  methods: {
    async getGestion() {
      await this.axios
        .get("/gestion/listado")
        .then((response) => {
          // Manejar la respuesta exitosa
          this.gestiones = response.data.data;
          console.log(this.gestiones);
          //estamos recuperando la gestion 2025 por defecto
          this.selectGestion = this.gestiones[1].id;
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar las gestiones:", error);
        });
    },
    async encontrarCatequesis() {
      await this.axios
        .get("/catequesis/encontrar/" + this.$route.params.catequesisId)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.catequesis = response.data.data;
          console.log(this.catequesis);
          this.nameCateqesis = this.catequesis.nombre;
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar la catequesis:", error);
        });
    },
    async catecumenos() {
      this.$router.push({
        name: "catecumenos",
        params: {
          catequesisId: this.$route.params.catequesisId,
          gestionId: this.selectGestion,
        },
      });
    },
  },
};
</script>
  
  <style>
/* Estilos personalizados */
.table-responsive {
  overflow-x: auto;
}
</style>