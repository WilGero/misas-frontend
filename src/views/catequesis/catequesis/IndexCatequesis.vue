<template>
  <div class="container mt-4">
    <div class="col-12 p-3">
      <section
        class="d-flex justify-content-around align-items-center text-bg-primary bg-opacity-75"
      >
        <h2 class="fs-1 ">Catequesis</h2>
        <section class="p-2">
          <router-link
            aria-label="Agregar"
            title="Nuevo"
            :to="{ name: 'agregarCatecumeno' }"
            class="btn btn-success"
            ><i class="fas fa-plus"></i
            ><span class="d-none">Agregar</span></router-link
          >
        </section>
      </section>
      <!-- Barra de búsqueda -->
    <div class="mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Buscar..."
        v-model="searchQuery"
      />
    </div>
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
import moment from "moment";
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
    filteredCatecumenosClase() {
      // Filtrar catecumenosClase basado en searchQuery
      return this.catecumenos.filter((item) => {
        const term = this.searchQuery.toLowerCase();
        return (
          item.nombres.toLowerCase().includes(term) ||
          item.apellidos.toLowerCase().includes(term)
        );
      });
    },
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
    calcularEdad(fecha_nacimiento) {
      // Validar si se ha seleccionado una fecha
      if (!fecha_nacimiento) {
        alert("Por favor selecciona una fecha de nacimiento.");
        return;
      }
      // Calcular la edad
      const fechaNacimientoMoment = moment(fecha_nacimiento);
      const fechaActualMoment = moment();
      return fechaActualMoment.diff(fechaNacimientoMoment, "years");
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