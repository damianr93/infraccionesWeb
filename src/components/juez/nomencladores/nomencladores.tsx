import { useEffect, useState } from 'react';
import { useObtenerNomenclador } from '../../../hook/obtenerNomenclador';
// import { RenderNomencladorPorNombre } from './render-nomenclador-por-nombre';
import { RenderNomenclador } from './render-nomencladores';

export const VerNomencladores = () => {
    const nomenclador = useObtenerNomenclador()
    const [nomencladores, setNomencladores] = useState([])


    useEffect(() => {

        setNomencladores(nomenclador)

    }, [nomenclador])



    return (
        <>
            <div>
                {
                    nomencladores.length > 0 && <input
                        className="inputBuscarMulta"
                        type="text"
                        placeholder="Buscar por Nombre"

                    />
                }
                <button>Agregar Nomenclador</button>

            </div>


            <RenderNomenclador nomencladores={nomencladores} />

            {/* {isInputFocused ? (
                <RenderNomencladorPorNombre nombreNomenclador={nombreNomenclador} nomenclador={nomencladores} onDeleteMulta={handleDeleteMulta}/>
            ) : (
                <RenderMultas multas={multas} onDeleteNomenclador={handleDeleteNomenclador} />
            )} */}
        </>
    );
};



