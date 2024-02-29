import deleteSolicitudTurismo from "../../../api/eliminar-solicitud-turismo"


export const RenderSolicitudes = ({ solicitudes, onDeleteSolicitud }) => {

  const onClickEdit = (solicitud) => {
    console.log({ EditarSol: solicitud })
  }

  const onClickDelete = async (solicitud) => {
    onDeleteSolicitud(solicitud.id)
    await deleteSolicitudTurismo(solicitud.id)
  }

  return (
    <>
      {
        solicitudes.map((solicitud, index) => (
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
              <button onClick={() => onClickEdit(solicitud)}>Editar</button>
              <button onClick={() => onClickDelete(solicitud)}>Eliminar</button>
            </div>

          </div>
        ))
      }
    </>

  )
}