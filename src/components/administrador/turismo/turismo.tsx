import { useEffect, useState } from "react"
import { RenderTranspTurismo } from "./render-transp-turismo"
import { BallTriangle } from "react-loader-spinner"
import getTransporteTurismo from "../../../api/t-turismo"


export const VerTurismo = () => {
  const [transpTurismo, setTranspTurismo] = useState([])
  const [loading, setLoading] = useState(true);
  const [errorCargaDeDatos, setErrorCargaDeDatos] = useState(null)

  useEffect(() => {
    const fetchTurismo = async () => {
      try {

        const turismoData = await getTransporteTurismo();
        if (turismoData.length === 0) setErrorCargaDeDatos('No hay datos')
        setTranspTurismo(turismoData);
        setLoading(false);

      } catch (error) {

        console.error('Error al obtener multas:', error);
        setLoading(false);
        setErrorCargaDeDatos('Error al obtener datos');
      }
    }

    fetchTurismo()

  }, [])

  return (
    <>

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
        transpTurismo={transpTurismo}
      />
    </>
  )
}
