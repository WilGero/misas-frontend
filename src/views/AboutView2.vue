<template>
  <div class="container">
    <section class="gallery">
      <div v-for="img in images" :key="img.id" class="gallery-item">
        <img :src="img.url" alt="" loading="lazy" />
      </div>
    </section>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      images: [
        { id: 1, url: require("../assets/carrusel/maria-inmaculada.jpg") },
        { id: 2, url: require("../assets/carrusel/obras-misericordia.jpg") },
        { id: 3, url: require("../assets/carrusel/ramos-olivo.jpg") },
        { id: 4, url: require("../assets/carrusel/semana-santa.jpg") },
        { id: 5, url: require("../assets/carrusel/simbolos-eucaristia.jpg") },
      ],
    };
  },
};
</script>
  
  <style scoped>
.gallery {
  display: flex; /* Alinear imágenes en una fila */
  overflow: hidden; /* Ocultar el scroll y cualquier desbordamiento */
  width: 100%; /* Ajustar el ancho al 100% del contenedor */
  height: 430px; /* Altura fija de la galería */
}

.gallery-item {
  flex: 0 0 20%; /* Ajustar el ancho de cada imagen (20% para 5 imágenes) */
  position: relative; /* Para poder controlar el efecto al pasar el ratón */
  overflow: hidden; /* Ocultar la parte desbordada de la imagen */
  transition: width 0.3s ease; /* Transición para el cambio de ancho */
}

.gallery-item:hover {
  flex: 0 0 22%; /* Aumentar el ancho del contenedor al pasar el ratón */
}

.gallery-item img {
  width: 100%; /* Asegura que la imagen ocupe el 100% del contenedor */
  height: 100%; /* Fijar la altura al 100% del contenedor */
  object-fit: cover; /* Asegura que la imagen cubra el contenedor */
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: 0.8; /* Opacidad inicial */
}

.gallery-item img:hover {
  transform: scale(1.1); /* Aumentar el tamaño de la imagen al pasar el ratón */
  opacity: 1; /* Incrementar la opacidad al 100% */
}
</style>
  