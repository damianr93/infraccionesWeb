import { useNavigate } from "react-router-dom"
import deleteTaxiRemis from "../../../api/eliminar-taxi-remis"


export const RenderTaxiRemis = ({ taxiRemis, deletedTR }) => {
  const navigation = useNavigate()

  const onClickEdit = (taxiRemis) => {
    navigation('/edition-taxi-remis', { state: taxiRemis })
  }

  const onClickDelete = async (taxiRemis) => {
    deletedTR(taxiRemis.id)
    await deleteTaxiRemis(taxiRemis.id)
  }

  return (
    taxiRemis.map((taxiRemis, index) => (
      <div key={index} className='multas'>
        <ul id={taxiRemis.id} className="ulConImagen">
          <li>Número de Legajo: {taxiRemis.numero_legajo}</li>
          <li>Dominio del Vehículo: {taxiRemis.dominio_vehiculo}</li>
          <li>Número de Motor: {taxiRemis.numero_motor}</li>
          <li>Número de Chasis: {taxiRemis.numero_chasis}</li>
          <li>Marca del Vehículo: {taxiRemis.marca_vehiculo}</li>
          <li>Modelo del Vehículo: {taxiRemis.modelo_vehiculo}</li>
          <li>Nombre del Titular: {taxiRemis.nombre_titular}</li>
          <li>Número de Licencia del Conductor: {taxiRemis.numero_licencia_conductor}</li>
          <li>Nombre del Conductor: {taxiRemis.nombre_conductor}</li>
          <li>Póliza de Seguro: {taxiRemis.poliza_seguro}</li>
          <li>VTV: {taxiRemis.vtv}</li>
          <li>Revision de salud: {taxiRemis.revision_salud}</li>
          <li>Desinfeccion vehicular: {taxiRemis.desinfeccion_vehicular}</li>
          <li>Taximetro: {taxiRemis.taximetro}</li>
          <li>Tipo: {taxiRemis.tipo}</li>
          {
            taxiRemis.observaciones ?
              <li>Observaciones: {taxiRemis.observaciones}</li> :
              null
          }
          <li>Fecha de Creación: {taxiRemis.createdAt}</li>
          <li>Fecha de Actualización: {taxiRemis.updatedAt}</li>
        </ul>


        {
          (taxiRemis.foto_vehiculo || taxiRemis.foto_conductor) ?


            <div className="fotosTaxiRemis">
              {
                taxiRemis.foto_vehiculo ?
                  <div>

                    <h3>Foto Vehiculo:</h3>
                    <a href={taxiRemis.foto_vehiculo} target="blank">
                      <img className="img" src={taxiRemis.foto_vehiculo} alt="Foto Vehiculo" />
                    </a>
                  </div>
                  :
                  null
              }
              {
                taxiRemis.foto_vehiculo ?
                  <div>
                    <h3>Foto Conductor:</h3>
                    <a href={taxiRemis.foto_conductor} target="blank">
                      <img className="img" src={taxiRemis.foto_conductor} alt="Foto Conductor" />
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
          <button onClick={() => onClickEdit(taxiRemis)}>Editar</button>
          <button onClick={() => onClickDelete(taxiRemis)}>Eliminar</button>
        </div>
      </div>
    ))
  )
}
