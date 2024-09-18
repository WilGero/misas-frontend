<template>
  <div class="container position-relative">
    <div class="position-absolute mt-2 top-0 left-0">
      <button class="btn btn-secondary" @click="irAtras">
        <i class="fas fa-arrow-left"></i> Atrás
      </button>
    </div>
    <button class="btn btn-success" @click="exportTableToExcel">
      <i class="fas fa-file-excel"></i> Excel
    </button>
    <h2>Examen - {{ titulo }}</h2>
    <span class="fs-4">{{ formatDateWithMonthInLetters(fechaExamen) }}</span>
    <h3>Lista de Catecumenos</h3>
    <!-- Barra de búsqueda -->
    <div class="mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Buscar..."
        v-model="searchQuery"
      />
    </div>
    {{ formulario }}
    <div class="table-responsive">
      <table ref="table" class="table table-bordered table-hover">
        <thead class="table-success">
          <tr>
            <th>Nro</th>
            <th class="ps-4 text-start">Nombres</th>
            <th class="ps-4 text-start">Apellidos</th>
            <th>Agregar Calificación</th>
            <th>Calificacion</th>
          </tr>
        </thead>
        <tbody class="table-light">
          <tr
            v-for="(item, index) in filteredCatecumenosExamen"
            :key="'catecumeno' + item.id"
          >
            <td>{{ index + 1 }}</td>
            <td class="ps-4 text-start">{{ item.nombres }}</td>
            <td class="ps-4 text-start">{{ item.apellidos }}</td>
            <td class="px-5">
              <div class="d-flex justify-content-center">
                <input
                  class="form-control"
                  type="number"
                  :value="item.nota"
                  @input="notaExamen = $event.target.value"
                  v-if="activar && indice == index"
                />
                <button
                  class="btn btn-success ms-2"
                  @click="agregarCalificacion(index, item.catecumeno_id)"
                >
                  <i v-if="activar && indice == index" class="fas fa-save"></i>
                  <i v-else class="fas fa-pencil-alt"></i>
                </button>
              </div>
            </td>
            <td class="fs-4">{{ item.nota }}</td>
          </tr>
          <!-- Aquí puedes agregar más filas con otros estudiantes -->
        </tbody>
      </table>
    </div>
  </div>
</template>
  
  <script>
import moment from "moment";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
export default {
  data() {
    return {
      examen: {},
      respuestas: [],
      catecumenosExamen: [],
      catecumeno: {},
      estadoAsistencia: null,
      formulario: {},
      titulo: null,
      fechaExamen: null,
      message: null,
      searchQuery: "", // Añadir searchQuery al estado
      activar: false, //para activar el boton de registro de calificacion
      indice: null, //para guardar el indice de la fila
      notaExamen: null,
    };
  },
  created() {
    this.getCatecumenosExamen();
    this.getExamen();
  },
  computed: {
    // busqueda de catecumenos
    filteredCatecumenosExamen() {
      // Filtrar catecumenosClase basado en searchQuery
      return this.catecumenosExamen.filter((item) => {
        const term = this.searchQuery.toLowerCase();
        return (
          item.nombres.toLowerCase().includes(term) ||
          item.apellidos.toLowerCase().includes(term)
        );
      });
    },
  },
  methods: {
    exportTableToExcel() {
      // Obtener la referencia de la tabla
      const table = this.$refs.table;

      // Convertir la tabla a un libro de trabajo (workbook)
      const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

      // Generar un archivo Excel binario
      const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

      // Guardar el archivo usando FileSaver
      saveAs(
        new Blob([wbout], { type: "application/octet-stream" }),
        "tabla.xlsx"
      );
    },
    formatDateWithMonthInLetters(date) {
      return moment(date).locale("es").format("D [de] MMMM [del] YYYY");
    },
    async getCatecumenosExamen() {
      try {
        const response = await this.axios.get(
          `/catecumenos/listado-examen/${this.$route.params.examenId}`
        );
        this.catecumenosExamen = response.data.data;
        console.log(this.catecumenosExamen);
      } catch (error) {
        console.error("Error al encontrar catecumenos de un examen:", error);
      }
    },
    async getExamen() {
      await this.axios
        .get("/examenes/encontrar/" + this.$route.params.examenId)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.examen = response.data.data;
          this.titulo = this.examen.titulo;
          this.fechaExamen = this.examen.fecha;
          console.log(this.examen);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al encontrar la clase:", error);
        });
    },
    async actualizarCalificacion(catecumenoId) {
      try {
        this.formulario = {
          catecumeno_id: catecumenoId,
          examen_id: this.$route.params.examenId,
          nota: this.notaExamen,
        };
        if(this.notaExamen === null){ //si notaExamen es nulo no actualizar
          return;
        }
        const response = await this.axios.put(
          "catecumenos-examen/actualizar",
          this.formulario
        );
        console.log("Nota actualizada exitosamente ", response.data.data);
      
        // this.mostrarAlerta = true;
        // setTimeout(() => {
        //   this.$router.go(-1);
        // }, 1500);
      } catch (error) {
        console.error("Error al actualizar la nota:", error);
      }
    },
    async agregarCalificacion(index, catecumenoId) {
      // console.log(index);
      // console.log(`catecumeno id: ${catecumenoId}`)
      //  console.log(`examen id: ${this.$route.params.examenId}`);
      // console.log(`esta es la nota: ${this.notaExamen}`)
      this.indice = index;
      this.activar = !this.activar;

      if (!this.activar) {
        await this.actualizarCalificacion(catecumenoId);
        this.notaExamen=null;
        this.getCatecumenosExamen();
      }
    },
    irAtras() {
      this.$router.go(-1);
    },
  },
};
</script>
  <style>
.container {
  padding: 20px;
}
.table-responsive {
  margin-top: 20px;
}
.btn-attendance i {
  margin-right: 5px;
}
</style>