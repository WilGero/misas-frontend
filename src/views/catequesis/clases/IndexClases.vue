<template>
  <div class="container-fluid container-lg mt-4">
    <!-- {{ claseCatecumenos.length }}     -->
    <div class="row my-auto">
      <!-- para el boton para ir atras -->
      <div class="col-12 mb-2 text-start">
        <button class="btn btn-secondary" @click="irAtras">
          <i class="fas fa-arrow-left"></i>
          <span class="d-none d-md-block">Atrás</span>
        </button>
      </div>
    </div>
    <div class="table-responsive">
      <table
        class="table table-hover table-striped table-bordered caption-top bg-opacity-75"
      >
        <caption class="text-bg-dark fs-2">
          <div class="row align-items-center">
            <h3 class="col-12 text-center">Sesiones de Catequesis</h3>
            <!-- Barra de búsqueda -->
            <div class="col-9 col-md-10 mb-2 ps-4 pe-md-4">
              <input
                type="text"
                class="form-control w-100"
                placeholder="Buscar..."
                v-model="searchQuery"
              />
            </div>
            <!-- boton para agregar mas sesiones de catequesis -->
            <section class="col-3 col-md-2 text-start ps-md-4 pe-4">
              <router-link
                :to="{
                  name: 'agregarClase',
                  params: {
                    catequesisGestionId: $route.params.catequesisGestionId,
                  },
                }"
                class="btn btn-success"
                ><i class="fas fa-plus"></i
                ><span class="d-none d-md-block">Agregar</span></router-link
              >
            </section>
          </div>
        </caption>
        <thead class="opacity-75">
          <tr>
            <th>Nro</th>
            <th>Tema</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredClase" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.tema }}</td>
            <td>{{ formatDateTime(item.fecha_hora) }}</td>
            <td>
              <div class="btn-group">
                <!-- Botón para a ir a registrar asistencias de la clase -->
                <button class="btn btn-info" @click="irAsistencia(item.id)">
                  <i class="fas fa-calendar-check"></i
                  ><span class="d-none d-md-block">Asistencia</span>
                </button>
                <!-- Botón de detalles -->
                <router-link
                  :to="{
                    name: 'detalleClase',
                    params: { claseId: item.id },
                  }"
                  type="button"
                  class="btn btn-primary"
                >
                  <i class="fas fa-info-circle"></i>
                  <span class="d-none d-md-block">Detalles</span>
                </router-link>
              </div>
            </td>
          </tr>
          <!-- Agrega más filas según sea necesario -->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// import {ref} from "vue;"
import useFormatDate from "@/composables/useFormatDate";
export default {
  setup() {
    const { formatDateTime } = useFormatDate();
    return {
      formatDateTime,
    };
  },
  data() {
    return {
      clases: [],
      claseCatecumenos: [],
      catecumenos: [],
      catecumenosNuevos: [],
      claseId: null,
      searchQuery: "",
    };
  },
  created() {
    this.getClases();
    this.getCatecumenos();
  },
  computed: {
    filteredClase() {
      return this.clases.filter((item) => {
        const term = this.searchQuery.toLowerCase();
        return (
          item.tema.toLowerCase().includes(term) ||
          item.fecha_hora.toLowerCase().includes(term)
        );
      });
    },
  },
  methods: {
    async getClases() {
      await this.axios
        .get(`/clases/listado/${this.$route.params.catequesisGestionId}`)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.clases = response.data.data;
          console.log(this.clases);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar las clases:", error);
        });
    },
    async getClaseCatecumenos(idClase) {
      this.claseId = idClase;
      try {
        const response = await this.axios.get(
          `/clases/encontrar/${this.claseId}`
        );
        this.claseCatecumenos = response.data.data;
        console.log(this.claseCatecumenos);
      } catch (error) {
        console.error("Error al encontrar la clase:", error);
      }
    },
    async getCatecumenos() {
      await this.axios
        .get("/catecumenos/listado/" + this.$route.params.catequesisGestionId)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.catecumenos = response.data.data;
          console.log(this.catecumenos);
          // this.catecumenosLength = this.catecumenos.length;
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar catecumenos:", error);
        });
    },
    fCatecumenosNuevos() {
      this.catecumenosNuevos = this.catecumenos.filter(
        (estudiante) =>
          !this.claseCatecumenos.some((e) => e.catecumeno_id === estudiante.id)
      );
      // .concat(
      //   this.claseCatecumenos.filter(
      //     (estudiante) => !.some((e) => e.id === estudiante.id)
      //   )
      // );
      // for(let i=0;i<this.catecumenos.length;i++){
      //   this.catecumenosNuevos = this.catecumenos.filter(estudiante => estudiante.id === 27);
      // }
    },
    async agregarCatecumenoClase(formulario) {
      console.log("Este es el formulario para agregar", formulario);

      try {
        const response = await this.axios.post(
          "/catecumenos-clase/agregar",
          formulario
        );
        console.log("Asistencia registrada exitosamente", response.data.data);
      } catch (error) {
        console.error("Error al registrar la asistencia:", error);
      }
    },
    irAsistencia(idClase) {
      this.claseId = idClase;
      console.log(this.claseId);
      // llamar al metodo getClaseCatecumenos
      this.getClaseCatecumenos(idClase);
      // se espera 0.5 segundos para que se ejecute el metodo getClaseCatecumenos
      setTimeout(() => {
        console.log(this.claseCatecumenos.length);
        this.fCatecumenosNuevos();
        console.log(this.catecumenosNuevos);
        // agrega catecumenos solo si la lista esta vacia
        if (this.claseCatecumenos.length === 0) {
          console.log(this.catecumenos.length);
          for (let i = 0; i < this.catecumenos.length; i++) {
            this.formulario = {
              clase_id: idClase,
              catecumeno_id: this.catecumenos[i].id,
            };
            this.agregarCatecumenoClase(this.formulario);
          }
        } else if (this.catecumenosNuevos.length > 0) {
          for (let i = 0; i < this.catecumenosNuevos.length; i++) {
            this.formulario = {
              clase_id: idClase,
              catecumeno_id: this.catecumenosNuevos[i].id,
            };
            this.agregarCatecumenoClase(this.formulario);
          }
        }
        this.$router.push({
          name: "asistenciaClase",
          params: { claseId: idClase },
        });
        // Cambia "nombreDeLaRuta" con el nombre de la ruta a la que deseas redirigir
      }, 500);
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
</style>