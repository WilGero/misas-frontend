<template>
  <div class="container mt-4">
    {{ this.catequesis_gestion }}
    <div class="col-12 p-3">
      <section
        class="d-flex justify-content-around align-items-center text-bg-primary bg-opacity-75"
      >
        <h2 class="fs-1">{{ nameCateqesis }}</h2>
      </section>
    </div>
    <div class="row">
      <div class="col-3" v-for="(item, index) in opciones" :key="index">
        <div class="card shadow h-100">
          <div class="card-body">
            <h5 class="card-title fw-bolder fs-4">{{ item.nombre }}</h5>
            <p class="card-text"></p>
            <button class="btn btn-primary" @click="irOpcion(item.id)">
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
      opciones: [{
        id:1,
        nombre:"Catecúmenos"
      },
      { id:2,
        nombre:"Sesiones de catequesis"}
      ,
      { id:3,
        nombre:"Examenes"}
        ,
        { id:4,
          nombre:"Estadísticas"}
      ],
      gestiones: [],
      catequesis_gestion: null,
      catequesis: null,
      nameCateqesis: null,
      catequesisGestionId: null, 
    };
  },
  created() {
    this.encontrarCatequesis();
    this.encontrarCatequesisGestion();
  },
  // mounted() {
  // },
  computed: {},
  methods: {
    //metodo que encuentra una catequesis_gestiones segun el catequesis_id y la gestion_id
    async encontrarCatequesisGestion() {
      await this.axios
        .get(
          `/catequesis-gestion/encontrar/${this.$route.params.catequesisId}/${this.$route.params.gestionId}`
        )
        .then((response) => {
          // Manejar la respuesta exitosa
          this.catequesis_gestion = response.data.data;
          console.log(this.catequesis_gestion);
          this.catequesisGestionId = this.catequesis_gestion.id;
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar las gestiones:", error);
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
  irOpcion(id) {
      console.log(id)
      
      if(id==1){        
        this.$router.push({
          name: "catecumenos",
          params: {
            catequesisGestionId: this.catequesisGestionId,
          },
        });
      }else if(id==2){
        this.$router.push({
          name: "clases",
          params: {
            catequesisGestionId: this.catequesisGestionId,
          },
        });
      }
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