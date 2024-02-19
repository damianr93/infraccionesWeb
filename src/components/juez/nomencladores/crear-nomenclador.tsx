import { useState } from "react"
import postNomencladores from '../../../api/crear-nomenclador.js'


export const CrearNomenclador = ({cratingNomenclador, addNomenclador}) => {
    const [values, setValues] = useState({
        nombre: '',
        unidades_de_valor: ''
    })
    const [mensajeError, setMensajeError] = useState(null)

    const handleName = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            nombre: event.target.value
        }))
    }

    const handleValor = (event) => {

        setValues((prevValues) => ({
            ...prevValues,
            unidades_de_valor: event.target.value
        }));

    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {

            const userInput = values.unidades_de_valor

            const numeroDecimal = parseFloat(userInput.replace(',', '.'))

            const newNomenclador = await postNomencladores({ ...values, unidades_de_valor:numeroDecimal });

            addNomenclador(newNomenclador)
            cratingNomenclador(false)
            setMensajeError(null)

        } catch (error) {
            console.error('Error al enviar la solicitud PATCH:', error.message);
            return setMensajeError(error.message)
        }
    }

    return (
        <div className="editing">
            <h1>Crear nuevo Nomenclador</h1>
            <form onSubmit={(event) => onSubmit(event)}>
                <label>Nombre Del nomenclador:</label>
                <input
                    type="text"
                    value={values.nombre}
                    onChange={handleName}
                />
                <label>Valor:</label>
                <input
                    type="text"
                    value={values.unidades_de_valor}
                    onChange={handleValor}
                />

                <button className="buttonEditarInfraccion" type='submit'>Guardar Cambios</button>

                {mensajeError &&
                    <div className="mensajeError">
                        <h3>{mensajeError}</h3>
                    </div>
                }


            </form>
        </div>
    )
}
