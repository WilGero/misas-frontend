<template>
  <div class="container mt-4">
    <div class="row p-3">
      <section class="col-12 align-items-center text-bg-primary bg-opacity-75">
        <h2 class="fs-1">Catequesis</h2>
      </section>
      <div>
        <div class="row bg-light bg-opacity-75 rounded py-2">
          <div class="col-6">
            <div class="row justify-content-center">
              <label
                for="selectGestion"
                class="col-3 form-label p-2 text-bg-dark bg-opacity-75 rounded rounded-end-0"
                >Gestión:</label
              >
              <div class="col-4 p-0">
                <select
                  v-model="selectGestion"
                  id="selectGestion"
                  class="form-select rounded-start-0"
                >
                  <option
                    v-for="item in gestiones"
                    :key="item.id"
                    :value="item.id"
                  >
                    {{ item.gestion }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <!-- boton para agregar -->
          <section class="col-6">
            <button class="btn btn-outline-success" @click="agregarCatequesis">
              Agregar
            </button>
          </section>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-6 mb-3" v-for="item in catequesis" :key="item.id">
        <div class="card shadow h-100">
          <div class="card-body">
            <h5 class="card-title fw-bolder fs-4">{{ item.nombre }}</h5>
            <p class="card-text">{{ item.requisitos }}</p>

            <router-link
              class="btn btn-primary"
              :to="{ name: 'opciones', params: { catequesisId: item.id } }"
            >
              Seleccionar</router-link
            >
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
      catequesis: [],
      gestiones: [],
      searchQuery: "", // Añadir searchQuery al estado
      selectGestion: null,
    };
  },
  created() {
    this.getCatequesis();
    this.getGestion();
  },
  computed: {},
  methods: {
    async getCatequesis() {
      await this.axios
        .get("/catequesis/listado")
        .then((response) => {
          // Manejar la respuesta exitosa
          this.catequesis = response.data.data;
          console.log(this.catequesis);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar catequesis:", error);
        });
    },
    async agregarCatequesis() {
      this.$router.push({ name: "agregarCatequesis" });
    },
    //metodo que lista a todas las gestiones
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
  },
};
</script>
  
  <style>
.pos-a {
  position: absolute;
}
.pos-r {
  position: relative;
}
/* Estilos personalizados */
.table-responsive {
  overflow-x: auto;
}
</style>