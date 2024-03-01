import { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { getTransporteTurismoPorUser } from "../../../api/t-turismo";
import { useNavigate } from "react-router-dom";


export const SolicitudesObservadas = () => {
  const navigator = useNavigate()
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


  const onClickEdit = (solicitud) => {
    navigator('/edition-solicitud', { state: solicitud })
  }

  return (
    <>
      <h1 className="h1whiteStandar">Solicitudes observadas</h1>
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
            <div key={index} className='solicitudContainer'>
              <div className="infoGral">
                <h3>Informacion General:</h3>
                <ul>
                  <li><b>Nombre empresa:</b> {solicitud.nombre_empresa}</li>
                  <li><b>Marca del vehículo:</b> {solicitud.nombremarca_vehiculo_empresa}</li>
                  <li><b>Domínio:</b> {solicitud.dominio_vehiculo}</li>
                  <li><b>Conductor/es:</b> {solicitud.nombre_conductores}</li>
                  <li><b>Informacion adicional:</b> {solicitud.otra_informacion}</li>
                </ul>
              </div>
              <div className="estado">
              <h3>Estado:</h3>
                <ul>
                  <li><b>Estado: </b><span className={
                    solicitud.estado === "Pendiente Revision" ? "" :
                      solicitud.estado === "Observado" ? "resaltarInfo" :
                        "resaltarInfo2"
                  }>{solicitud.estado}</span></li>
                  {
                    solicitud.observaciones &&
                    <li><b>Observacion: </b>{solicitud.observaciones}</li>
                  }
                </ul>

              </div>
              <div className="rutaFecha">
                <h3>Ruta y fecha:</h3>
                <ul>
                  <li><b>Fecha de ingreso: </b>{solicitud.fecha_hora_ingreso}</li>
                  <li><b>Fecha de egreso: </b>{solicitud.fecha_hora_egreso}</li>
                  <li><b>Ruta de ingreso: </b>{solicitud.ruta_ingreso}</li>
                  <li><b>Ruta de egreso: </b>{solicitud.ruta_egreso}</li>
                </ul>

              </div>
              <div className="buttons">
              <button onClick={() => onClickEdit(solicitud)}>Editar</button>
              </div>
            </div>
          ))
      }
    </>

  )
}
