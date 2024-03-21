<template>
  <!-- Cabecera con información de la misa -->
  <div class="container">
    <div class="row">
      <div class="col">
        <h1>Nombre de la Misa</h1>
        <p>Fecha y Hora: 20 de marzo de 2024, 10:00 AM</p>
      </div>
      <div class="col text-end">
        <button class="btn btn-primary boton-imprimir">Imprimir</button>
      </div>
    </div>
  </div>

  <!-- Lista de intenciones -->
  <div class="container mt-4">
    <h2>Intenciones</h2>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Ofrece</th>
          <th scope="col">Descripción</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Juan Pérez</td>
          <td>Pedir por la salud de su madre</td>
        </tr>
        <tr>
          <td>Maria González</td>
          <td>Agradecer por un favor recibido</td>
        </tr>
        <!-- Agregar más filas según sea necesario -->
      </tbody>
    </table>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>