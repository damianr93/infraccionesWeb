import { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { CrearSolicitud } from "./crear-solicitud";
import { RenderSolicitudes } from "./render-solicitudes";
import { getTransporteTurismoPorUser } from "../../../api/t-turismo";


export const GestionSolicitudes = () => {
    const [errorCargaDeDatos, setErrorCargaDeDatos] = useState(null)
    const [isCreateSolicitud, setIsCreateSolicitud] = useState(false)
    // const [isInputFocused, setIsInputFocused] = useState(false)
    const [solicitudes, setSolicitudes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const fetchTurismo = async () => {
            try {

                const fetchedTurismo = await getTransporteTurismoPorUser();

                if (fetchedTurismo.length === 0) setErrorCargaDeDatos('No hay datos')

                setSolicitudes(fetchedTurismo);

                setLoading(false);

            } catch (error) {

                console.error('Error al obtenerNomenclador:', error);
                setLoading(false);
                setErrorCargaDeDatos('Error al obtener datos');

            }
        };

        fetchTurismo();

    }, []);


    const handleAddSolicitud = (solicitud) => {
        solicitudes.push(solicitud)
        setSolicitudes(solicitudes)
    }

    const handleDeleteSolicitud = (id) => {
        const solicitudesNotDeleted = solicitudes.filter(solicitud => id !== solicitud.id)
        setSolicitudes(solicitudesNotDeleted)
    }

    const onClickAddSolicitud = () => {
        setIsCreateSolicitud(true)
    }

    return (
        <>
        <h1 className="h1whiteStandar">Gestion de Solicitudes</h1>
            <div>
                {/* {
                    solicitudes.length > 0 && <input
                        className="inputBuscarMulta"
                        type="text"
                        placeholder="Buscar por ..."
                        onKeyDown={handleKeyDown}
                        onChange={handleSelectByName}

                    />
                } */}
                {
                    !isCreateSolicitud &&
                    <button onClick={() => onClickAddSolicitud()}>Crear Solicitud</button>
                }

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

            {isCreateSolicitud ?
                <CrearSolicitud
                    addSolicitud={handleAddSolicitud}
                    cratingSolicitud={setIsCreateSolicitud}
                /> :
                <RenderSolicitudes
                    solicitudes={solicitudes}
                    onDeleteSolicitud={handleDeleteSolicitud} />

                // (

                //     isInputFocused ?
                //         <RenderSolicitudPor
                //             nomenclador={nomencladorSelected}
                //             onDeleteNomenclador={handleDeleteNomenclador} /> :
                //         <RenderNomenclador
                //             nomencladores={nomencladores}
                //             onDeleteNomenclador={handleDeleteNomenclador} />

                // )
            }


        </>
    )
}
