<template>
  <div class="container">
    <div class="d-lg-flex justify-content-center align-items-center">
      <div class="mx-0">
        <router-view />
      </div>
      <div class="w-75 m-auto">
        <div class="row p-2">
          <!-- listado de usuarios -->
          <div class="card col-lg-6 w-100">
            <div class="card-header bg-primary text-light">
              <div class="row">
                <h2 class="card-title col-9">Usuarios</h2>
                <div class="col-3">
                  <router-link
                    to="/usuarios/agregar"
                    class="btn btn-success rounded rounded-5 shadow"
                  >
                    <i class="fas fa-plus fs-1"></i>
                  </router-link>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table">
                  <thead class="table-primary">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Usuario</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in usuarios"
                      :key="item.id"
                      class=""
                    >
                      <td scope="row">{{ index + 1 }}</td>
                      <td>
                        <router-link
                          :to="{ name: 'usuario', params: { id: item.id } }"
                          >{{ item.usuario }}</router-link
                        >
                      </td>

                      <td>
                        <button
                          class="btn btn-danger"
                          @click="EliminarUsuario(item.id)"
                        >
                          <i class="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usuarios: [],
    };
  },
  watch: {
    usuarios: {
      handler(newUsuarios, oldUsuarios) {
        console.log(oldUsuarios);
        // Se ejecutará cuando la lista de usuarios cambie
        console.log('La lista de usuarios ha cambiado:', newUsuarios);
        // Puedes realizar otras acciones aquí
      },
      deep: true // Observar cambios en la profundidad de la propiedad
    }
  },
  created() {
    this.getUsuarios();
  },
  methods: {
    async getUsuarios() {
      await this.axios
        .get("/usuarios/listado")
        .then((response) => {
          // Manejar la respuesta exitosa
          this.usuarios = response.data.data;
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar usuarios:", error);
        });
    },
    async EliminarUsuario(id) {
      await this.axios
        .delete("/usuarios/borrar/"+id)
        .then((response) => {
          // Manejar la respuesta exitosa
          console.log(response);
          this.usuarios = this.usuarios.filter((user) => user.id != id);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al eliminar el usuario:", error);
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