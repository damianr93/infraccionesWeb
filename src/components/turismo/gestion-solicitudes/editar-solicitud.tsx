import { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import patchTurismo from "../../../api/editar-solicitud";
import moment from "moment";


export const EditarSolicitud = () => {
    const location = useLocation();
    const sessionStorageId = location.state.id
    const [loading, setLoading] = useState(false);
    const [mensajeExito, setMensajeExito] = useState(null)
    const [mensajeError, setMensajeError] = useState(null)
    const [values, setValues] = useState(() => {
        const storedState = sessionStorage.getItem(`editValues-${sessionStorageId}`);
        return storedState ? JSON.parse(storedState) : {
            ...location.state,
            id_nomenclador: location.state.id_nomenclador || [],
        };
    });

    useEffect(() => {
        sessionStorage.setItem(`editValues-${sessionStorageId}`, JSON.stringify(values));
    }, [values]);

    const handleNombreEmpresa = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            nombre_empresa: event.target.value
        }))

    }

    const handleMarcaVehiculo = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            marca_vehiculo: event.target.value
        }))
    }

    const handleDominio = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            dominio_vehiculo: event.target.value
        }))
    }

    const handleNombresConductores = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            nombre_conductores: event.target.value
        }))
    }

    const handleFechaIngreso = (event) => {

        setValues(prevValues => ({
            ...prevValues,
            fecha_hora_ingreso: event.target.value
        }))
    }


    const handleFechaEgreso = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            fecha_hora_egreso: event.target.value
        }))
    }

    const handleRutaIngreso = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            ruta_ingreso: event.target.value
        }))
    }

    const handleRutaEgreso = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            ruta_egreso: event.target.value
        }))
    }
    const handleInformacionAdicional = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            otra_informacion: event.target.value
        }))
    }

    const onSubmit = async () => {
        event.preventDefault();
        setMensajeError(null)
        setMensajeExito(null)
        setLoading(true)

        const userId = sessionStorage.getItem('userId')

        try {

            await patchTurismo(values.id, {
                ...values,
                creado_por: userId,
            });

            setMensajeError(null)
            setLoading(false)
            return setMensajeExito('Cambios guardados con exito!')

        } catch (error) {
            console.error('Error al enviar la solicitud PATCH:', error.message);
            setMensajeExito(null)
            setLoading(false)
            return setMensajeError(error.message)
        }
    }

    const handleButtonVolver = () => {
        event.preventDefault();
        window.history.back()
    }


    return (
        <div className="editing">
            <h1 className="h1whiteStandar">Editar Solicitud de ingreso-egreso</h1>
            <form onSubmit={() => onSubmit()}>
                <div>
                    <label>Nombre empresa:</label>
                    <input
                        type="text"
                        value={values.nombre_empresa}
                        onChange={handleNombreEmpresa}
                    />
                </div>
                <div>
                    <label>Marca del vehículo:</label>
                    <input
                        type="text"
                        value={values.marca_vehiculo}
                        onChange={handleMarcaVehiculo}
                    />
                </div>
                <div>
                    <label>Dominio:</label>
                    <input
                        type="text"
                        value={values.dominio_vehiculo}
                        onChange={handleDominio}
                    />
                </div>
                <div>
                    <label>Nombre/s conductor/es:</label>
                    <input
                        type="text"
                        value={values.nombre_conductores}
                        onChange={handleNombresConductores}
                    />
                </div>
                <div>
                    <label>Fecha y hora de ingreso:</label>
                    <input
                        type="text"
                        value={values.fecha_hora_ingreso}
                        onChange={handleFechaIngreso}
                    />
                </div>

                <div>
                    <label>Fecha y hora de egreso:</label>
                    <input
                        type="text"
                        value={values.fecha_hora_egreso}
                        onChange={handleFechaEgreso}
                    />
                </div>

                <div>
                    <label>Ruta ingreso:</label>
                    <input
                        type="text"
                        value={values.ruta_ingreso}
                        onChange={handleRutaIngreso}
                    />
                </div>
                <div>
                    <label>Ruta de egreso:</label>
                    <input
                        type="text"
                        value={values.ruta_egreso}
                        onChange={handleRutaEgreso}
                    />
                </div>
                <div>
                    <label>Informacion adicional:</label>
                    <textarea
                        className="editCreateTextArea"
                        value={values.otra_informacion}
                        onChange={handleInformacionAdicional}
                    />
                </div>

                <button className="buttonEditarInfraccion" type='submit'>Guardar Cambios</button>
                <button className="buttonEditarInfraccion" onClick={() => handleButtonVolver()}>Volver</button>

                {
                    loading && (
                        <div className="loaderInScreens editSection">
                            <BallTriangle
                                height={50}
                                width={50}
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


                {mensajeExito && !mensajeError &&
                    <div className="mensajeExito">
                        <h3>{mensajeExito}</h3>
                    </div>
                }

                {mensajeError &&
                    <div className="mensajeError">
                        <h3>{mensajeError}</h3>
                    </div>
                }

            </form>
        </div>
    )
}
