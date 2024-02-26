import { useState } from "react"
import getMultasPorPatente from "../../api/multas-por-patente"
import { RenderMultasCiudadano } from "./render-multas"


export const CiudadanoScreen = () => {
  const [multas, setMultas] = useState('')

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      const infracciones = await getMultasPorPatente(event.target.value)
      setMultas(infracciones)
    }
  }

  const handleInputChange = () => {

  }

  return (
    <div className="options ciudadano">
      {
        <input
          className="inputBuscarMulta"
          type="text"
          placeholder="Buscar por N° de Patente"
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
        />
      }
      {multas && <RenderMultasCiudadano
        multas={multas} />}
    </div>

  )
}
