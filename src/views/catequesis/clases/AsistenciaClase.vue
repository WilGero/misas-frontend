<template>
  <div class="container">
    <div class="position relative mt-2">
      <div class="position-absolute top-0 left-0">
        <button class="btn btn-secondary" @click="irAtras">
          <i class="fas fa-arrow-left"></i> Atrás
        </button>
      </div>
    </div>
    <span class="fs-3 text-start">tema: {{ clase.tema }}</span>
    <h2>Lista de Catecumenos</h2>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Nro</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Asistencia</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in catecumenos"
            :key="'catecumeno' + item.id"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ item.nombres }}</td>
            <td>{{ item.apellidos }}</td>
            <td>
              <section class="btn-group">
                <button
                  @click="
                    marcarAsistencia(
                      item.id,
                      asistencias[0].id,
                      asistencias[0].tipo
                    )
                  "
                  class="btn btn-success btn-attendance"
                >
                  <i class="fas fa-check"></i>
                </button>
                <button
                  @click="
                    marcarAsistencia(
                      item.id,
                      asistencias[1].id,
                      asistencias[1].tipo
                    )
                  "
                  class="btn btn-warning btn-attendance"
                >
                  <i class="fas fa-clock"></i>
                </button>
                <button
                  @click="
                    marcarAsistencia(
                      item.id,
                      asistencias[2].id,
                      asistencias[2].tipo
                    )
                  "
                  class="btn btn-info btn-attendance"
                >
                  <i class="fas fa-user-clock"></i>
                </button>
                <button
                  @click="
                    marcarAsistencia(
                      item.id,
                      asistencias[3].id,
                      asistencias[3].tipo
                    )
                  "
                  class="btn btn-danger btn-attendance"
                >
                  <i class="fas fa-times"></i>
                </button>
              </section>
            </td>
            <td>
              {{ item.estadoAsistencia }}
            </td>
          </tr>
          <!-- Aquí puedes agregar más filas con otros estudiantes -->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      asistencias: [],
      clase: {},
      respuestas: [],
      catecumenos: [],
      catecumeno: {},
      estadoAsistencia: null,
      formulario: {
        asistencia_id: null,
        clase_id: null,
        catecumeno_id: null,
      },
    };
  },
  created() {
    this.getAsistencias();
    this.getCatecumenos();
    this.getClase();
  },

  methods: {
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
    async getCatecumenos() {
      await this.axios
        .get("/catecumenos/listado")
        .then((response) => {
          // Manejar la respuesta exitosa
          this.catecumenos = response.data.data;
          console.log(this.catecumenos);
          for (let i = 0; i < this.catecumenos.length; i++) {
            if (this.catecumenos[i].clase_id == this.$route.params.claseId) {
              if (this.catecumenos[i].asistencia_id === 1) {
                this.catecumenos[i].estadoAsistencia = "Presente";
              } else if (this.catecumenos[i].asistencia_id === 2) {
                this.catecumenos[i].estadoAsistencia = "Atraso";
              } else if (this.catecumenos[i].asistencia_id === 3) {
                this.catecumenos[i].estadoAsistencia = "Permiso";
              } else {
                this.catecumenos[i].estadoAsistencia = "Falta";
              }
            } else {
              this.catecumenos[i].estadoAsistencia = null;
            }
          }

          console.log(this.catecumenos);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar catecumenos:", error);
        });
    },
    async getCatecumeno(catecumenoId) {
      console.log(
        "este es el catecumeno id dentro de getCatecumeno():" + catecumenoId
      );
      await this.axios
        .get("/catecumenos/encontrar/" + catecumenoId)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.catecumeno = response.data.data;
          console.log(this.catecumeno);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al encontrar catecumeno:", error);
        });
    },
    async getClase() {
      await this.axios
        .get("/clases/encontrar/" + this.$route.params.claseId)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.clase = response.data.data;
          console.log(this.clase);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al encontrar catecumeno:", error);
        });
    },
    async agregarAsistencia(formulario) {
      console.log("este es el formulario para agregar" + formulario);

      await this.axios
        .post("/catecumenos-clase/agregar", formulario)
        .then((response) => {
          // Manejar la respuesta exitosa
          console.log(
            "asistencia registrada exitosamente ",
            response.data.data
          );

          this.getCatecumenos();
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al registrar la asistencia:", error);
        });
    },
    async actualizarAsistencia(formulario) {
      console.log("este es el formulario para actualizar" + formulario);
      await this.axios
        .put("/catecumenos-clase/actualizar", formulario)
        .then((response) => {
          // Manejar la respuesta exitosa
          console.log(
            "asistencia del catecumeno actualizada exitosamente ",
            response.data.data
          );
          this.getCatecumenos();
        })
        .catch((error) => {
          // Manejar errores
          console.error(
            "Error al actualizar la asistencia del catecumeno:",
            error
          );
        });
    },
    async marcarAsistencia(catecumenoId, asistenciaId) {
      this.formulario = {
        asistencia_id: asistenciaId,
        clase_id: this.$route.params.claseId,
        catecumeno_id: catecumenoId,
      };
      console.log("este es el id del catecumeno:" + catecumenoId);
      //  el await nos sirve para que el campo catecmeno.asistencia_id no sea undefined
      await this.getCatecumeno(catecumenoId);
      console.log("este es el catecumeno" + this.catecumeno);
      console.log(
        "esta es la asistencia id del catecumeno:" +
          this.catecumeno.asistencia_id
      );
      if (this.catecumeno.asistencia_id === null) {
        this.agregarAsistencia(this.formulario);
      } else {
        this.actualizarAsistencia(this.formulario);
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