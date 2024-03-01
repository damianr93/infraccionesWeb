import { useNavigate } from "react-router-dom"
import deleteSolicitudTurismo from "../../../api/eliminar-solicitud-turismo"


export const RenderSolicitudes = ({ solicitudes, onDeleteSolicitud }) => {

  const navigation = useNavigate()

  const onClickEdit = (solicitud) => {
    navigation('/edition-solicitud', { state: solicitud })
  }

  const onClickDelete = async (solicitud) => {
    onDeleteSolicitud(solicitud.id)
    await deleteSolicitudTurismo(solicitud.id)
  }

  return (
    <>
      {
        solicitudes.map((solicitud, index) => (
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
              <button onClick={() => onClickDelete(solicitud)}>Eliminar</button>
            </div>
          </div>
        ))
      }
    </>

  )
}