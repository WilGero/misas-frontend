import moment from "moment";

export default function useFormatDate() {
    // metodos
    const formatDateTime = (datetime) => {
        return moment(datetime)
            .locale("es")
            .format("D [de] MMMM [del] YYYY, h:mm a");
    };
    const formatDate = (date) => {
        return moment(date)
            .locale("es")
            .format("D [de] MMMM [del] YYYY");
    };
    const formatTime = (date) => {
        return moment(date)
            .locale("es")
            .format("h:mm a");
    };
    const calcularDiferenciaFechaHoraEnHoras=(fechaHora)=> {
        // Convertir la fecha y hora específica a un objeto Moment
        const fechaHoraMoment = moment(fechaHora); //fecha de momento objetivo
  
        // Obtener la fecha y hora actual
        const fechaHoraActual = moment(); //fecha de momento base
  
        // Calcular la diferencia en milisegundos entre las dos fechas y horas
        const diferenciaEnHoras = fechaHoraMoment.diff(fechaHoraActual, "hours");
        return diferenciaEnHoras;
      };
    return {
        formatDate,
        formatTime, formatDateTime,calcularDiferenciaFechaHoraEnHoras
    };

}
