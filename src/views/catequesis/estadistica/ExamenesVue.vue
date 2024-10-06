<template>
  <div class="table-responsive">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">Nro</th>
          <th scope="col">Título</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(examen, index) in examenes" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ examen }}</td>
        </tr>
      </tbody>
    </table>
    <table class="table table-hover table-dark">
      <thead>
        <tr>
          <th colspan="9" class="fs-5 fw-bold">Calificaciones</th>
        </tr>
        <tr class="table-group-divider">
          <th scope="col">Nro</th>
          <th scope="col">Nombres</th>
          <th scope="col">Apellidos</th>
          <th scope="col">
            Nro-1
            <!-- <tr>
              <td colspan="5">Examenes</td>
            </tr> -->
            <!-- <tr>
              <td v-for="(numero, indice) in catecumenos.notas" :key="indice" scope="col">
                {{ indice }}
              </td>
            </tr> -->
          </th>
          <th scope="col">Nro-2</th>
          <th scope="col">Nro-3</th>
          <th scope="col">Nro-4</th>
          <th scope="col">Nro-5</th>
          <th rowspan="2" scope="col" class="table-primary">Promedio</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr v-for="(item, index) in catecumenos" :key="index">
          <td scope="row">{{ index + 1 }}</td>
          <td>{{ item.nombres }}</td>
          <td>{{ item.apellidos }}</td>
          <td>{{ item.notas[0] }}</td>
          <td>{{ item.notas[1] }}</td>
          <td>{{ item.notas[2] }}</td>
          <td>{{ item.notas[3] }}</td>
          <td>{{ item.notas[4] }}</td>
          <td
            :class="
              item.promedio < 51 ? 'table-danger text-danger' : 'table-success'
            "
            class="fw-bolder"
          >
            {{ item.promedio }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // lista: ["Nro 1", "Nro 2", "Nro 3", "Nro 4", "Nro 5", "Nro 6", "Nro 7"],
      catecumenoExamenes: [],
      catecumenos: [],
      examenes: [],
    };
  },
  created() {
    this.getCatecumenoExamenes();
  },
  methods: {
    async getCatecumenoExamenes() {
      try {
        const response = await this.axios.get(
          "catecumenos-examen/listado-catecumenos"
        );
        // Inicializa la lista de catecúmenos y ademas
        //se le añade las propiedades de faltas,permisos,atrasos y multa total en cada objeto
        this.catecumenoExamenes = response.data.data.map((obj) => ({
          ...obj,
          notas: [],
          promedio: 0,
        }));
        this.crearListaExamenes(this.catecumenoExamenes);

        // Procesa la asistencia
        for (let i = 0; i < this.catecumenoExamenes.length; i++) {
          let item = this.catecumenoExamenes[i];
          // Agrupar registros del mismo catecúmeno (basado en ID)
          let notas = [];
          while (
            i < this.catecumenoExamenes.length - 1 &&
            item.id === this.catecumenoExamenes[i + 1].id
          ) {
            i++;
            notas.push(item.nota_final);
            item = this.catecumenoExamenes[i];
          }
          // Añadir el catecúmeno al resultado final
          notas.push(item.nota_final);
          const suma = notas.reduce(
            (acumulador, valorActual) => acumulador + valorActual,
            0
          );
          item.notas = notas;
          item.promedio = suma / notas.length;
          this.catecumenos.push(item);
        }
        console.log(this.catecumenos);
      } catch (error) {
        console.error(
          "Error al listar los e=catecumenos y sus examenes:",
          error
        );
      }
    },
    crearListaExamenes(listaObjetos) {
      this.examenes = Object.values(
        listaObjetos.reduce((acumulador, objeto) => {
          if (!acumulador[objeto.titulo]) {
            acumulador[objeto.titulo] = objeto;
          }
          return acumulador;
        }, {})
      ).map((objeto) => objeto.titulo);
    },
  },
};
</script>