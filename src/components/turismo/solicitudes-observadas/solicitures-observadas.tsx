import { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { getTransporteTurismoPorUser } from "../../../api/t-turismo";


export const SolicitudesObservadas = () => {
  const [errorCargaDeDatos, setErrorCargaDeDatos] = useState(null)
  const [solicitudes, setSolicitudes] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {

    const fetchTurismo = async () => {
      try {

        const fetchedTurismo = await getTransporteTurismoPorUser();

        if (fetchedTurismo.length === 0) setErrorCargaDeDatos('No hay datos')

        setSolicitudes(fetchedTurismo);

        setLoading(false);

      } catch (error) {

        console.error('Error al obtenerNomenclador:', error);
        setLoading(false);
        setErrorCargaDeDatos('Error al obtener datos');

      }
    };

    fetchTurismo();

  }, []);

  return (
    <>
      {
        loading && (
          <div className="loaderInScreens">
            <BallTriangle
              height={100}
              width={100}
              radius={5}
              color="#4fa94d"
              ariaLabel="ball-triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />

          </div>

        )
      }

      {
        errorCargaDeDatos && (
          <div className="mensajeError cargaDatosErro">
            <h3>{errorCargaDeDatos}</h3>
          </div>
        )
      }


      {
        solicitudes
        .filter(solicitud => solicitud.estado === "Observado")
        .map((solicitud, index) => (
          <div key={index} className='multas'>

            <ul id={solicitud.id} >
              <li>Nombre empresa : {solicitud.nombre_empresa}</li>
              <li>Marca del vehículo: {solicitud.nombremarca_vehiculo_empresa}</li>
              <li>Domínio: {solicitud.dominio_vehiculo}</li>
              <li>Conductor/es: {solicitud.nombre_conductores}</li>
              <li>Fecha de ingreso: {solicitud.fecha_hora_ingreso}</li>
              <li>Fecha de egreso: {solicitud.fecha_hora_egreso}</li>
              <li>Ruta de ingreso: {solicitud.ruta_ingreso}</li>
              <li>Ruta de egreso: {solicitud.ruta_egreso}</li>
              <li>Informacion adicional: {solicitud.otra_informacion}</li>
              <li >Estado: <span className={
                solicitud.estado === "Pendiente Revision" ? "" :
                  solicitud.estado === "Observado" ? "resaltarInfo" :
                    "resaltarInfo2"
              }>{solicitud.estado}</span></li>
              {
                solicitud.observaciones &&
                <li>Observacion: {solicitud.observaciones}</li>
              }
            </ul>
            <div className='buttonsCrud'>
            </div>

          </div>
        ))
      }
    </>

  )
}