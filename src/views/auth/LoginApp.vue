<template>
  <div class="container p-4">
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
                <div class="col-10 px-0">
                  <input
                    v-model="form.contra"
                    class="form-control rounded-start-0"
                    type="password"
                    placeholder="Ingrese su contraseña"
                  />
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
        <router-link to="/"> Registrarse </router-link>
      </div>
      {{ auth }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      disabled: false,
      form: {
        usuario: "",
        contra: "",
      },
      usuario: {},
    };
  },
  computed: {
    ...mapState(['auth'])
  },
  methods: {
    ...mapMutations(["setAuth"]),
    login() {
      this.disabled = true;
      axios
        .post("http://localhost:5050/usuarios/login", this.form)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.usuario = response.data;
          this.setAuth(this.usuario);
          localStorage.setItem("auth",JSON.stringify(this.usuario));
          this.disabled = false;
          this.$router.push({name:'home'});
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al ingresar al sistema:", error);
        });
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