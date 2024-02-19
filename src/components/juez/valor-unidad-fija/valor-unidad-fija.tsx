import { useEffect, useState } from "react"
import { useObtenerValorUnFija } from "../../../hook/obtenerValorUnFija"
import patchValorUnFijo from '../../../api/editar-valor-un-fijo.js'

interface valorFijo {
  valor: number,
  fecha_actualizacion: string,
  id: string
}

export const ValorUnidadFija = () => {
  const valorUn = useObtenerValorUnFija()
  const [valorUnFija, setValorUnFija] = useState<valorFijo>()
  const [newValue, setNewValue] = useState<number | undefined>()

  useEffect(() => {
    setValorUnFija(valorUn)
  }, [valorUn, setValorUnFija])

  const handleValue = (event) => {
    const value = parseFloat(event.target.value)
    setNewValue(value)
  }

  const onClickUpdateValue = async () => {

    valorUnFija.valor = newValue


    try {
      await patchValorUnFijo(valorUnFija.id, valorUnFija)

      setValorUnFija(prevValues => ({
        ...prevValues,
        valor: newValue
      }))

    } catch (error) {
      console.log(error)
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
    </div>
  )
}
