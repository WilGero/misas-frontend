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
    <h2>Catequesis de {{ nombre }}</h2>
    <span class="fs-3 text-start me-5"
      ><strong>Tema:</strong> {{ temaClase }}</span
    >
    <span class="fs-4">{{
      formatDatetimeWithMonthInLetters(fechaHoraClase)
    }}</span>
    <h3>Lista de Catecumenos</h3>
    <div class="table-responsive">
      <table ref="table" class="table table-bordered table-hover">
        <thead class="table-success">
          <tr>
            <th>Nro</th>
            <th class="ps-4 text-start">Nombres</th>
            <th class="ps-4 text-start">Apellidos</th>
            <th>Asistencia</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody class="table-light">
          <tr
            v-for="(item, index) in catecumenosClase"
            :key="'catecumeno' + item.id"
          >
            <td>{{ index + 1 }}</td>
            <td class="ps-4 text-start">{{ item.nombres }}</td>
            <td class="ps-4 text-start">{{ item.apellidos }}</td>
            <td>
              <section class="btn-group">
                <button
                  @click="actualizarAsistencia(item, asistencias[0].id)"
                  class="btn btn-success btn-attendance"
                >
                  <i class="fas fa-check"></i>
                </button>
                <button
                  @click="actualizarAsistencia(item, asistencias[1].id)"
                  class="btn btn-warning btn-attendance"
                >
                  <i class="fas fa-clock"></i>
                </button>
                <button
                  @click="handleButtonClick(item, 2)"
                  class="btn btn-info btn-attendance"
                  :data-bs-toggle="item.max_permiso === 0 ? 'modal' : ''"
                  :data-bs-target="item.max_permiso === 0 ? '#mi-modal' : ''"
                >
                  <i class="fas fa-user-clock"></i>
                </button>
                <button
                  @click="handleButtonClick(item, 3)"
                  class="btn btn-danger btn-attendance"
                  :data-bs-toggle="item.max_falta === 0 ? 'modal' : ''"
                  :data-bs-target="item.max_falta === 0 ? '#mi-modal' : ''"
                >
                  <i class="fas fa-times"></i>
                </button>
              </section>
            </td>
            <td class="fs-4">
              {{ item.tipo }}
            </td>
          </tr>
          <!-- Aquí puedes agregar más filas con otros estudiantes -->
        </tbody>
      </table>
    </div>
    <div class="modal fade" id="mi-modal" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Alerta!!!</h3>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="alert alert-danger alert-dismissible m-4">
              <span>Ya se alcanzo el número máximo de {{ message }}</span>
            </div>
          </div>
        </div>
      </div>
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
      asistencias: [],
      clase: {},
      respuestas: [],
      catecumenosClase: [],
      catecumeno: {},
      estadoAsistencia: null,
      formulario: {
        asistencia_id: null,
        clase_id: null,
        catecumeno_id: null,
      },
      temaClase: null,
      fechaHoraClase: null,
      nombre: null,
      message: null,
    };
  },
  created() {
    this.getAsistencias();
    this.getCatecumenosClase();
    this.getClase();
  },
  methods: {
    handleButtonClick(item, idAsistencia) {
      console.log(`Este es el item: ${item}`);
      if (item.max_permiso === 0) {
        this.message = "Permisos";
      } else if (item.max_falta === 0) {
        this.message = "Faltas";
      } else {
        this.actualizarAsistencia(item, this.asistencias[idAsistencia].id);
        // El modal se abrirá automáticamente debido a los atributos de Bootstrap
      }
    },
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
    formatDatetimeWithMonthInLetters(datetime) {
      return moment(datetime)
        .locale("es")
        .format("D [de] MMMM [del] YYYY, h:mm a");
    },
    async getAsistencias() {
      await this.axios
        .get("/asistencias/listado")
        .then((response) => {
          // Manejar la respuesta exitosa
          this.asistencias = response.data.data;
          console.log(this.asistencias);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar asistencias:", error);
        });
    },
    async getCatecumenosClase() {
      await this.axios
        .get("/catecumenos/listado/" + this.$route.params.claseId)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.catecumenosClase = response.data.data;
          console.log(this.catecumenoClase);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al encontrar catecumeno:", error);
        });
    },
    async getClase() {
      await this.axios
        .get("/clases/encontrar2/" + this.$route.params.claseId)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.clase = response.data.data;
          this.nombre = this.clase.nombre;
          this.temaClase = this.clase.tema;
          this.fechaHoraClase = this.clase.fecha_hora;
          console.log(this.clase);
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
        if (asistencia === 3) {
          if(item.asistencia_id !== 3){
            item.max_permiso -= 1;
          }
        } else if (asistencia === 4) {
          item.max_falta -= 1;
        } else {
          if (item.asistencia_id === 3) {
            item.max_permiso += 1;
          }else if(item.asistencia_id === 4){
            item.max_falta += 1;
          }
        }
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

        await this.getCatecumenosClase();
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