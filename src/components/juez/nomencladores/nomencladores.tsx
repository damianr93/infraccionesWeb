import { useEffect, useState } from 'react';
import { RenderNomenclador } from './render-nomencladores';
import { RenderNomencladorPorNombre } from './render-nomenclador-por-nombre';
import { CrearNomenclador } from './crear-nomenclador';
import { BallTriangle } from "react-loader-spinner"
import getNomenclador from '../../../api/nomenclador';

export const VerNomencladores = () => {
    const [isInputFocused, setIsInputFocused] = useState(false)
    const [isCreateNomenclador, setIsCreateNomenclador] = useState(false)
    const [nomencladorName, setNomencladorName] = useState('')
    const [nomencladorSelected, setNomencladorSelected] = useState({})
    const [nomencladores, setNomencladores] = useState([])
    const [loading, setLoading] = useState(true);
    const [errorCargaDeDatos, setErrorCargaDeDatos] = useState(null)

    useEffect(() => {

        const fetchNomencladores = async () => {
            try {

                const fetchedNomencladores = await getNomenclador();

                if (fetchedNomencladores.length === 0) setErrorCargaDeDatos('No hay datos') 

                setNomencladores(fetchedNomencladores);

                setLoading(false);

            } catch (error) {

                console.error('Error al obtenerNomenclador:', error);
                setLoading(false);
                setErrorCargaDeDatos('Error al obtener datos');

            }
        };

        fetchNomencladores();

    }, []);


    const handleKeyDown = (event) => {
        if (event.key !== 'Enter') return
        setIsInputFocused(true);
        setNomencladorSelected(nomencladores.find(x => x.nombre === nomencladorName))
    };

    const handleSelectByName = (event) => {
        setNomencladorName(event.target.value)
        if (event.target.value === '') setIsInputFocused(false)
    }

    const handleDeleteNomenclador = (id) => {
        const updatedNomencladores = nomencladores.filter((nom) => nom.id !== id);
        setNomencladores(updatedNomencladores);
    }

    const onClickAddNomenclador = () => {
        setIsCreateNomenclador(true)
        setErrorCargaDeDatos(null)
        setLoading(null)

    }

    const handleAddNomenclador = (newNomenclador) => {
        nomencladores.push(newNomenclador)
        setNomencladores(nomencladores)

    }


    return (
        <>
            <div>
                {
                    nomencladores.length > 0 && <input
                        className="inputBuscarMulta"
                        type="text"
                        placeholder="Buscar por Nombre"
                        onKeyDown={handleKeyDown}
                        onChange={handleSelectByName}

                    />
                }
                <button onClick={() => onClickAddNomenclador()}>Agregar Nomenclador</button>

            </div>

            {
                loading && (
                    <div className="loaderInScreens">
                        <BallTriangle
                            height={100}
                            width={100}
                            radius={5}
                            color="#4fa94d"
                            ariaLabel="ball-triangle-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />

                    </div>

                )
            }

            {
                errorCargaDeDatos && (
                    <div className="mensajeError cargaDatosErro">
                        <h3>{errorCargaDeDatos}</h3>
                    </div>
                )
            }

            {isCreateNomenclador ?
                <CrearNomenclador
                    addNomenclador={handleAddNomenclador}
                    cratingNomenclador={setIsCreateNomenclador}
                /> : (

                    isInputFocused ?
                        <RenderNomencladorPorNombre
                            nomenclador={nomencladorSelected}
                            onDeleteNomenclador={handleDeleteNomenclador} /> :
                        <RenderNomenclador
                            nomencladores={nomencladores}
                            onDeleteNomenclador={handleDeleteNomenclador} />

                )
            }


        </>
    );
};



