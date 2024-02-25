<template>
  <div class="container">
    <div class="card w-75 m-auto">
      <div class="card-header">
        <h3>Información del usuario</h3>
      </div>
      <div class="card-body">
        <div class="mb-3 fw-bold row">
          <label for="nombre" class="col-sm-2 col-form-label">Nombre:</label>
          <div class="col-sm-10">
            <input
              v-model="usuario.nombre_usuario"
              type="text"
              readonly
              class="form-control-plaintext text-center text-sm-start"
              id="nombre"
            />
          </div>
        </div>
        <div class="mb-3 fw-bold row">
          <label for="nombre" class="col-sm-2 col-form-label">Usuario:</label>
          <div class="col-sm-10">
            <input
              v-model="usuario.usuario"
              type="text"
              readonly
              class="form-control-plaintext text-center text-sm-start"
              id="nombre"
            />
          </div>
        </div>
        <div class="mb-3 fw-bold row">
          <label for="nombre" class="col-sm-2 col-form-label">Rol:</label>
          <div class="col-sm-10">
            <input
              v-model="usuario.nombre_rol"
              type="text"
              readonly
              class="form-control-plaintext text-center text-sm-start"
              id="nombre"
            />
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="d-flex justify-content-around">
          <button class="btn btn-secondary" @click="irAtras">Atras</button>
          <router-link :to="{ name: 'editarUsuario',params:{id:this.$route.params.id} }" class="btn btn-warning"
            >Editar</router-link
          >
        </div>
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
    irAtras() {
      this.$router.push({ name: "usuarios" });
    },
  },
};
</script>

<style>
</style>