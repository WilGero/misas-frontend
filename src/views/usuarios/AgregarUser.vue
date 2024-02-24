<template>
  <!-- formulario de registro de usuarios -->
  <div
    class="card shadow bg-light w-50 w-sm-100 m-auto border border-3 p-2 mb-2"
  >
    <div class="card-header position-relative p-4">
      <h3 class="card-title text-primary fw-bolder me-2">Agregar nuevo usuario</h3>

      <button class="btn btn-danger position-absolute end-0 top-0" @click="cerrarFormulario">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="card-body">
      <form @submit.prevent="agregarUsuario">
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
                  v-model="form.nombre"
                  id="nombre"
                  class="form-control rounded-start-0"
                  type="text"
                  placeholder="Ingrese su nombre completo"
                  required
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
                  v-model="form.usuario"
                  id="usuario"
                  class="form-control rounded-start-0"
                  type="text"
                  placeholder="Ingrese su usuario"
                  required
                />
              </div>
            </div>
          </div>
          <div class="col-12">
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
                  v-model="form.contra"
                  id="contra"
                  class="form-control rounded-start-0"
                  type="password"
                  placeholder="Ingrese su contraseña"
                  required
                />
              </div>
            </div>
          </div>
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
                  v-model="form.rol_id"
                  class="form-control rounded-start-0"
                  name="rol"
                  id="rol"
                  required
                >
                  <option selected disabled>Seleccione un rol</option>
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
</template>

<script>
export default {
  data() {
    return {
      form: {
        nombre: "",
        usuario: "",
        contra: "",
        rol_id: 0,
      },
    };
  },
  methods: {
    async agregarUsuario() {
      await this.axios
        .post("/usuarios/agregar", this.form)
        .then((response) => {
          // Manejar la respuesta exitosa
          console.log("usuario agregado existosamente ", response.data.data);
          this.form = {
            nombre: "",
            usuario: "",
            contra: "",
            rol_id: 0,
          };
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al agregar usuario:", error);
        });
    },
    cerrarFormulario() {
      this.$router.push({ name: "usuarios" });
    },
  },
};
</script>

<style>
</style>