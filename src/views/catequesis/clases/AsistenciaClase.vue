<template>
  <div class="container-fluid container-lg">
    <div class="row mt-4 mt-lg-2">
      <!-- para el boton para ir atras -->
      <div class="col-6 mb-2 text-start">
        <button class="btn btn-secondary" @click="irAtras">
          <i class="fas fa-arrow-left"></i>
          <span class="d-none d-md-block">Atrás</span>
        </button>
      </div>
      <!-- para los boones de opciones -->
      <div class="col-6 text-end">
        <div class="btn-group">
          <button @click="imprimirListaAsistencia" class="btn btn-primary">
            <i class="fas fa-print"></i>
            <span class="d-none d-md-block">Imprimir</span>
          </button>
          <button class="btn btn-success" @click="exportTableToExcel">
            <i class="fas fa-file-excel"></i>
            <span class="d-none d-md-block">Excel</span>
          </button>
        </div>
      </div>
      <!-- para el encabezado -->
      <div class="col-12 mb-2">
        <div class="text-bg-dark bg-opacity-75">
          <div class="row p-3">
            <h2 class="fs-2 fs-lg-1">Catequesis de {{ nombre }}</h2>
            <h3 class="col-lg-6 text-start fs-5 fs-lg-3">
              <strong class="me-2">Tema:</strong> {{ temaClase }}
            </h3>
            <h3 class="col-lg-6 text-start fs-5 fs-lg-3">
              <strong class="me-2">Fecha:</strong
              >{{ formatDatetimeWithMonthInLetters(fechaHoraClase) }}
            </h3>
          </div>
        </div>
      </div>
    </div>
    <!-- Barra de búsqueda -->
    <div class="mb-2">
      <input
        type="text"
        class="form-control"
        placeholder="Buscar..."
        v-model="searchQuery"
      />
    </div>
    <div class="table-responsive">
      <table ref="table" class="table table-bordered table-hover caption-top">
        <caption class="text-center text-bg-dark opacity-75 fs-2">
          Lista de Catecúmenos
        </caption>
        <thead class="table-success opacity-75">
          <tr>
            <th rowspan="2">Nro</th>
            <th class="ps-4 text-start" rowspan="2">Nombres</th>
            <th class="ps-4 text-start d-none d-md-table-cell" rowspan="2">Apellidos</th>
            <th colspan="4" class="text-center">Marcar Asistencia</th>
            <th rowspan="2" class="d-none d-lg-table-cell">Estado</th>
          </tr>
          <tr class="d-none d-md-table-row">
            <th>Presente</th>
            <th>Retraso</th>
            <th>Permiso</th>
            <th>Falta</th>
          </tr>
        </thead>
        <tbody class="table-light">
          <tr
            v-for="(item, index) in filteredCatecumenosClase"
            :key="'catecumeno' + item.id"
          >
            <td>{{ index + 1 }}</td>
            <td class="ps-4 text-start">{{ item.nombres }}</td>
            <td class="ps-4 text-start d-none d-md-table-cell">{{ item.apellidos }}</td>
            <td>
              <button
                @click="actualizarAsistencia(item, asistencias[0].id)"
                :class="
                  item.tipo === 'Presente'
                    ? 'btn btn-sm btn-success'
                    : 'btn btn-sm btn-outline-success'
                "
              >
                <i class="fas fa-check"></i>
              </button>
            </td>
            <td>
              <button
                @click="actualizarAsistencia(item, asistencias[1].id)"
                :class="
                  item.tipo === 'Atraso'
                    ? 'btn btn-sm btn-warning'
                    : 'btn btn-sm btn-outline-warning'
                "
              >
                <i class="fas fa-clock"></i>
              </button>
            </td>
            <td>
              <button
                @click="handleButtonClick(item, 2)"
                :class="
                  item.tipo === 'Permiso'
                    ? 'btn btn-sm btn-info'
                    : 'btn btn-sm btn-outline-info'
                "
                :data-bs-toggle="item.max_permiso === 0 ? 'modal' : ''"
                :data-bs-target="item.max_permiso === 0 ? '#mi-modal' : ''"
              >
                <i class="fas fa-user-clock"></i>
              </button>
            </td>
            <td>
              <button
                @click="handleButtonClick(item, 3)"
                :class="
                  item.tipo === 'Falta'
                    ? 'btn btn-sm btn-danger'
                    : 'btn btn-sm btn-outline-danger'
                "
                :data-bs-toggle="item.max_falta === 0 ? 'modal' : ''"
                :data-bs-target="item.max_falta === 0 ? '#mi-modal' : ''"
              >
                <i class="fas fa-times"></i>
              </button>
            </td>
            <td class="fs-4 d-none d-lg-table-cell">
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
      searchQuery: "", // Añadir searchQuery al estado
    };
  },
  created() {
    this.getAsistencias();
    this.getCatecumenosClase();
    this.getClase();
  },
  computed: {
    filteredCatecumenosClase() {
      // Filtrar catecumenosClase basado en searchQuery
      return this.catecumenosClase.filter((item) => {
        const term = this.searchQuery.toLowerCase();
        return (
          item.nombres.toLowerCase().includes(term) ||
          item.apellidos.toLowerCase().includes(term)
        );
      });
    },
  },
  methods: {
    handleButtonClick(item, idxAsistencia) {
      // idxAsistencia representa el indice de la lista de tipos de asistencias
      console.log(`Este es el item: ${item}`);
      if (item.max_permiso === 0 && idxAsistencia === 2) {
        this.message = "Permisos";
      } else if (item.max_falta === 0 && idxAsistencia === 3) {
        this.message = "Faltas";
      } else {
        this.actualizarAsistencia(item, this.asistencias[idxAsistencia].id);
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
        .get("/catecumenos/listado-asistencia/" + this.$route.params.claseId)
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
    //para imprimir
    imprimirListaAsistencia() {
      // Crear una nueva ventana de impresión
      const printWindow = window.open("", "_blank");
      const lista = this.filteredCatecumenosClase
        .map(
          (item, index) =>
            `<tr><td>${index + 1}</td><td>${item.nombres}</td><td>${
              item.apellidos
            }</td><td></td></td></tr>`
        )
        .join("");

      // Insertar contenido en la ventana de impresión
      printWindow.document.write(`
        <html>
          <head>
            <title>Confirmación - 2024</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px 50px; }
              h2,h3 { text-align: center; }
              h4 {border:0.5px solid darkgray;
              padding-left:10px;}
              table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size:14px}
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
            </style>
          </head>
          <body>
    <h2>Catequesis de ${this.nombre}</h2>
    <h4 class="fs-3 text-start me-5"
      ><strong>Tema: </strong> ${this.temaClase}
    <span class="fs-4"><br><strong>Fecha: </strong>${this.formatDatetimeWithMonthInLetters(
      this.fechaHoraClase
    )}</span></h4>
    <h3>Lista de Catecúmenos</h3> 
               <table>
              <thead>
                <tr>
                  <th>Nro</th>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>Asistencia</th>
                </tr>
              </thead>
              <tbody>
                ${lista}
                <td></td>
              </tbody>
            </table>
          </body>
        </html>
      `);

      // Cerrar el documento y enviar a impresión
      printWindow.document.close();
      printWindow.print();
    },
  },
};
</script>
<style>
</style>