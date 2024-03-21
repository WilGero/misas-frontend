<template>
  <div class="container p-4">
      <!-- Alerta de registro exitoso -->
  <div v-if="mostrarAlerta" class="alert alert-success alert-dismissible m-4">
    <span>Usuario registrado satisfactoriamente</span>
    <button class="btn-close" @click="cerrarAlerta"></button>
  </div>

    <div class="card shadow bg-light w-50 w-sm-100 m-auto border border-3">
      <div class="card-header">
        <h3 class="card-title text-primary fw-bolder">Registrarse</h3>
      </div>
      <div class="card-body">
        <form @submit.prevent="registrarUsuario">
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
                <div class="col-8 px-0">
                  <input
                    v-model="form.contra"
                    id="contra"
                    class="form-control rounded-start-0"
                    :type="mostrarPassword ? 'text' : 'password'"
                    placeholder="Ingrese su contraseña"
                    required
                  />
                </div>
                <div class="col-2 px-0">
                  <button
                    type="button"
                    class="btn btn-light mx-0"
                    @click="cambiarMostrarPassword"
                  >
                    <i
                      :class="
                        mostrarPassword ? 'fas fa-eye-slash' : 'fas fa-eye'
                      "
                    ></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="col-12">
              <button class="btn btn-primary">Registrarse</button>
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
      form: {
        nombre: "",
        usuario: "",
        contra: "",
        rol_id: null,
      },
      roles: [],
      mostrarPassword: false,
      mostrarAlerta:false
    };
  },
  created(){
    this.getRoles();
  },
  methods: {
    async getRoles() {
      await this.axios
        .get("/roles/listado")
        .then((response) => {
          // Manejar la respuesta exitosa
          this.roles = response.data.data;
          console.log(this.roles);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar roles:", error);
        });
    },
    async registrarUsuario() {
      this.form.rol_id = this.roles[0].id;
      console.log(this.form);
      await this.axios
        .post("/usuarios/agregar", this.form)
        .then((response) => {
          // Manejar la respuesta exitosa
          console.log("usuario agregado existosamente ", response.data.data);
          this.mostrarAlerta = true;
          setTimeout(() => {
            // Cambia "nombreDeLaRuta" con el nombre de la ruta a la que deseas redirigir
            this.$router.push({
              name: "login",
            });
          }, 1500); // 3000 milisegundos = 3 segundos

        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al agregar usuario:", error);
        });
    },
    cambiarMostrarPassword() {
      this.mostrarPassword = !this.mostrarPassword;
    },
    cerrarAlerta(){
      this.mostrarAlerta=false;
    }
  },
};
</script>

<style>
@media only screen and (max-width: 600px) {
  .card {
    min-width: 100%;
  }

  /* Agrega más estilos según sea necesario */
}
</style>