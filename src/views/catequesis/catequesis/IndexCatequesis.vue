<template>
  <div class="container mt-4">
    <div class="row p-3">
      <section
        class="col-12 align-items-center text-bg-primary bg-opacity-75"
      >
        <h2 class="fs-1 ">Catequesis</h2>
      </section>
      <!-- boton para agregar -->
      <section class="col-md-1 col-3 mx-auto bg-light bg-opacity-75 rounded py-2">
         <button class="btn btn-outline-success" @click="agregarCatequesis">Agregar</button>
       </section>
    </div>
    <div class="row">
      <div class="col-6" v-for="item in catequesis" :key="item.id">
        <div class="card shadow h-100">
          <div class="card-body">
            <h5 class="card-title fw-bolder fs-4">{{ item.nombre }}</h5>
            <p class="card-text">{{ item.requisitos }}</p>
 
            <router-link class="btn btn-primary" :to="{ name: 'opciones',params:{catequesisId:item.id} }"
                > Seleccionar</router-link
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
      searchQuery: "", // Añadir searchQuery al estado
    };
  },
  created() {
    this.getCatequesis();
  },
  computed: {

  },
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
    async agregarCatequesis(){
      this.$router.push({name:"agregarCatequesis"})
    }    
  },
};
</script>
  
  <style>
  .pos-a{
    position: absolute;
  }
  .pos-r{
    position: relative;
  }
/* Estilos personalizados */
.table-responsive {
  overflow-x: auto;
}
</style>