import { useNavigate } from "react-router-dom";
import deleteNomenclador from '../../../api/eliminar-nomenclador.js'
import { useState } from "react";

export const RenderNomencladorPorNombre = ({ nomenclador, onDeleteNomenclador }) => {
    const navigation = useNavigate()
    const [deleted, setdeleted] = useState(true)

    if (nomenclador === undefined) return <div className="errorMessage">Especifique un nombre valido de nomenclador</div>

    const onClickEdit = (nomenclador) => {
        navigation('/edition-nomenclador', { state: nomenclador })
    }

    const onClickDelete = async (nomenclador) => {
        onDeleteNomenclador(nomenclador.id)
        await deleteNomenclador(nomenclador.id)
        setdeleted(false)
    }

    return (

        deleted && (
            <div key={nomenclador.id} className='multas'>
                <ul>
                    <li>Nombre: {nomenclador.nombre}</li>
                    <li>Unidades de valor: {nomenclador.unidades_de_valor}</li>
                </ul>
                <div className='buttonsCrud'>
                    <button onClick={() => onClickEdit(nomenclador)}>Editar</button>
                    <button onClick={() => onClickDelete(nomenclador)}>Eliminar</button>
                </div>
            </div>
        )

    );
};
