<template>
  <div class="container">
    <div class="d-lg-flex justify-content-center pt-4">
      <div class="mx-0">
        <router-view />
      </div>
      <div class="w-75 m-auto">
        <div class="row p-2">
          <!-- listado de usuarios -->
          <div class="card col-lg-6 w-100">
            <div class="card-header bg-secondary text-light">
              <div class="row">
                <h2 class="card-title col-9">Usuarios</h2>
                <div class="col-3">
                  <router-link
                    :to="{ name: 'agregarUsuario' }"
                    class="btn btn-success rounded rounded-5 shadow"
                  >
                    <i class="fas fa-user-plus fs-1"></i>
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
                          data-bs-toggle="modal"
                          data-bs-target="#mi-modal"
                          @click="guardarIdUsuario(item.id)"
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
    <!-- modal para eliminar un usuario-->
    <div class="modal fade" id="mi-modal" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Alerta!!!</h3>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div
              v-if="mostrarAlerta"
              class="alert alert-danger alert-dismissible m-4"
            >
              <span>Usuario eliminado satisfactoriamente</span>
            </div>
            <p v-else>Esta seguro de eliminar el usuario?</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">
              {{ msgBoton }}</button
            ><button
              v-if="!mostrarAlerta"
              class="btn btn-danger"
              @click="eliminarUsuario"
            >
              Eliminar
            </button>
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
      idUsuario: null,
      mostrarAlerta: false,
      msgBoton: "Cancelar",
    };
  },
  created() {
    this.getUsuarios();
  },
  updated() {
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
    guardarIdUsuario(id) {
      this.idUsuario = id;
      this.mostrarAlerta = false;
    },
    async eliminarUsuario() {
      this.msgBoton = "Cancelar";
      if (this.idUsuario !== null) {
        try {
          await this.axios.delete("/usuarios/borrar/" + this.idUsuario);
          // Manejar la respuesta exitosa
          console.log("Usuario eliminado con éxito");
          this.mostrarAlerta = true;
          this.msgBoton = "Cerrar";
          this.usuarios = this.usuarios.filter(
            (user) => user.id != this.idUsuario
          );
        } catch (error) {
          // Manejar errores
          console.error("Error al eliminar el usuario:", error);
        } finally {
          // Limpia el ID y cierra el modal, independientemente del resultado
          this.idUsuario = null;
        }
      }
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