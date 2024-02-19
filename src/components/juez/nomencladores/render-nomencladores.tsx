import { useNavigate } from "react-router-dom";
import deleteNomenclador from '../../../api/eliminar-nomenclador.js'

export const RenderNomenclador = ({nomencladores, onDeleteNomenclador}) => {
    const navigation = useNavigate()

    const onClickEdit = (nomenclador) => {
        navigation('/edition-nomenclador', {state:nomenclador})
    }

    const onClickDelete = async(nomenclador) => {
        onDeleteNomenclador(nomenclador.id)
        await deleteNomenclador(nomenclador.id)
        
    }

    return (

        nomencladores.map((nomenclador, index) => (
            <div key={index} className='multas'>

                <ul id={nomenclador.id} >
                    <li>Nombre: {nomenclador.nombre}</li>
                    <li>Unidades de valor: {nomenclador.unidades_de_valor}</li>
                </ul>
                <div className='buttonsCrud'>
                    <button onClick={() => onClickEdit(nomenclador)}>Editar</button>
                    <button onClick={() => onClickDelete(nomenclador)}>Eliminar</button>
                </div>
            </div>
        ))

    );
};

