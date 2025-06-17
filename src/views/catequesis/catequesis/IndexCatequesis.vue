<template>
  <div class="container mt-4">
    <div class="row p-3">
      <section class="col-12 align-items-center text-bg-blue opacity-75">
        <h2 class="fs-1">Catequesis</h2>
      </section>
      <div>
        <div class="row bg-light bg-opacity-75 rounded py-2">
          <div class="col-8">
            <div class="row ms-auto justify-content-center">
              <label
                for="selectGestion"
                class="col-6 col-md-3 col-lg-2 form-label p-2 text-bg-dark bg-opacity-75 rounded rounded-end-0"
                >Gestión:</label
              >
              <div class="col-6 col-md-3 col-lg-2 p-0">
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
          <section class="col-4">
            <button class="btn btn-outline-success" @click="agregarCatequesis">
              Agregar
            </button>
          </section>
        </div>
      </div>
    </div>
    <div class="row">
      <div
        class="col-12 col-lg-6 mx-auto mb-3"
        v-for="item in catequesis"
        :key="item.id"
      >
        <div class="card text-bg-secondary opacity-75 border-primary">
          <h5 class="card-header fs-2">{{ item.nombre}}</h5>
          <img src="../../../assets/Confirmación.png" alt="imagen" />
          <div class="card-img-overlay">
            <div class="row h-100 row-cols-1 align-items-end">
              <p class="card-text fst-italic fs-4">{{ item.requisitos }}</p>
              <section class="d-grid">

                <button
                class="btn btn-outline-primary fw-bold"
                @click="opcionesCatequesis(item.id)"
                >
                Seleccionar
              </button>
            </section>
            </div>
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
      selectGestion: null,
    };
  },
  created() {
    this.getCatequesis();
    this.getGestion();
  },
  mounted() {},
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
    //Dirige a la vista opciones de la catequesis
    opcionesCatequesis(catequesisId) {
      this.$router.push({
        name: "opciones",
        params: { catequesisId, gestionId: this.selectGestion },
      });
    },
  },
};
</script>
  
  <style scoped>
/* Estilos personalizados */
.table-responsive {
  overflow-x: auto;
}
.img-fondo {
  background-image: url("../../../assets/Confirmación.png");
  background-size: "cover";
  height: "300px";
}
.img-fondo::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(
    255,
    255,
    255,
    0.2
  ); /* Ajusta el último valor (0.5) para la transparencia */
  z-index: 0;
}
.card-body {
  position: relative;
  z-index: 1; /* Asegura que el contenido esté sobre el overlay */
}
</style>