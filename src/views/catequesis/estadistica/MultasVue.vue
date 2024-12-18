<template>
  <div class="table-responsive">
    <h2 class="d-none d-print-block text-center">CONFIRMACIÓN 2023 </h2>
    <table class="table table-hover table-bordered caption-top">
      <caption class="text-center text-bg-dark bg-opacity-75">Multas pendientes</caption>
      <thead class="table-secondary">
        <tr class="table-group-divider">
          <th scope="col">Nro</th>
          <th scope="col">Nombres</th>
          <th scope="col">Apellidos</th>
          <th scope="col">Atrasos</th>
          <th scope="col">Permisos</th>
          <th scope="col">Faltas</th>
          <th class="table-secondary" scope="col">Multa Total (bs)</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr v-for="(item, index) in catecumenos" :key="index">
          <td class="table-secondary" scope="row">{{ index + 1 }}</td>
          <td>{{ item.nombres }}</td>
          <td>{{ item.apellidos }}</td>
          <td>{{ item.atrasos }}</td>
          <td>{{ item.permisos }}</td>
          <td>{{ item.faltas }}</td>
          <td class="table-warning text-danger">{{ item.multaTotal }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      catecumenos: [],
      asistenciaCatecumenos: [],
      // faltas: 0,
      // permisos: 0,
      // atrasos: 0,
      // multaTotal: 0,
    };
  },
  created() {
    this.getAsistenciaCatecumenos();
  },
  methods: {
    async getAsistenciaCatecumenos() {
      try {
        const response = await this.axios.get(
          "/catecumenos-clase/asistencia-catecumenos"
        );
        // Inicializa la lista de catecúmenos y ademas
        //se le añade las propiedades de faltas,permisos,atrasos y multa total en cada objeto
        this.asistenciaCatecumenos = response.data.data.map((obj) => ({
          ...obj,
          faltas: 0,
          permisos: 0,
          atrasos: 0,
          multaTotal: 0,
        }));

        console.log(
          "tamaño de asisteciaCatecumenos: " + this.asistenciaCatecumenos.length
        );
        // this.catecumenos = [];

        // Procesa la asistencia
        for (let i = 0; i < this.asistenciaCatecumenos.length; i++) {
          let current = this.asistenciaCatecumenos[i];
          console.log("current: " + current);
          // Inicializar contadores para el catecúmeno actual
          let faltas = 0,
            permisos = 0,
            atrasos = 0,
            multaTotal = 0;
          // Agrupar registros del mismo catecúmeno (basado en ID)
          while (
            i < this.asistenciaCatecumenos.length - 1 &&
            current.id === this.asistenciaCatecumenos[i + 1].id
          ) {
            if (current.multa === 5) {
              faltas += 1;
              multaTotal += 5;
            } else if (current.multa === 1) {
              permisos += 1;
              multaTotal += 1;
            } else {
              atrasos += 1;
              multaTotal += 0.5;
            }
            i++;
            current = this.asistenciaCatecumenos[i];

            // Calcula las multas y contadores por cada registro
            // ({ faltas, permisos, atrasos, multaTotal } = this.calculateMulta(
            //   current,
            //   faltas,
            //   permisos,
            //   atrasos,
            //   multaTotal
            // ));
          }
          if (current.multa === 5) {
            faltas += 1;
            multaTotal += 5;
          } else if (current.multa === 1) {
            permisos += 1;
            multaTotal += 1;
          } else {
            atrasos += 1;
            multaTotal += 0.5;
          }
          // // Procesar el último registro del grupo
          // ({ faltas, permisos, atrasos, multaTotal } = this.calculateMulta(
          //   current,
          //   faltas,
          //   permisos,
          //   atrasos,
          //   multaTotal
          // ));
          // Asigna los resultados finales al catecúmeno
          current.faltas = faltas;
          current.permisos = permisos;
          current.atrasos = atrasos;
          current.multaTotal = multaTotal;

          // Añadir el catecúmeno al resultado final
          this.catecumenos.push(current);
        }

        console.log(this.catecumenos);
      } catch (error) {
        console.error(
          "Error al listar la asistencia de los catecumenos:",
          error
        );
      }
    },

    // Función auxiliar para calcular multas
    calculateMulta(obj, faltas, permisos, atrasos, multaTotal) {
      if (obj.multa === 5) {
        faltas += 1;
        multaTotal += 5;
      } else if (obj.multa === 1) {
        permisos += 1;
        multaTotal += 1;
      } else {
        atrasos += 1;
        multaTotal += 0.5;
      }
      return { faltas, permisos, atrasos, multaTotal };
    },
  },
};
</script>
<style>

</style>