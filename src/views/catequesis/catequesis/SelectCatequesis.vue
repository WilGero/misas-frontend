<template>
  <div class="container mt-4">
    <div class="row p-3">
      <!-- para el boton para ir atras -->
      <div class="col-2 col-lg-1 text-start">
        <button class="btn btn-secondary w-100" @click="irAtras">
          <i class="fas fa-arrow-left"></i>
          <span class="d-none d-md-block">Atrás</span>
        </button>
      </div>

      <section class="col-10 col-lg-11 text-bg-warning bg-opacity-75">
        <h2 class="fs-1 fw-bold text-light">
          {{ nameCatequesis }} - {{ gestion }}
        </h2>
      </section>
    </div>
    <div class="row">
      <div
        class="col-12 col-md-6 col-lg-3 mb-2"
        v-for="(item, index) in opciones"
        :key="index"
      >
        <div class="card shadow text-bg-dark h-100 opacity-75">
          <div class="card-header pt-4">
            <h4 class="card-title fw-bolder fs-4 size-lg">{{ item.nombre }}</h4>
          </div>
          <div class="card-body">
            <div class="row">
              <section class="fs-1 align-items-end">
                <i :class="item.icono"></i>
              </section>
              <!-- <i class="fas fa-user-graduate"></i> -->
            </div>
          </div>
          <div class="card-footer">
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
      opciones: [
        {
          id: 1,
          nombre: "Catecúmenos",
          icono:"fas fa-people-group"
        },
        { id: 2, nombre: "Sesiones de catequesis",icono:"fas fa-chalkboard-teacher" },
        { id: 3, nombre: "Examenes",icono:"fas fa-file-alt" },
        { id: 4, nombre: "Estadísticas", icono:"fas fa-chart-line" },
      ],
      gestiones: [],
      catequesis_gestion: null,
      catequesis: null,
      nameCatequesis: null,
      gestion: null,
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
          this.gestion = this.catequesis_gestion.gestion;
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
          this.nameCatequesis = this.catequesis.nombre;
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar la catequesis:", error);
        });
    },
    irOpcion(id) {
      console.log(id);

      if (id == 1) {
        this.$router.push({
          name: "catecumenos",
          params: {
            catequesisGestionId: this.catequesisGestionId,
          },
        });
      } else if (id == 2) {
        this.$router.push({
          name: "clases",
          params: {
            catequesisGestionId: this.catequesisGestionId,
          },
        });
      } else if (id == 3) {
        this.$router.push({
          name: "examenes",
          params: {
            catequesisGestionId: this.catequesisGestionId,
          },
        });
      }
    },
    irAtras() {
      this.$router.go(-1);
    },
  },
};
</script>
  
  <style>
/* Estilos personalizados */
.table-responsive {
  overflow-x: auto;
}
@media (min-width: 992px) {
  .size-lg {
    font-size: 35px;
  }
}
</style>