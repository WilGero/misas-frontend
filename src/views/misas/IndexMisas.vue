<template>
  <div class="container py-4">
    <!-- listado de misas -->
    <div class="card">
      <div class="card-header bg-secondary text-light">
        <div class="row">
          <h2 class="card-title col-9">Misas</h2>
          <div class="col-3">
            <router-link
              :to="{ name: 'agregarMisa' }"
              class="btn btn-success rounded rounded-5 shadow"
            >
              <div class="d-flex align-items-center">
                <span class="me-2"> Nueva misa </span>
                <i class="fas fa-plus fs-1"></i>
              </div>
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
                <th scope="col">Tipo de misa</th>
                <th scope="col">Descripción</th>
                <th scope="col">Fecha</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in misas" :key="item.id_misa">
                <th scope="row">{{ index + 1 }}</th>
                <td>
                  {{ item.tipo_misa }}
                </td>
                <td>{{ item.descripcion }}</td>
                <td>
                  {{ formatDateTime(item.fecha) }}
                </td>
                <td>
                  <div class="btn-group">
                    <router-link
                      class="btn btn-primary btn-sm"
                      :to="{
                        name: 'listadoIntencionesMisa',
                        params: { misaId: item.id_misa },
                      }"
                    >
                      Intenciones
                    </router-link>
                    <router-link
                      class="btn btn-warning"
                      :to="{ name: 'editarMisa', params: { id: item.id_misa } }"
                    >
                      <i class="fas fa-pencil-alt"></i>
                    </router-link>
                    <button
                      class="btn btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#mi-modal"
                      @click="guardarIdMisa(item.id_misa)"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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
              <span>{{ mensaje }}</span>
            </div>
            <p v-else>Esta seguro de eliminar esta misa?</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">
              {{ msgBoton }}</button
            ><button
              v-if="!mostrarAlerta"
              class="btn btn-danger"
              @click="eliminarMisa"
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
import useFormatDate from '@/composables/useFormatDate';

export default {
  setup(){
    const {formatDateTime}=useFormatDate();
    return{
      formatDateTime,
    }
  },
  data() {
    return {
      misas: [],
      mostrarAlerta: false,
      idMisa: null,
      tipoMisa: {},
      msgBoton: "Cancelar",
      respuesta: [],
      mensaje: "Misa eliminada satisfactoriamente",
    };
  },
  created() {
    this.getMisas();
  },
  methods: {
    async getIntencionesMisa(id) {
      console.log(id)
      await this.axios
        .get("/misas/encontrar-intenciones/" +id)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.intencionesMisa = response.data.data;
          console.log(this.intencionesMisa);
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar misas:", error);
        });
    },
    async getMisas() {
      await this.axios
        .get("/misas/listado")
        .then((response) => {
          // Manejar la respuesta exitosa
          this.respuesta = response.data.data;
          console.log(this.respuesta);
          for (let i = 0; i < this.respuesta.length; i++) {
            if (this.respuesta[i].estado === 1) {
              this.misas.push(this.respuesta[i]);
            }
          }
          console.log(this.misas);
          
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar misas:", error);
        });
    },
    async getTipoMisa(id) {
      await this.axios
        .get("/tiposmisa/encontrar/" + id)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.tipoMisa = response.data.data;
          console.log(this.tipoMisa);
          return this.tipoMisa.tipo_misa;
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar el usuario:", error);
        });
    },
    guardarIdMisa(id) {
      this.idMisa = id;
      this.mostrarAlerta = false;
      this.getIntencionesMisa(this.idMisa);
    },
    async eliminarMisa() {
      this.msgBoton = "Cancelar";
      console.log(this.intencionesMisa);
      if (this.idMisa !== null && this.intencionesMisa.length === 0) {
        try {
          await this.axios.delete("/misas/borrar/" + this.idMisa);
          // Manejar la respuesta exitosa
          console.log("misa eliminado con éxito");
          this.mostrarAlerta = true;
          this.msgBoton = "Cerrar";
          this.misas = this.misas.filter((misa) => misa.id_misa != this.idMisa);
        } catch (error) {
          // Manejar errores
          console.error("Error al eliminar la misa:", error);
        } finally {
          // Limpia el ID y cierra el modal, independientemente del resultado
          this.idMisa = null;
        }
      } else {
        this.mensaje =
          "No se puede eliminar la misa, porque tiene registrada intenciones";
        this.mostrarAlerta = true;
        this.msgBoton = "Cerrar";
      }
    },
  },
};
</script>

<style>
</style>