import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import patchNomencladores from "../../../api/editar-nomenclador"
import { BallTriangle } from "react-loader-spinner"

export const EditarNomenclador = () => {
    const location = useLocation();
    const sessionStorageId = location.state.id
    const [loading, setLoading] = useState(false);
    const [mensajeExito, setMensajeExito] = useState(null)
    const [mensajeError, setMensajeError] = useState(null)
    const [values, setValues] = useState(() => {
        const storedState = sessionStorage.getItem(`editValues-${sessionStorageId}`);
        return storedState ? JSON.parse(storedState) : {
            ...location.state,
        };
    });

    useEffect(() => {
        sessionStorage.setItem(`editValues-${sessionStorageId}`, JSON.stringify(values));
    }, [values]);

    const handleName = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            nombre: event.target.value
        }))
    }

    const handleValor = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            unidades_de_valor: event.target.value
        }))
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        setMensajeError(null)
        setMensajeExito(null)
        setLoading(true)

        const userInput = values.unidades_de_valor.toString()
        const numeroDecimal = parseFloat(userInput.replace(',', '.'))
        if (numeroDecimal <= 0) return setMensajeError('Ingrese un valor mayor a 0')

        try {
            await patchNomencladores(values.id, { ...values, unidades_de_valor: values.unidades_de_valor.toString() });

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
        window.history.back()
    }

    return (
        <div className="editing">
            <h1>Editando Nomenclador</h1>
            <form onSubmit={(event) => onSubmit(event)}>
                <label>Nombre Del nomenclador:</label>
                <input
                    type="text"
                    value={values.nombre}
                    onChange={handleName}
                />
                <label>Valor:</label>
                <input
                    type="number"
                    value={values.unidades_de_valor}
                    onChange={handleValor}
                />

                <button className="buttonEditarInfraccion" type='submit'>Guardar Cambios</button>

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

                <button
                    className="buttonEditarInfraccion"
                    type='button'
                    onClick={handleButtonVolver}
                >
                    Volver
                </button>
                {
                    loading && (
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
                    )
                }


            </form>
        </div>
    );
};
