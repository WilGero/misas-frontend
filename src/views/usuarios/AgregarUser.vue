<template>
  <!-- Alerta de registro exitoso -->
  <div v-if="mostrarAlerta" class="alert alert-success alert-dismissible m-4">
    <span>Usuario registrado satisfactoriamente</span>
    <button class="btn-close" @click="cerrarAlerta"></button>
  </div>
  <!-- formulario de registro de usuarios -->
  <div
    class="card shadow bg-light w-50 w-sm-100 m-auto border border-3 p-2 mb-2"
  >
    <div class="card-header position-relative p-4">
      <h3 class="card-title text-primary fw-bolder me-2">
        Agregar nuevo usuario
      </h3>

      <button
        class="btn btn-danger position-absolute end-0 top-0"
        @click="cerrarFormulario"
      >
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
              <div class="col-8 px-0">
                <input
                v-model="form.contra"
                  id="contra"
                  class="form-control rounded-start-0"
                  :type=" mostrarPassword ? 'text' : 'password'"
                  placeholder="Ingrese su contraseña"
                  required
                />
              </div>
              <div class="col-2 px-0">
                <button type="button" class="btn btn-light mx-0" @click="cambiarMostrarPassword">
                  <i
                    :class="mostrarPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                  ></i>
                </button>
              </div>
            </div>
          </div>
    
          <div class="col-12">
            <div class="row m-0">
              <label
                for="rol"
                class="form-label my-0 px-0 col-2 d-flex justify-content-end"
                ><i
                  class="fa fa-child py-2 px-4 bg-warning rounded rounded-end-0"
                ></i>
              </label>
              <div class="col-10 px-0">
                <select
                  v-model="rolSeleccionado"
                  class="form-control rounded-start-0"
                  name="rol"
                  id="rol"
                  required
                >
                  <option v-for="rol in roles" :key="rol.id" :value="rol.id">
                    {{ rol.nombre }}
                  </option>
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
        rol_id: null,
      },
      roles: [],
      rolSeleccionado: null,
      mostrarPassword: false,
      mostrarAlerta:false
    };
  },
  created() {
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
          this.roles.unshift({ id: null, nombre: "Seleccione un rol..." });
          console.log(this.roles);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar roles:", error);
        });
    },
    async agregarUsuario() {
      if (this.rolSeleccionado !== null) {
        this.form.rol_id = this.rolSeleccionado;
      }
      else{
        this.form.rol_id = this.roles[1].id;
      }
      console.log(this.form);
      await this.axios
        .post("/usuarios/agregar", this.form)
        .then((response) => {
          // Manejar la respuesta exitosa
          console.log("usuario agregado exitosamente ", response.data.data);
          this.mostrarAlerta=true;
          setTimeout(() => {
            // Cambia "nombreDeLaRuta" con el nombre de la ruta a la que deseas redirigir
          this.mostrarAlerta = false;
          }, 2000); // 3000 milisegundos = 2 segundos
          this.form = {
            nombre: "",
            usuario: "",
            contra: "",
            rol_id: null,
          };
          this.rolSeleccionado = null;
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al agregar usuario:", error);
        });
    },
    cerrarFormulario() {
      this.$router.push({ name: "usuarios" });
    },
    cambiarMostrarPassword(){
      this.mostrarPassword=!this.mostrarPassword;
    },
    cerrarAlerta(){
      this.mostrarAlerta=false;
    }
  },
};
</script>

<style>
</style>