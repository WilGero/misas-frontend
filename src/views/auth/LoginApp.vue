<template>
  <div class="container p-4">
    <!-- Alerta de registro exitoso -->
    <div v-if="mostrarAlerta" class="alert alert-danger alert-dismissible m-4">
      <span>Usuario o contraseña incorrectos!</span>
      <button class="btn-close" @click="cerrarAlerta"></button>
    </div>

    <div class="card shadow bg-light w-50 w-sm-100 m-auto border border-3">
      <div class="card-header">
        <h3 class="card-title text-primary fw-bolder">Inicio de Sesión</h3>
      </div>
      <div class="card-body">
        <form @submit.prevent="login">
          <div class="row px-4 py-2 gy-2">
            <!-- para el usuario -->
            <div class="col-12">
              <div class="row m-0">
                <label
                  class="form-label my-0 px-0 col-2 d-flex justify-content-end"
                  ><i
                    class="fas fa-user py-2 px-4 bg-warning rounded rounded-end-0"
                  ></i>
                </label>
                <div class="col-10 px-0">
                  <input
                    v-model="form.usuario"
                    class="form-control rounded-start-0"
                    type="text"
                    placeholder="Ingrese su usuario"
                  />
                </div>
              </div>
            </div>
            <!-- para la contraseña -->
            <div class="col-12">
              <div class="row m-0">
                <label
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
            <!-- boton para ingresar -->
            <div class="col-12">
              <button
                type="submit"
                class="btn btn-primary"
                :class="{ disabled: disabled }"
              >
                Ingresar
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="card-footer">
        <router-link :to="{ name: 'register' }"> Registrarse </router-link>
      </div>
      {{ auth }}
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      disabled: false,
      form: {
        usuario: "",
        contra: "",
        email:""
      },
      usuario: {},
      mostrarPassword: false,
      mostrarAlerta: false,
    };
  },
  computed: {
    ...mapState(["auth"]),
  },
  // whatch:{
  //   auth(newValue){
  //     if(newValue){
  //       this.axios.defaults.headers.common['Authorization']='Bearer '+newValue.token;
  //     }
  //   }
  // },
  methods: {
    ...mapMutations(["setAuth"]),
    login() {
      this.axios
        .post("usuarios/login", this.form)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.usuario = response.data;
          this.setAuth(this.usuario);
          localStorage.setItem("auth", JSON.stringify(this.usuario));
          this.disabled = true;
          this.$router.push({ name: "home" });
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al ingresar al sistema:", error);
          this.mostrarAlerta = true;
        });
    },
    loginPayment() {
      this.axios
        .post("payments/login", this.form.email)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.usuario = response.data;
          this.setAuth(this.usuario);
          localStorage.setItem("auth", JSON.stringify(this.usuario));
          this.disabled = true;
          this.$router.push({ name: "home" });
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al ingresar al sistema:", error);
          this.mostrarAlerta = true;
        });
    },
    cambiarMostrarPassword() {
      this.mostrarPassword = !this.mostrarPassword;
    },
    cerrarAlerta() {
      this.mostrarAlerta = false;
    },
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