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
              <button type="submit" class="btn btn-primary">Ingresar</button>
            </div>
          </div>
        </form>
      </div>
      <div class="card-footer">
        {{ usuario }}
        <router-link to="/"> Registrarse </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      form: {
        usuario: "",
        contra: "",
      },
      usuario:{}
    };
  },
  methods: {
    login() {
      axios
        .post('http://localhost:5050/usuarios/login',this.form)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.usuario = response.data;
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