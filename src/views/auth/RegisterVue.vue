<template>
  <div class="container p-4">
    <div class="card shadow bg-light  w-50 w-sm-100 m-auto  border border-3">
      <div class="card-header">
        <h3 class="card-title text-primary fw-bolder">Registrarse</h3>
      </div>
      <div class="card-body">
        <form @submit.prevent="">
          <div class="row px-4 py-2 gy-2">
            <!-- para nombre -->
            <div class="col-12">
              <div class="row m-0">
                <label class="form-label my-0 px-0 col-2 d-flex justify-content-end"
                  ><i class="fas fa-user-circle py-2 px-4 bg-warning rounded rounded-end-0 "></i>
                </label>
                <div class="col-10 px-0">
                  <input class="form-control rounded-start-0" type="text" placeholder="Ingrese su nombre completo"/>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="row m-0">
                <label class="form-label my-0 px-0 col-2 d-flex justify-content-end"
                  ><i class="fas fa-user py-2 px-4 bg-warning rounded rounded-end-0 "></i>
                </label>
                <div class="col-10 px-0">
                  <input class="form-control rounded-start-0" type="text" placeholder="Ingrese su usuario"/>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="row m-0">
                <label class="form-label my-0 px-0 col-2 d-flex justify-content-end"
                  ><i class="fas fa-lock py-2 px-4 bg-warning rounded rounded-end-0"></i>
                </label>
                <div class="col-10 px-0">
                  <input class="form-control rounded-start-0" type="password" placeholder="Ingrese su contraseña"/>
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
export default {};
</script>

<style>
@media only screen and (max-width: 600px) {
  .card {
    min-width: 100%;
  }

  /* Agrega más estilos según sea necesario */
}
</style>