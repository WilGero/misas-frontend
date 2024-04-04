<template>
  <div class="container mt-5">
    <section>
      <div
        v-if="mostrarAlerta"
        class="alert alert-success alert-dismissible m-4"
      >
        <span>Catecumeno actualizado satisfactoriamente</span>
      </div>
      <div v-else-if="mostrarAlerta===false" class="alert alert-danger alert-dismissible m-4">
        <ul class="error-list" v-for="(error, index) in errores" :key="index">
          <li class="error-list-item">{{ error }}</li>
        </ul>
      </div>
    </section>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card bg-light">
          <div class="card-header">
            <h3 class="card-title">Editar Catecumeno</h3>
            <button
              class="btn-close"
              aria-label="Close"
              @click="irAtras"
            ></button>
          </div>
          <div class="card-body">
            <form>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="nombres">Nombres</label>
                    <input
                      v-model="formulario.nombres"
                      type="text"
                      class="form-control"
                      id="nombres"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="apellidos">Apellidos</label>
                    <input
                      v-model="formulario.apellidos"
                      type="text"
                      class="form-control"
                      id="apellidos"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="ci">CI</label>
                    <input
                      v-model="formulario.ci"
                      type="text"
                      class="form-control"
                      id="ci"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="fecha-nacimiento">Fecha de Nacimiento</label>
                    <input
                      :value="fechaNacimiento"
                      @input="formulario.fecha_nacimiento = $event.target.value"
                      type="date"
                      class="form-control"
                      id="fecha-nacimiento"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="celular">Celular</label>
                    <input
                      v-model="formulario.celular"
                      type="number"
                      class="form-control"
                      id="celular"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="celular-padre">Celular del Padre/Madre</label>
                    <input
                      v-model="formulario.celular2"
                      type="text"
                      class="form-control"
                      id="celular-padre"
                    />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="direccion">Dirección</label>
                <input
                  v-model="formulario.direccion"
                  type="text"
                  class="form-control"
                  id="direccion"
                />
              </div>
              <div class="form-group">
                <label for="padrinos">Padrinos</label>
                <input
                  v-model="formulario.padrinos"
                  type="text"
                  class="form-control"
                  id="padrinos"
                />
              </div>
            </form>
          </div>
          <div class="card-footer text-center">
            <button class="btn btn-danger me-2" @click="irAtras">
              Cancelar
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              @click="actualizarCatecumeno"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";
export default {
  data() {
    return {
      formulario: {},
      mostrarAlerta: null,
      errores: [],
      error: null,
      msgBoton: null,
      fechaNacimiento: null,
    };
  },
  computed: {
    ...mapState(["auth"]),
  },
  created() {
    this.getCatecumeno();
  },
  methods: {
    formatDate(datetime) {
      return moment(datetime).locale("es").format("YYYY-MM-DD");
    },
    async getCatecumeno() {
      await this.axios
        .get("/catecumenos/encontrar/" + this.$route.params.catecumenoId)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.formulario = response.data.data;
          console.log(this.formulario);
          this.fechaNacimiento = this.formatDate(
            this.formulario.fecha_nacimiento
          );
          console.log(this.fechaNacimiento);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al encontrar catecumeno:", error);
        });
    },
    async actualizarCatecumeno() {
      this.errores = [];
      console.log(this.formulario);
      this.formulario.usuario_id = this.auth.data.id;
      if (this.formulario.nombres === (null||"")) {
        this.error = "Se requiere el nombre del catecúmeno";
        this.errores.push(this.error);
      }
      if (this.formulario.apellidos === (null||"")) {
        this.error = "Se requiere el apellido del catecúmeno";
        this.errores.push(this.error);
      }
      // if (this.formulario.ci === (null||"")) {
      //   this.error = "Se requiere el carnet de indentidad del catecúmeno";
      //   this.errores.push(this.error);
      // }
      if (this.formulario.fecha_nacimiento === (null||"")) {
        this.error = "Se requiere la fecha de nacimiento del catecúmeno";
        this.errores.push(this.error);
      }
      // if (this.formulario.direccion === (null||"")) {
      //   this.error = "Se requiere la dirección de donde vive el catecúmeno";
      //   this.errores.push(this.error);
      // }
      console.log(this.formulario);
      console.log(this.errores);
      if (this.errores.length === 0) {
        await this.axios
          .put("/catecumenos/actualizar", this.formulario)
          .then((response) => {
            // Manejar la respuesta exitosa
            console.log(
              "catecumeno actualizado exitosamente ",
              response.data.data
            );
            this.mostrarAlerta = true;
            setTimeout(() => {
              // Cambia "nombreDeLaRuta" con el nombre de la ruta a la que deseas redirigir
              this.$router.go(-1);
            }, 1500); // 3000 milisegundos = 2 segundos
          })
          .catch((error) => {
            // Manejar errores
            console.error("Error al actualizar catecumeno:", error);
          });
      }else{
        this.mostrarAlerta=false;
      }
    },
    irAtras() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-body {
  padding: 20px;
}
.form-group {
  margin-bottom: 20px;
}

.error-list {
  list-style: none;
  padding-left: 0;
}
.error-list-item {
  color: #dc3545;
  margin-bottom: 5px;
}
btn-close:hover {
  background-color: #dc3545;
}
</style>