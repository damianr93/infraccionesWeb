// import { useNavigate } from "react-router-dom";

export const RenderNomenclador = ({nomencladores}) => {
    // const navigation = useNavigate()

    return (

        nomencladores.map((nomenclador, index) => (
            <div key={index} className='multas'>

                <ul id={nomenclador.id} >
                    <li>Nombre: {nomenclador.nombre}</li>
                    <li>Unidades de valor: {nomenclador.unidades_de_valor}</li>
                </ul>
                <div className='buttonsCrud'>
                    <button>Editar</button>
                    <button>Eliminar</button>
                </div>
            </div>
        ))

    );
};