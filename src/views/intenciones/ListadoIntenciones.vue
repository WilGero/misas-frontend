<template>
  <div class="container my-5">
    <div class="position-relative">
      <div class="position-absolute top-0 left-0">
        <button class="btn btn-secondary" @click="irAtras">
          <i class="fas fa-arrow-left"></i> Volver Atrás
        </button>
      </div>
      <h1 class="text-center my-5 ">Listado de Intenciones</h1>
    </div>
    <!-- Lista de intenciones -->
    <div v-if="activarMsg" class="col-md-6 m-auto">
      <p class="text-center">
        No se agrego ninguna intención, por favor agregue al menos una intención
      </p>
    </div>
    <div
      id="intenciones-lista"
      v-for="(item, index) in intenciones"
      :key="item.id"
    >
      <!-- Ejemplo de una intención -->
      <div class="intencion-item">
        <div class="row align-items-center">
          <div class="col-md-2">
            <p class="fs-4 fw-bold ">{{ index + 1 }}</p>
          </div>
          <div class="col-md-4">
            <h4>Ofrece: {{ item.razon }}</h4>
            <p>{{ item.descripcion }}</p>
          </div>
          <div class="col-md-3">
            <p>Tipo: {{ item.tipo }}</p>
            <p>Costo: {{ item.costo }} Bs</p>
          </div>
          <div class="col-md-3 text-end">
            <div class="btn-group">
              <button class="btn btn-warning btn-sm text-white" @click="editarIntencion(item.id)">
                <i class="fas fa-edit me-2" ></i> Editar
              </button>
              <button
                class="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#mi-modal"
                @click="guardarIdIntencion(item.id)"
              >
                <i class="fas fa-trash"></i> Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Fin del ejemplo -->
    </div>
    <div class="row justify-content-center mt-5">
      <div class="col-auto me-3">
        <label for="montoTotal" class="form-label">Monto Total(Bs):</label>
      </div>
      <div class="col-auto me-3">
        <input
          v-model="suma"
          type="text"
          class="form-control fw-bolder fs-3"
          id="montoTotal"
          disabled
        />
      </div>
      <div class="col-auto">
        <div v-if="!activarMsg">
          <button class="btn btn-primary btn-lg" :class="{ disabled: disabled }" @click="crearSesionPago">
            <i class="fas fa-credit-card"></i> Pagar
          </button>
        </div>
      </div>
    </div>
    <!-- modal para eliminar intencion-->
    <div class="modal fade" id="mi-modal" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title text-danger fw-bolder">Alerta</h3>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div
              v-if="mostrarAlerta"
              class="alert alert-danger alert-dismissible m-4"
            >
              <span class="fw-bold text-danger"
                >Intención eliminada satisfactoriamente</span
              >
            </div>
            <p class="fw-bold text-danger" v-else>
              ¿Esta seguro de eliminar esta intención?
            </p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">
              {{ msgBoton }}</button
            ><button
              v-if="!mostrarAlerta"
              class="btn btn-danger"
              @click="eliminarIntencion"
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
      intenciones: [],
      activarMsg: false,
      suma: 0,
      msgBoton: "Cancelar",
      mostrarAlerta: false,
      idIntencion: null,
      disabled:false
    };
  },
  created() {
    this.getIntenciones();
  },
  methods: {
    async getIntenciones() {
      await this.axios
        .get("/lista-intenciones/encontrar/" + this.$route.params.listaId)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.intenciones = response.data.data;

          if (this.intenciones.length === 0) {
            this.activarMsg = true;
          }
          console.log(this.intenciones);
          for (let i = 0; i < this.intenciones.length; i++) {
            this.suma = this.suma + this.intenciones[i].costo;
          }
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al listar las intenciones:", error);
        });
    },
    irAtras() {
      this.$router.push({
        name: "registrarIntencion",
        params: {
          misaId: this.$route.params.misaId,
          listaId: this.$route.params.listaId,
        },
      });
    },
    guardarIdIntencion(id) {
      this.idIntencion = id;
      this.mostrarAlerta = false;
    },
    async eliminarIntencion() {
      this.msgBoton = "Cancelar";
      if (this.idIntencion !== null) {
        try {
          await this.axios.delete("/intenciones/borrar/" + this.idIntencion);
          // Manejar la respuesta exitosa
          console.log("entencion eliminada con exito");
          this.mostrarAlerta = true;
          this.msgBoton = "Cerrar";
          this.intenciones = this.intenciones.filter(
            (intencion) => intencion.id != this.idIntencion
          );
          this.getIntenciones();
        } catch (error) {
          // Manejar errores
          console.error("Error al eliminar la intencion:", error);
        } finally {
          // Limpia el ID y cierra el modal, independientemente del resultado
          this.idIntencion = null;
        }
      }
    },
    editarIntencion(intencionId){
      this.$router.push({name:'editarIntencion',params:{intencionId:intencionId}});
    },
    async crearSesionPago() {
      console.log(this.$route.params.listaId)
      await this.axios
        .post("/pagos/create-checkout-session/" + this.$route.params.listaId)
        .then((response) => {
          // Manejar la respuesta exitosa
          this.sesion = response.data;
          this.disabled=true;
          console.log(this.sesion);
          window.location.href = this.sesion.url;
        })
        .catch((error) => {
          // Manejar errores
          console.error("Error al crear la sesion de pago:", error);
        });
    },
  },
};
</script>

<style scoped>
.intencion-item {
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 15px;
  background-color: #f8f9fa;
}
</style>