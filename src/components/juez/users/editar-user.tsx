import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"


export const EditarUser = () => {
    const location = useLocation()
    const sessionStorageId = location.state.id
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
            name: event.target.value
        }))
    }

    const handleUsername = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            username: event.target.value
        }))
    }

    const handleEmail = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            email: event.target.value
        }))
    }

    const handletipo = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            tipo: event.target.value
        }))
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            await 
            setMensajeError(null)
            return setMensajeExito('Cambios guardados con exito!')

        } catch (error) {
            console.error('Error al enviar la solicitud PATCH:', error.message);
            setMensajeExito(null)
            return setMensajeError(error.message)
        }
    }

    const handleButtonVolver = () => {
        window.history.back()
    }

    return (
        <div className="editing">
            <h1>Editando Usuario</h1>
            <form onSubmit={(event) => onSubmit(event)}>
                <label>Nombre:</label>
                <input
                    type="text"
                    value={values.name}
                    onChange={handleName}
                />
                <label>Username:</label>
                <input
                    type="text"
                    value={values.username}
                    onChange={handleUsername}
                />
                <label>Email:</label>
                <input
                    type="text"
                    value={values.email}
                    onChange={handleEmail}
                />
                <label>Tipo::</label>
                <input
                    type="text"
                    value={values.tipo}
                    onChange={handletipo}
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


            </form>
        </div>
    )
}
