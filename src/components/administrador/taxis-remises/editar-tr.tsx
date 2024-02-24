import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import patchTaxiRemis from "../../../api/editar-taxi-remis"


export const EditarTaxiRemis = () => {
    const location = useLocation()
    const sessionStorageId = location.state.id
    const [mensajeExito, setMensajeExito] = useState(null)
    const [mensajeError, setMensajeError] = useState(null)
    const [values, setValues] = useState(() => {
        const storedState = sessionStorage.getItem(`editValues-${sessionStorageId}`);
        return storedState ? JSON.parse(storedState) : {
            ...location.state
        };
    });

    useEffect(() => {
        sessionStorage.setItem(`editValues-${sessionStorageId}`, JSON.stringify(values));
    }, [values]);

    const handleNumLegado = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            numero_legajo: event.target.value
        }))
    }
    const handleDominio = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            dominio_vehiculo: event.target.value
        }))
    }
    const handleNumeroMotor = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            numero_motor: event.target.value
        }))
    }
    const handleNumChasis = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            numero_chasis: event.target.value
        }))
    }
    const handleMarcaVehiculo = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            marca_vehiculo: event.target.value
        }))
    }
    const handleCarModel = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            modelo_vehiculo: event.target.value
        }))
    }
    const handleNombleTitular = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            nombre_titular: event.target.value
        }))
    }
    const handleNumeroLicenciaConductor = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            numero_licencia_conductor: event.target.value
        }))
    }

    const handleNombreConductor = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            nombre_conductor: event.target.value
        }))
    }

    const handlePoliza = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            poliza_seguro: event.target.value
        }))
    }
    const handleVtv = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            vtv: event.target.value
        }))
    }

    const handleRevisionSalud = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            revision_salud: event.target.value
        }))
    }
    const handleDesinfeccionVehicular = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            desinfeccion_vehicular: event.target.value
        }))
    }
    const handleTaximetro = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            taximetro: event.target.value
        }))
    }

    const handleTipoTransporte = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            tipo: event.target.value
        }))
    }
    const handleObservaciones = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            observaciones: event.target.value
        }))
    }

    const handleButtonVolver = () => {
        window.history.back()
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        try {

            await patchTaxiRemis(values.id, { ...values });

            setMensajeError(null)
            return setMensajeExito('Cambios guardados con exito!')

        } catch (error) {
            console.error('Error al enviar la solicitud PATCH:', error.message);
            setMensajeExito(null)
            return setMensajeError(error.message)
        }
    }



    return (
        <div className="editing">
            <h1>Editando transporte N° {values.numero_legajo}</h1>
            <form onSubmit={(event) => onSubmit(event)}>
                <div>
                    <label>Numero de legajo:</label>
                    <input
                        type="text"
                        value={values.numero_legajo}
                        onChange={handleNumLegado}
                    />
                </div>
                <div>
                    <label>Dominio de vehiculo:</label>
                    <input
                        type="text"
                        value={values.dominio_vehiculo}
                        onChange={handleDominio}
                    />
                </div>
                <div>
                    <label>Numero de motor:</label>
                    <input
                        type="text"
                        value={values.numero_motor}
                        onChange={handleNumeroMotor}
                    />
                </div>
                <div>
                    <label>Número chasis:</label>
                    <input
                        type="text"
                        value={values.numero_chasis}
                        onChange={handleNumChasis}
                    />
                </div>
                <div>
                    <label>Marca vehículo:</label>
                    <input
                        type="text"
                        value={values.marca_vehiculo}
                        onChange={handleMarcaVehiculo}
                    />
                </div>
                <div>
                    <label>Modelo vehiculo:</label>
                    <input
                        type="text"
                        value={values.modelo_vehiculo}
                        onChange={handleCarModel}
                    />
                </div>
                <div>
                    <label>Nombre titular:</label>
                    <input
                        type="text"
                        value={values.nombre_titular}
                        onChange={handleNombleTitular}
                    />
                </div>
                <div>
                    <label>Numero licencia del conductor:</label>
                    <input
                        type="text"
                        value={values.numero_licencia_conductor}
                        onChange={handleNumeroLicenciaConductor}
                    />
                </div>

                <div>
                    <label>Nombre del conductor:</label>
                    <input
                        type="text"
                        value={values.nombre_conductor}
                        onChange={handleNombreConductor}
                    />
                </div>

                <div>
                    <label>Poliza seguro:</label>
                    <input
                        type="text"
                        value={values.poliza_seguro}
                        onChange={handlePoliza}
                    />
                </div>
                <div>
                    <label>vtv:</label>
                    <select
                        value={values.vtv}
                        onChange={handleVtv}
                    >
                        <option value="Vigente">Vigente</option>
                        <option value="Vencida">Vencida</option>
                    </select>
                </div>
                <div>
                    <label>Revision de salud:</label>
                    <select
                        value={values.revision_salud}
                        onChange={handleRevisionSalud}
                    >
                        <option value="Vigente">Vigente</option>
                        <option value="Pendiente">Pendiente</option>
                    </select>
                </div>
                <div>
                    <label>Desinfección vehicular:</label>
                    <select
                        value={values.desinfeccion_vehicular}
                        onChange={handleDesinfeccionVehicular}
                    >
                        <option value="Regular">Regular</option>
                        <option value="Pendiente">Pendiente</option>
                    </select>
                </div>
                <div>
                    <label>Taximetro:</label>
                    <select
                        value={values.taximetro}
                        onChange={handleTaximetro}
                    >
                        <option value="En condiciones">En condiciones</option>
                        <option value="Novedades">Novedades</option>
                    </select>
                </div>
                <div>
                    <label>Tipo:</label>
                    <select
                        value={values.tipo}
                        onChange={handleTipoTransporte}
                    >
                        <option value="Remis">Remis</option>
                        <option value="Taxi">Taxi</option>
                    </select>
                </div>
                <div>
                    <label>Observaciones:</label>
                    <input
                        type="text"
                        value={values.observaciones}
                        onChange={handleObservaciones}
                    />
                </div>

                <div>
                    <button className="buttonEditarInfraccion" type='submit'>Guardar Cambios</button>
                    <button
                        className="buttonEditarInfraccion"
                        type='button'
                        onClick={handleButtonVolver}
                    >
                        Volver
                    </button>

                    {mensajeExito && !mensajeError &&
                        <div className="mensajeExito">
                            <h3>{mensajeExito}</h3>
                        </div>
                    }

                    {!mensajeExito && mensajeError &&
                        <div className="mensajeError">
                            <h3>{mensajeError}</h3>
                        </div>
                    }
                </div>

            </form>
        </div>
    )
}

