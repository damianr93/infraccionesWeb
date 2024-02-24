import { useNavigate } from "react-router-dom";
import deleteTaxiRemis from "../../../api/eliminar-taxi-remis";


export const RenderTaxiRemisPorLegajo = ({ legajoNum, taxiRemis, deletedTR }) => {
  const navigation = useNavigate()
  const taxiRem = taxiRemis.find(tr => tr.numero_legajo === legajoNum)

  if (!taxiRem) {
    return (
      <div className="errorMessage">Especifique un número correcto de legajo.</div>);
  }

  const onClickDelete = async (taxiRemis) => {
    deletedTR(taxiRemis.id)
    await deleteTaxiRemis(taxiRemis.id)
  }

  const onClickEdit = (taxiRemis) => {
    navigation('/edition-taxi-remis', { state: taxiRemis })
  }

  return (
    <div className='multas'>
      <ul id={taxiRem.id} className="ulConImagen">
        <li>Número de Legajo: {taxiRem.numero_legajo}</li>
        <li>Dominio del Vehículo: {taxiRem.dominio_vehiculo}</li>
        <li>Número de Motor: {taxiRem.numero_motor}</li>
        <li>Número de Chasis: {taxiRem.numero_chasis}</li>
        <li>Marca del Vehículo: {taxiRem.marca_vehiculo}</li>
        <li>Modelo del Vehículo: {taxiRem.modelo_vehiculo}</li>
        <li>Nombre del Titular: {taxiRem.nombre_titular}</li>
        <li>Número de Licencia del Conductor: {taxiRem.numero_licencia_conductor}</li>
        <li>Nombre del Conductor: {taxiRem.nombre_conductor}</li>
        <li>Póliza de Seguro: {taxiRem.poliza_seguro}</li>
        <li>VTV: {taxiRem.vtv}</li>
        <li>Revision de salud: {taxiRem.revision_salud}</li>
        <li>Desinfeccion vehicular: {taxiRem.desinfeccion_vehicular}</li>
        <li>Taximetro: {taxiRem.taximetro}</li>
        <li>Tipo: {taxiRem.tipo}</li>
        {
          taxiRem.observaciones ?
            <li>Observaciones: {taxiRem.observaciones}</li> :
            null
        }
        <li>Fecha de Creación: {taxiRem.createdAt}</li>
        <li>Fecha de Actualización: {taxiRem.updatedAt}</li>
      </ul>


      {
        (taxiRem.foto_vehiculo || taxiRem.foto_conductor) ?


          <div className="fotosTaxiRemis">
            {
              taxiRem.foto_vehiculo ?
                <div>

                  <h3>Foto Vehiculo:</h3>
                  <a href={taxiRem.foto_vehiculo} target="blank">
                    <img className="img" src={taxiRem.foto_vehiculo} alt="Foto Vehiculo" />
                  </a>
                </div>
                :
                null
            }
            {
              taxiRem.foto_vehiculo ?
                <div>
                  <h3>Foto Conductor:</h3>
                  <a href={taxiRem.foto_conductor} target="blank">
                    <img className="img" src={taxiRem.foto_conductor} alt="Foto Conductor" />
                  </a>
                </div>
                :
                null
            }
          </div>
          :
          null

      }
      <div className='buttonsCrud'>
        <button onClick={() => onClickEdit(taxiRem)}>Editar</button>
        <button onClick={() => onClickDelete(taxiRem)}>Eliminar</button>
      </div>
    </div>
  )
}
