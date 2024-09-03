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
    <h2>Examen -  {{ titulo }}</h2>
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
    <div class="table-responsive">
      <table ref="table" class="table table-bordered table-hover">
        <thead class="table-success">
          <tr>
            <th>Nro</th>
            <th class="ps-4 text-start">Nombres</th>
            <th class="ps-4 text-start">Apellidos</th>
            <th>Nota</th>
            <th>Estado</th>
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
            <td class="px-5"> <input class="form-control" type="number"></td>
            <td class="fs-4"></td>
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
    async actualizarAsistencia(item, asistencia) {
      try {
        console.log(
          `Permisos actuales: ${item.max_permiso}, Faltas actuales: ${item.max_falta}`
        );
        const maxPermiso = item.max_permiso;
        const maxFalta = item.max_falta;
        // asistencia es el id del tipo de asistencia
        //  condicional que dependiendo si es una falta o un permiso aunmeta el valor maximo
        if (item.asistencia_id === 3) {
          item.max_permiso += 1;
        } else if (item.asistencia_id === 4) {
          item.max_falta += 1;
        }
        // condicional que evalua si los atrbiutos max_permiso y max_falta cambian su valor

        if (asistencia === 3) {
          item.max_permiso -= 1;
        } else if (asistencia === 4) {
          item.max_falta -= 1;
        }
        // Condicional de acuerdo si cambiaron los valores de max_permiso y max_falta se actualziara los valores en la BdD
        if (maxPermiso !== item.max_permiso || maxFalta !== item.max_falta) {
          const maxResponse = await this.axios.put(
            "/catecumenos/actualizar-max",
            {
              id: item.catecumeno_id,
              max_permiso: item.max_permiso,
              max_falta: item.max_falta,
            }
          );
          console.log(
            "Permisos y faltas actualizados exitosamente",
            maxResponse.data.data
          );
        }
        const asistenciaResponse = await this.axios.put(
          "/catecumenos-clase/actualizar-asistencia",
          {
            id: item.id,
            asistencia_id: asistencia,
          }
        );

        console.log(
          "Asistencia actualizada exitosamente",
          asistenciaResponse.data.data
        );

        await this.getCatecumenosExamen();
      } catch (error) {
        console.error(
          "Error al actualizar la asistencia del catecumeno:",
          error
        );
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