<template>
  <div class="container my-5 py-4">
    <div class="d-flex justify-content-center">
      <!-- Carrusel -->
      <div
        id="carouselExampleControls"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="../assets/carrusel/obras-misericordia.jpg"
              class="d-block w-100"
              alt="obras de misericordia"
            />
          </div>
          <div class="carousel-item">
            <img
              src="../assets/carrusel/ramos-olivo.jpg"
              class="d-block w-100"
              alt="los ramos de olivo"
            />
          </div>
          <div class="carousel-item">
            <img
              src="../assets/carrusel/semana-santa.jpg"
              class="d-block w-100"
              alt="semana-santa"
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    <!-- Historia -->
    <section class="historia">
      <div class="container">
        <h2>Historia</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. In incidunt aperiam
          voluptatem reiciendis quisquam recusandae at. Laudantium, voluptates
          numquam harum totam libero autem ut tenetur ducimus sequi praesentium
          quisquam cumque!
        </p>
      </div>
    </section>

    <!-- Miembros actuales -->
    <section class="miembros">
      <div class="container">
        <h2>Miembros Actuales</h2>
        <ul>
          <li>Parroco: Nombre del Parroco</li>
          <li>Secretaria: Nombre de la Secretaria</li>
          <li>Monaguillos: Nombre de los Monaguillos</li>
          <li>Catequistas: Nombre de los Catequistas</li>
          <li>Grupo Juvenil: Nombre del Grupo Juvenil</li>
          <li>Grupo de Oración: Nombre del Grupo de Oración</li>
          <!-- Agregar más miembros según sea necesario -->
        </ul>
      </div>
    </section>
  </div>
</template>
<script>
</script>
<style scoped>
.carousel-item {
  height: 400px; /* Altura del carrusel */
  width: 900px;
}
.historia {
  background-color: #f8f9fa;
  padding: 50px 0;
}
.carousel-item img {
  height: 400px; /* Altura del carrusel */
}
.miembros {
  padding: 50px 0;
}

@media (max-width: 844px) {
  /* Agrega tus estilos CSS aquí */
  .carousel-item {
    height: 300px; /* Altura del carrusel */
    width: 400px;
  }
  .carousel-item img {
    height: 300px; /* Altura del carrusel */
  }
}
</style>