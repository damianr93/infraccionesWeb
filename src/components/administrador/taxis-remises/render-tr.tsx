import { useNavigate } from "react-router-dom";
import deleteTaxiRemis from "../../../api/eliminar-taxi-remis";


export const RenderTaxiRemis = ({ taxiRemis, deletedTR }) => {
  const navigation = useNavigate();

  const onClickEdit = (taxiRemis) => {
    navigation('/edition-taxi-remis', { state: taxiRemis });
  }

  const onClickDelete = async (taxiRemis) => {
    deletedTR(taxiRemis.id);
    await deleteTaxiRemis(taxiRemis.id);
  }

  return (
    taxiRemis.map((taxiRemis, index) => (
      <div key={index} className='taxiRemisContainer'>
        <div className="trEncabezado">
          <h3>Número de Legajo: {taxiRemis.numero_legajo}</h3>
          <p>Tipo: {taxiRemis.tipo}</p>
        </div>
        <div className="trDatosVehiculo">
          <h3>Datos del vehiculo:</h3>
          <ul>
            <li>Dominio del Vehículo: {taxiRemis.dominio_vehiculo}</li>
            <li>Número de Motor: {taxiRemis.numero_motor}</li>
            <li>Número de Chasis: {taxiRemis.numero_chasis}</li>
            <li>Marca del Vehículo: {taxiRemis.marca_vehiculo}</li>
            <li>Modelo del Vehículo: {taxiRemis.modelo_vehiculo}</li>
            <li>Póliza de Seguro: {taxiRemis.poliza_seguro}</li>
            <li>VTV: {taxiRemis.vtv}</li>
            <li>Revision de salud: {taxiRemis.revision_salud}</li>
            <li>Desinfeccion vehicular: {taxiRemis.desinfeccion_vehicular}</li>
            <li>Taximetro: {taxiRemis.taximetro}</li>
            {
              taxiRemis.observaciones ?
                <li>Observaciones: {taxiRemis.observaciones}</li> :
                null
            }
          </ul>
        </div>
        <div className="trDatosPersonales">
          <h3>Datos personales:</h3>
          <ul>
            <li>Nombre del Titular: {taxiRemis.nombre_titular}</li>
            <li>Número de Licencia del Conductor: {taxiRemis.numero_licencia_conductor}</li>
            <li>Nombre del Conductor: {taxiRemis.nombre_conductor}</li>
          </ul>
        </div>
        <div className="trFechas">
          <ul>
            <li>Fecha de Creación: {taxiRemis.createdAt}</li>
            <li>Fecha de Actualización: {taxiRemis.updatedAt}</li>
          </ul>
        </div>

        {
          (taxiRemis.foto_vehiculo || taxiRemis.foto_titular) ?

            <div className="trFotos">
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
                taxiRemis.foto_titular ?
                  <div>
                    <h3>Foto Conductor:</h3>
                    <a href={taxiRemis.foto_titular} target="blank">
                      <img className="img" src={taxiRemis.foto_titular} alt="Foto Conductor" />
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
      </div >
    ))
  )
};
