<template>
  <div class="container mt-4">
    {{ this.catequesis_gestion }}
    <div class="col-12 p-3">
      <section
        class="d-flex justify-content-around align-items-center text-bg-primary bg-opacity-75"
      >
      <h2 class="fs-1">{{ nameCateqesis }}</h2>
      </section>
      <!-- Barra de búsqueda -->
      <div class="row mb-3 justify-content-center">
        <label
          for="selectGestion"
          class="col-3 form-label p-2 text-bg-dark bg-opacity-75 rounded rounded-end-0"
          >Selecciona la Gestión:</label
        >
      </div>
    </div>
    <div class="row">
      <div class="col-3" v-for="(item, index) in opciones" :key="index">
        <div class="card shadow h-100">
          <div class="card-body">
            <h5 class="card-title fw-bolder fs-4">{{ item }}</h5>
            <p class="card-text"></p>
            <button class="btn btn-primary" @click="catecumenos()">
              Seleccionar
            </button>
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
      catequesis_gestion: null,
      catequesis: null,
      nameCateqesis: null,
      selectGestion: null, // Añadir searchQuery al estado
    };
  },
  created() {
    this.encontrarCatequesis();
  },
  // mounted() {
  //   this.encontrarCatequesisGestion();
  // },
  updated(){
    // this.encontrarCatequesisGestion();
  },
  computed: {
  },
  methods: {
        //metodo que encuentra una catequesis_gestiones segun el catequesis_id y la gestion_id
    async encontrarCatequesisGestion() {
      await this.axios
        .get(
          `/catequesis-gestion/encontrar/${this.$route.params.catequesisId}/${this.selectGestion}`
        )
        .then((response) => {
          // Manejar la respuesta exitosa
          this.catequesis_gestion = response.data.data;
          console.log(this.catequesis_gestion);
          if(this.catequesis_gestion===undefined){
            this.agregarCatequesisGestion();
          }
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar las gestiones:", error);
        });
    },
    //agregar catequesis_gestiones
    async agregarCatequesisGestion(){
      await this.axios
        .get("/catequesi-gestion/agregar",
          {
            catequesis_id:this.$route.params.catequesisId,
            gestion_id:this.selectGestion
          }
        )
        .then((response) => {
          // Manejar la respuesta exitosa
          console.log(response);
          this.encontrarCatequesis();
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar la catequesis:", error);
        });
    }, 
    //metodo que encuentra la catequesis por el id
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