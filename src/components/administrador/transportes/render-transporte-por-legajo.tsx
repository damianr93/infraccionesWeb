import { useNavigate } from "react-router-dom"
import deleteTransporte from "../../../api/eliminar-transporte";


export const RenderTransportePorLegajo = ({ legajoNum, transport, deletedTransp }) => {
  const navigation = useNavigate()
  const transporte = transport.find(transp => transp.numero_legajo === legajoNum)

  if (!transporte) {
    return (
      <div className="errorMessage">Especifique un número correcto de legajo.</div>);
  }

  const onClickDelete = async (transporte) => {
    deletedTransp(transporte.id)
    await deleteTransporte(transporte.id)
  }

  const onClickEdit = (transporte) => {
    navigation('/edition-transporte', { state: transporte })
  }


  return (
    <div className='transporteContainer'>
      <div className="transpEncabezado">
        <h3>Número de Legajo: {transporte.numero_legajo}</h3>
      </div>
      <div className="transpInfoVehiculo">
        <h3>Informacion del Vehiculo:</h3>
        <ul>
          <li>Tipo de Transporte: {transporte.tipo_transporte}</li>
          <li>Dominio del Vehículo: {transporte.dominio_vehiculo}</li>
          <li>Número de Motor: {transporte.numero_motor}</li>
          <li>Número de Chasis: {transporte.numero_chasis}</li>
          <li>Marca del Vehículo: {transporte.marca_vehiculo}</li>
          <li>Modelo del Vehículo: {transporte.modelo_vehiculo}</li>
          <li>Póliza de Seguro: {transporte.poliza_seguro}</li>
          <li>VTV: {transporte.vtv}</li>
          <li>Observaciones: {transporte.observaciones}</li>
        </ul>
      </div>
      <div className="transpDatosPersonales">
        <h3>Datos personales:</h3>
        <ul>
          <li>Nombre del Titular: {transporte.nombre_titular}</li>
          <li>Número de Licencia del Conductor: {transporte.numero_licencia_conductor}</li>
          <li>Nombre del Conductor: {transporte.nombre_conductor}</li>
        </ul>
      </div>
      <div className="transpCreacionActualizacion">
        <ul>
          <li>Fecha de Creación: {transporte.createdAt}</li>
          <li>Fecha de Actualización: {transporte.updatedAt}</li>
        </ul>
      </div>

      <div className='buttonsCrud'>
        <button onClick={() => onClickEdit(transporte)}>Editar</button>
        <button onClick={() => onClickDelete(transporte)}>Eliminar</button>
      </div>
    </div>
  )
}
