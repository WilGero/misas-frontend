<template>
 <div class="table-responsive">
    <table class="table table-hover">
      <thead>
        <tr>
          <td colspan="8" class="fs-5 fw-bold">Calificaciones</td>
        </tr>
        <tr>
          <th scope="col">Nro</th>
          <th scope="col">Nombres</th>
          <th scope="col">Apellidos</th>
          <th scope="col">1er examen</th>
          <th scope="col">2do examen</th>
          <th scope="col">3er examen</th>
          <th scope="col">4to examen</th>
          <th scope="col">Promedio</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in catecumenos" :key="index">
            <td scope="row">{{ index+1 }}</td>
            <td>{{ item.nombres }}</td>
            <td>{{ item.apellidos }}</td>
            <td>{{ item.atrasos }}</td>
            <td>{{ item.permisos }}</td>
            <td>{{ item.faltas }}</td>
            <td>{{ item.multaTotal }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default{
    data(){
        return{

        }
    }
}
</script>