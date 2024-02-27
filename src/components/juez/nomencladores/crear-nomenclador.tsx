import { useState } from "react"
import postNomencladores from '../../../api/crear-nomenclador'
import { BallTriangle } from "react-loader-spinner"


export const CrearNomenclador = ({ cratingNomenclador, addNomenclador }) => {
    const [values, setValues] = useState({
        nombre: '',
        unidades_de_valor: ''
    })
    const [mensajeError, setMensajeError] = useState(null)
    const [loading, setLoading] = useState(false);

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
        setMensajeError(null)
        setLoading(true)
        try {

            const userInput = values.unidades_de_valor

            const numeroDecimal = parseFloat(userInput.replace(',', '.'))

            if(numeroDecimal <= 0) return setMensajeError('Ingrese un valor mayor a 0')

            const newNomenclador = await postNomencladores({
                ...values,
                unidades_de_valor: numeroDecimal
            });

            addNomenclador(newNomenclador)
            cratingNomenclador(false)
            setMensajeError(null)
            setLoading(false)

        } catch (error) {
            console.error('Error al enviar la solicitud PATCH:', error.message);
            setLoading(false)
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
                    type="number"
                    value={values.unidades_de_valor}
                    onChange={handleValor}
                />

                <button className="buttonEditarInfraccion" type='submit'>Guardar Cambios</button>
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

                {mensajeError &&
                    <div className="mensajeError">
                        <h3>{mensajeError}</h3>
                    </div>
                }


            </form>
        </div>
    )
}
