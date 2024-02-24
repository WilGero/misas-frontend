<template>
  <!-- formulario para actualizar un usuario -->
  <div class="container m-auto py-4">
    <div
      class="card shadow bg-light w-50 w-sm-100 m-auto border border-3 p-2 mb-2"
    >
      <div class="card-header position-relative p-4">
        <h3 class="card-title text-primary fw-bolder me-2">
          Actualizar usuario
        </h3>
        <button
          class="btn btn-danger position-absolute end-0 top-0"
          @click="cerrarFormulario"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="card-body">
        <form @submit.prevent="actualizarUsuario">
          <div class="row px-4 py-2 gy-2">
            <!-- para nombre -->
            <div class="col-12">
              <div class="row m-0">
                <label
                  for="nombre"
                  class="form-label my-0 px-0 col-2 d-flex justify-content-end"
                  ><i
                    class="fas fa-user-circle py-2 px-4 bg-warning rounded rounded-end-0"
                  ></i>
                </label>
                <div class="col-10 px-0">
                  <input
                    v-model="usuario.nombre"
                    id="nombre"
                    class="form-control rounded-start-0"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="row m-0">
                <label
                  for="usuario"
                  class="form-label my-0 px-0 col-2 d-flex justify-content-end"
                  ><i
                    class="fas fa-user py-2 px-4 bg-warning rounded rounded-end-0"
                  ></i>
                </label>
                <div class="col-10 px-0">
                  <input
                    v-model="usuario.usuario"
                    id="usuario"
                    class="form-control rounded-start-0"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <!-- <div class="col-12">
              <div class="row m-0">
                <label
                  for="contra"
                  class="form-label my-0 px-0 col-2 d-flex justify-content-end"
                  ><i
                    class="fas fa-lock py-2 px-4 bg-warning rounded rounded-end-0"
                  ></i>
                </label>
                <div class="col-10 px-0">
                  <input
                    v-model="usuario.contra"
                    id="contra"
                    class="form-control rounded-start-0"
                    type="password"
                  />
                </div>
              </div>
            </div> -->
            <div class="col-12">
              <div class="row m-0">
                <label
                  for="rol"
                  class="form-label my-0 px-0 col-2 d-flex justify-content-end"
                  ><i
                    class="fas fa-user py-2 px-4 bg-warning rounded rounded-end-0"
                  ></i>
                </label>
                <div class="col-10 px-0">
                  <select
                    v-model="usuario.rol_id"
                    class="form-control rounded-start-0"
                    name="rol"
                    id="rol"
                  >
                    <option disabled>Seleccione un rol</option>
                    <option value="1">Público</option>
                    <option value="2">Administrador</option>
                    <option value="3">Catequista</option>
                    <option value="4">Secretaria</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-12">
              <button class="btn btn-success">Guardar</button>
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
      usuario: {},
    };
  },
  created() {
    this.getUsuario();
  },
  methods: {
    async getUsuario() {
      await this.axios
        .get("/usuarios/encontrar/" + this.$route.params.id)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.usuario = response.data.data;
          console.log(this.usuario);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar el usuario:", error);
        });
    },
    async actualizarUsuario() {
      await this.axios
        .put("/usuarios/actualizar", this.usuario)
        .then((response) => {
          // Manejar la respuesta exitosa
          console.log("usuario actualizado existosamente ", response.data.data);
          this.$router.push({
            name: "usuario",
            params: { id: this.$route.params.id },
          });
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al agregar usuario:", error);
        });
    },
    cerrarFormulario() {
      this.$router.push({ name: "usuario" });
    },
  },
};
</script>

<style>
</style>