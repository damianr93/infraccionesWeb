import { useState } from "react"
import getMultasPorPatenteOrNumInfraccion from "../../api/multas-por-patente"
import { RenderMultasCiudadano } from "./render-multas"
import '../../../style.css'
import { ProgressBar } from "react-loader-spinner"

export const CiudadanoScreen = () => {
  const [multas, setMultas] = useState([]);
  const [requestSent, setRequestSent] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(false)

  const search = async () => {
    if (searchValue === '') {
      return
    }
    setRequestSent(true)
    setLoading(true)
    const infracciones = await getMultasPorPatenteOrNumInfraccion(searchValue)
    setMultas(infracciones)
    setLoading(false)
  }

  return (

    <div className="ciudadano">
      <div className="ciudadanoOptions">
        <h1 className="ciudadanoH1">CIUDADANO</h1>
        <h2 className="ciudadanoH2">Consultar Infracciones por N° de Patente o N° de Infraccion</h2>
        <input
          className="ciudadanoInput"
          type="text"
          placeholder="N° de Patente o Infraccion"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button className="ciudadanoButton" onClick={search}>Consultar</button>
      </div>


      {requestSent && multas.length === 0 && <h3 className="ciudadanoH3">No se encontraron infracciones</h3>}
      {requestSent && multas.length > 0 &&
        <div className="ciudadanoRenderMultas">
          <RenderMultasCiudadano
            multas={multas} />
        </div>
      }
      <ProgressBar
        visible={loading}
        height="80"
        width="80"
        barColor="white"
        borderColor="white"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>

  )
}
