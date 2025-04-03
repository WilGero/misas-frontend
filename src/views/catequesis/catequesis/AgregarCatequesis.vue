<template>
  <div class="container">
    <div
      class="card shadow w-50 w-sm-100 m-auto border border-3 mb-2 text-bg-dark bg-opacity-75"
    >
      <div class="card-header d-flex justify-content-around">
        <h3 class="card-title fw-bolder me-2">Agregar nueva Catequesis</h3>
        <button class="btn-close" aria-label="Close" @click="irAtras"></button>
      </div>
      <div
        v-if="mostrarAlerta"
        class="alert alert-success alert-dismissible m-4"
      >
        <span>{{ msg }}</span>
      </div>

      <div class="card-body text-bg-light">
        <form @submit.prevent="guardarCatequesis">
          <div class="row px-4 py-2 gy-2">
            <!-- para nombre -->
            <div class="col-12">
              <div class="row m-0">
                <label
                  for="nombre"
                  class="form-label my-0 pe-2 px-0 col-12 col-lg-2 d-flex justify-content-center"
                >
                  Nombre:
                </label>
                <div class="col-10 px-0">
                  <input
                    v-model="formulario.nombre"
                  id="nombre"
                    class="form-control"
                    type="text"
                    placeholder="Ingrese el nombre de la catequesis"
                    required
                  />
                </div>
              </div>
            </div>
            <!-- para nombre -->
            <div class="col-12">
              <div class="row m-0">
                <label
                  for="nombre"
                  class="form-label my-0 pe-2 px-0 col-12 col-lg-2 d-flex justify-content-center"
                >
                  Requisitos:
                </label>
                <div class="col-10 px-0">
                  <textarea
                  v-model="formulario.requisitos"
                    name="requisitos"
                    id="requisitos"
                    class="form-control"
                    required
                  >
                  </textarea>
                </div>
              </div>
            </div>

            <div class="col-12">
              <button class="btn btn-outline-success">Guardar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
        msg:"Catequesis guardada satisfactoramente",
        mostrarAlerta:false,
      formulario: {
        nombre: null,
        requisitos: null,
      },
    };
  },
  methods: {
    async guardarCatequesis() {
      try {
        const response = await this.axios.post(
          "/catequesis/agregar",
          this.formulario
        );
        console.log("catequesis guardada exitosamente ", response.data.data);
        this.mostrarAlerta=true;
        setTimeout(() => {
            // regresa hacia atras
            this.irAtras();
          }, 1500);        
      } catch (error) {
        console.log("Error al guardar la catequesis:", error);
      }
    },
    irAtras(){
        this.$router.go(-1);
    }
  },
};
</script>