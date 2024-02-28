import { useEffect, useState } from "react"
import patchValorUnFijo from '../../../api/editar-valor-un-fijo'
import { BallTriangle } from "react-loader-spinner"
import getValorUnidadFija from "../../../api/combustible"

interface valorFijo {
  valor: number,
  fecha_actualizacion: string,
  id: string
}

export const ValorUnidadFija = () => {
  const [valorUnFija, setValorUnFija] = useState<valorFijo>()
  const [newValue, setNewValue] = useState<number | undefined>()
  const [mensajeError, setMensajeError] = useState(null)
  const [mensajeExito, setMensajeExito] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errorCargaDeDatos, setErrorCargaDeDatos] = useState(null)

  useEffect(() => {

    const fetchValorUnFija = async () => {
      try {

        const valorUnFijaData = await getValorUnidadFija();
        if (valorUnFijaData.length === undefined) setErrorCargaDeDatos('No hay datos')
        if (valorUnFijaData !== undefined) setLoading(false)
        setValorUnFija(valorUnFijaData[0]);

      } catch (error) {

        console.error('Error al obtener multas:', error);
        setLoading(false);
        setErrorCargaDeDatos('Error al obtener datos');
      }
    }

    fetchValorUnFija()

  }, [])

  const handleValue = (event) => {
    if (event.target.valor <= 0) return
    const value = parseFloat(event.target.value)
    setNewValue(value)
  }

  const onClickUpdateValue = async () => {
    if (newValue <= 0) return setMensajeError('Ingrese un valor mayor a 0')
    valorUnFija.valor = newValue

    try {

      if (valorUnFija.valor <= 0) return setMensajeError('Ingrese un valor mayor a 0')
      await patchValorUnFijo(valorUnFija.id, valorUnFija)

      setValorUnFija(prevValues => ({
        ...prevValues,
        valor: newValue
      }))

      setMensajeError(null)
      setMensajeExito('Valor guardado')

    } catch (error) {
      console.log(error)
      setMensajeExito(null)
      setMensajeError(error)
    }

  }


  return (
    <div className="ValorUnFija_Container">
      <h3>Actualizar valor:</h3>
      <h4>Valor actual: <b>${valorUnFija ? valorUnFija.valor : 0}</b></h4>
      <input
        type="number"
        onChange={handleValue}
      />
      <button onClick={() => onClickUpdateValue()}>Actualizar valor</button>

      {mensajeExito && !mensajeError &&
        <div className="mensajeExito">
          <p>{mensajeExito}</p>
        </div>
      }

      {!mensajeExito && mensajeError &&
        <div className="mensajeError">
          <p>{mensajeError}</p>
        </div>
      }
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

    </div>
  )
}
