<template>
  <div class="container">
    <h2>Asistencias y multas</h2>
    <button class="btn btn-primary" @click="printSection"><i class="fas fa-print"></i> Imprimir</button>
    <div class="table-responsive" id="printable">
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th class="bg-warning fs-3" colspan="7">Multas</th>
          </tr>
          <tr>
            <th>Nro</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <!-- <th>CI</th> -->
            <th>Atrasos</th>
            <th class="text-primary fw-semibold">Permisos</th>
            <th class="text-danger fw-semibold">Faltas</th>
            <th>Multa total (Bs)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in catecumenos" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.nombres }}</td>
            <td>{{ item.apellidos }}</td>
            <td>{{ item.atrasos }}</td>
            <td>{{ item.permisos }}</td>
            <td>{{ item.faltas }}</td>
            <td class="fs-5 fw-bold table-danger table-bordered">{{ item.multaTotal }}</td>
          </tr>
          <!-- Agrega más filas según sea necesario -->
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      asistenciaCatecumenos: [],
      catecumenos: [],
      falta: 0,
      permiso: 0,
      atraso: 0,
      cont: 0,
      multaTotal: 0,
    };
  },
  created() {
    this.getAsistenciaCatecumenos();
  },
  methods: {
    async getAsistenciaCatecumenos() {
      await this.axios
        .get("/catequesis/asistencia-catecumenos")
        .then((response) => {
          // Manejar la respuesta exitosa
          this.asistenciaCatecumenos = response.data.data;
          this.asistenciaCatecumenos.forEach((obj) => {
            obj.faltas = 0;
            obj.permisos = 0;
            obj.atrasos = 0;
            obj.multaTotal = 0;
          });
          console.log(this.asistenciaCatecumenos);
          for (let i = 0; i < this.asistenciaCatecumenos.length; i++) {
            if (
              i < this.asistenciaCatecumenos.length - 1 &&
              this.asistenciaCatecumenos[i].id ===
                this.asistenciaCatecumenos[i + 1].id
            ) {
              this.cont += 1;
              if (this.asistenciaCatecumenos[i].multa === 5) {
                this.falta += 1;
                this.multaTotal += 5;
              } else if (this.asistenciaCatecumenos[i].multa === 1) {
                this.permiso += 1;
                this.multaTotal += 1;
              } else {
                this.atraso += 1;
                this.multaTotal += 0.5;
              }
            } else {
              this.cont += 1;
              if (this.asistenciaCatecumenos[i].multa === 5) {
                this.falta += 1;
                this.multaTotal += 5;
              } else if (this.asistenciaCatecumenos[i].multa === 1) {
                this.permiso += 1;
                this.multaTotal += 1;
              } else {
                this.atraso += 1;
                this.multaTotal += 0.5;
              }
              this.asistenciaCatecumenos[i].faltas = this.falta;
              this.asistenciaCatecumenos[i].permisos = this.permiso;
              this.asistenciaCatecumenos[i].atrasos = this.atraso;
              this.asistenciaCatecumenos[i].multaTotal = this.multaTotal;
              this.catecumenos.push(this.asistenciaCatecumenos[i]);
              this.falta = 0;
              this.permiso = 0;
              this.atraso = 0;
              this.cont = 0;
              this.multaTotal=0;
            }
          }
          console.log(this.catecumenos);
        })
        .catch((error) => {
          // Manejar errores
          console.error(
            "Error al listar la asistencia de los catecumenos:",
            error
          );
        });
    },
    printSection() {
      const printContent = document.getElementById('printable').innerHTML;
      const originalContent = document.body.innerHTML;

      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContent;

      window.location.reload(); // Recargar la página para restaurar los scripts y el estado original
    }
  },
};
</script>