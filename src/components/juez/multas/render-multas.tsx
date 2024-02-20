import { useNavigate } from "react-router-dom";
import deleteMulta from '../../../api/eliminar-multa.js'

export const RenderMultas = ({ multas, onDeleteMulta }) => {
    const navigation = useNavigate()

    const onClickEdit = (multa) => {

        navigation('/edition-infraccion', { state: multa })
    }

    const onClickDelete = async (multa) => {
        onDeleteMulta(multa.id)
        await deleteMulta(multa.id)
    }



    return (

        multas.map((multa, index) => (
            <div key={index} className='multas'>
                <ul id={multa.id}>
                    <li>Dominio: {multa.dominio}</li>
                    <li>Nombre del propietario: {multa.nombre_propietario}</li>
                    <li>Nombre del conductor: {multa.nombre_conductor}</li>
                    <li>Domicilio del conductor: {multa.domicilio_conductor} </li>
                    <li>Marca del vehículo: {multa.marca_vehiculo} </li>
                    <li>Modelo del vehículo: {multa.modelo_vehiculo} </li>
                    <li>Color del vehículo: {multa.color_vehiculo} </li>
                    <li>Número de Licencia del conductor: {multa.numero_licencia_conductor} </li>
                    <li>Ubicación de la infracción: {multa.ubicacion_infraccion} </li>
                    <li>Referencia de ubicación: {multa.referencia_ubicacion} </li>
                    <li>Infracciones nomenclador:
                        {multa.id_nomenclador.map((nomenclador, nomencladorIndex) => (
                            <ul key={nomencladorIndex}>
                                <li className='subElemento'>{nomenclador.nombre}</li>
                            </ul>
                        ))}
                    </li>
                    <li>Número de infracción: {multa.numero_infraccion} </li>
                    <li>Estado: {multa.estado} </li>
                    <li>Juez asignado: {multa.juez_asignado && multa.juez_asignado.name} </li>

                    {(multa.foto.length > 0) ? <li>Foto/s:</li> : null}

                    {multa.foto.map((foto, id) => (
                        <a key={id} href={foto} target="blank"><img className="imgPrueba" src={foto} alt="" /></a>


                    ))}
                </ul>
                <div className='buttonsCrud'>
                    <button onClick={() => onClickEdit(multa)}>Editar</button>
                    <button onClick={() => onClickDelete(multa)}>Eliminar</button>
                </div>
            </div>
        ))

    );
};