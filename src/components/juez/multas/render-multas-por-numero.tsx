import { useNavigate } from "react-router-dom";
import deleteMulta from '../../../api/eliminar-multa.js';

export const RenderMultasPorNumero = ({ numMulta, multas, onDeleteMulta }) => {
    const navigation = useNavigate()
    const multa = multas.find((multa) => numMulta === multa.numero_infraccion)

    if (!multa) {
        return (
            <div className="errorMessage">Especifique un número correcto de infracción.</div>);
    }

    const onClickEdit = (multa) => {

        navigation('/edition-infraccion', {state:multa})
    }

    const onClickDelete = async(multa) => {
        onDeleteMulta(multa.id)
        await deleteMulta(multa.id)
     }

    return (

        <div className='multas' id={multa.id}>
            <ul>
                <li>Dominio: {multa.dominio}</li>
                <li>Nombre del propietario: {multa.nombre_propietario}</li>
                <li>Nombre conductor: {multa.nombre_conductor}</li>
                <li>Domicilio conductor: {multa.domicilio_conductor} </li>
                <li>Marca vehiculo: {multa.marca_vehiculo} </li>
                <li>Modelo vehiculo: {multa.modelo_vehiculo} </li>
                <li>Color vehiculo: {multa.color_vehiculo} </li>
                <li>Numero de Lucencia del conductor: {multa.numero_licencia_conductor} </li>
                <li>Ubicacion infraccion: {multa.ubicacion_infraccion} </li>
                <li>Referencia ubicacion: {multa.referencia_ubicacion} </li>
                <li>Infracciones nomenclador:
                    {multa.id_nomenclador.map((nomenclador, nomencladorIndex) => (
                        <ul key={nomencladorIndex}>
                            <li className='subElemento'>{nomenclador.nombre}</li>
                        </ul>
                    ))}
                </li>
                <li>Numero de infraccion: {multa.numero_infraccion} </li>
                <li>Estado: {multa.estado} </li>
                <li>Juez asignado: {multa.juez_asignado && multa.juez_asignado.name} </li>
            </ul>
            <div className='buttonsCrud'>
                <button onClick={()=>onClickEdit(multa)}>Editar</button>
                <button onClick={() => onClickDelete(multa)}>Eliminar</button>
            </div>
        </div>

    );
};
