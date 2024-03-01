import { useEffect, useState } from "react"
import { RenderTranspTurismo } from "./render-transp-turismo"
import { BallTriangle } from "react-loader-spinner"
import { getTransporteTurismo } from "../../../api/t-turismo"




export const VerTurismo = () => {
  const [transpTurismo, setTranspTurismo] = useState([])
  const [loading, setLoading] = useState(true);
  const [errorCargaDeDatos, setErrorCargaDeDatos] = useState(null)
  const [filtro, setFiltro] = useState('')

  useEffect(() => {
    const fetchTurismo = async () => {
      try {

        const turismoData = await getTransporteTurismo();
        if (turismoData.length === 0) setErrorCargaDeDatos('No hay datos')
        setTranspTurismo(turismoData);
        setLoading(false);

      } catch (error) {

        console.error('Error al obtener turismo:', error);
        setLoading(false);
        setErrorCargaDeDatos('Error al obtener datos');
      }
    }

    fetchTurismo()

  }, [])


  const handleFiltro = (event) => {
    setFiltro(event.target.value)
  }


  return (
    <>
      <h1 className="TitleH1White">Solicitudes:</h1>
      <select
      value={filtro}
      onChange={handleFiltro}
      >
        <option value="">Filtrar por:</option>
        <option value="Pendiente Revision">Pendientes de Revisión</option>
        <option value="Solicitud Aprobada">Aprobados</option>
        <option value="Observado">Observados</option>
      </select>


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

      <RenderTranspTurismo
        setTransporteTurism={setTranspTurismo}
        transpTurismo={transpTurismo}
        filtro={filtro}
      />
    </>
  )
}
