import { useEffect, useState } from "react"
import { useObtenerTransporteTurismo } from "../../../hook/obtenerTransporteTurismo"
import { RenderTranspTurismo } from "./render-transp-turismo"


export const VerTurismo = () => {
  const transporteTurismoDB = useObtenerTransporteTurismo()
  const [transpTurismo, setTranspTurismo] = useState([])

  useEffect(() => {
    setTranspTurismo(transporteTurismoDB)
  }, [transporteTurismoDB])

  return (
    <RenderTranspTurismo
    transpTurismo={transpTurismo}
    />
  )
}
