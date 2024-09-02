<template>
  <div class="container mt-5">
    <section>
      <div
        v-if="mostrarAlerta"
        class="alert alert-success alert-dismissible m-4"
      >
        <span>Examen actualizado satisfactoriamente</span>
      </div>
      <div
        v-else-if="mostrarAlerta === false"
        class="alert alert-danger alert-dismissible m-4"
      >
        <ul class="error-list" v-for="(error, index) in errores" :key="index">
          <li class="error-list-item">{{ error }}</li>
        </ul>
      </div>
    </section>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card bg-light">
          <div class="card-header">
            <h3 class="card-title">Editar Examen</h3>
            <button
              class="btn-close"
              aria-label="Close"
              @click="irAtras"
            ></button>
          </div>
          <div class="card-body">
            <form>
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label for="titulo">Titulo:</label>
                    <input
                      v-model="formulario.titulo"
                      type="text"
                      class="form-control"
                      id="titulo"
                      placeholder="Ingrese el nombre del titulo..."
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label for="fecha">Fecha:</label>
                    <input
                      :value="fecha"
                      @input="formulario.fecha = $event.target.value"
                      type="date"
                      class="form-control"
                      id="fecha"
                    />
                  </div>
                </div>
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
              @click="actualizarExamen"
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
      fecha: null,
    };
  },
  computed: {
    ...mapState(["auth"]),
  },
  created() {
    this.getExamen();
  },
  methods: {
    formatDate(date) {
      return moment(date).locale("es").format("YYYY-MM-DD");
    },
    async getExamen() {
      try {
        const response = await this.axios.get(
          `/examenes/encontrar/${this.$route.params.examenId}`
        );
        this.formulario = response.data.data;
        console.log(this.formulario);
        this.fecha = this.formatDate(this.formulario.fecha);
        console.log(this.fecha);
      } catch (error) {
        console.error("Error al encontrar el examen:", error);
      }
    },
    async actualizarExamen() {
      this.errores = [];
      const { titulo, fecha } = this.formulario;
      // Validaciones
      if (!titulo) {
        this.errores.push("Se requiere el titulo del examen...");
      }

      if (!fecha) {
        this.errores.push("Se requiere la fecha del examen");
      }

      // Si hay errores, no continuar con la actualización
      if (this.errores.length > 0) {
        this.mostrarAlerta = false;
        return;
      }

      try {
        const response = await this.axios.put(
          "/examenes/actualizar",
          this.formulario
        );
        console.log("Examen actualizado exitosamente ", response.data.data);

        this.mostrarAlerta = true;
        setTimeout(() => {
          this.$router.go(-1);
        }, 1500);
      } catch (error) {
        console.error("Error al actualizar el Examen:", error);
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