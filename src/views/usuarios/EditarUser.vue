<template>
  <!-- formulario para actualizar un usuario -->
  <div class="container m-auto py-4">
    <div v-if="mostrarAlerta" class="alert alert-success alert-dismissible m-4">
      <span>Usuario actualizado satisfactoriamente</span>
      <button class="btn-close" @click="cerrarAlerta"></button>
    </div>

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
                  for="rol_nombre"
                  class="form-label my-0 px-0 col-2 d-flex justify-content-end"
                  ><i
                    class="fas fa-child py-2 px-4 bg-warning rounded rounded-end-0"
                  ></i>
                </label>
                <div class="col-10 px-0">
                  <input
                    v-model="rol.nombre"
                    id="rol_nombre"
                    class="form-control rounded-start-0"
                    type="text"
                    disabled
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
                    class="fas fa-exchange py-2 px-4 bg-warning rounded rounded-end-0"
                  ></i>
                </label>
                <div class="col-10 px-0">
                  <select
                    v-model="rolSeleccionado"
                    class="form-control rounded-start-0"
                    name="rol"
                    id="rol"
                  >
                    <option v-for="rol in roles" :key="rol.id" :value="rol.id">
                      {{ rol.nombre }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-12">
              <button type="submit" class="btn btn-secondary" @click="cerrarFormulario">Cancelar</button>
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
      rol: {},
      roles: [],
      rolSeleccionado: null,
      mostrarAlerta: false,
    };
  },
  created() {
    this.getUsuario();
    this.getRoles();
  },
  methods: {
    async getRoles() {
      await this.axios
        .get("/roles/listado")
        .then((response) => {
          // Manejar la respuesta exitosa
          this.roles = response.data.data;

          // Agregar la opción predeterminada "Seleccione un rol"
          this.roles.unshift({ id: null, nombre: "Seleccione otro rol..." });
          console.log(this.roles);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar roles:", error);
        });
    },
    async getUsuario() {
      await this.axios
        .get("/usuarios/encontrar/" + this.$route.params.id)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.usuario = response.data.data;
          console.log(this.usuario);
          this.getRol();
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar el usuario:", error);
        });
    },
    async getRol() {
      console.log(this.usuario.rol_id);
      await this.axios
        .get("/roles/encontrar/" + this.usuario.rol_id)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.rol = response.data.data;
          console.log(this.rol);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar el usuario:", error);
        });
    },
    async actualizarUsuario() {
      if (this.rolSeleccionado !== null) {
        this.usuario.rol_id = this.rolSeleccionado;
      }
      console.log(this.usuario);
      await this.axios
        .put("/usuarios/actualizar", this.usuario)
        .then((response) => {
          // Manejar la respuesta exitosa
          console.log("usuario actualizado exitosamente ", response.data.data);
          this.mostrarAlerta = true;
          setTimeout(() => {
            // Cambia "nombreDeLaRuta" con el nombre de la ruta a la que deseas redirigir
            this.$router.push({
              name: "usuario",
              params: { id: this.$route.params.id },
            });
          }, 2000); // 3000 milisegundos = 3 segundos
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al actualizar usuario:", error);
        });
    },
    cerrarFormulario() {
      this.$router.push({ name: "usuario" });
    },
    cerrarAlerta() {
      this.mostrarAlerta = false;
    },
  },
};
</script>

<style>
</style>