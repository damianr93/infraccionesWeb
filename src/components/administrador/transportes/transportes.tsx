import { useEffect, useState } from "react"
import { RenderTransporte } from "./render-transporte"
import { RenderTransportePorLegajo } from "./render-transporte-por-legajo"
import { CrearTransporte } from "./crear-transporte"
import { BallTriangle } from "react-loader-spinner"
import getTransportes from "../../../api/transporte"

export const VerTransportes = () => {
  const [crearTransporte, setCrearTransporte] = useState(false)
  const [legajoNum, setLegajoNum] = useState('')
  const [transportes, setTransportes] = useState([])
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [loading, setLoading] = useState(true);
  const [errorCargaDeDatos, setErrorCargaDeDatos] = useState(null)


  useEffect(() => {
    const fetchTrasnportes = async () => {
      try {

        const transportesData = await getTransportes();
        if (transportesData.length === 0) setErrorCargaDeDatos('No hay datos')
        setTransportes(transportesData);
        setLoading(false);

      } catch (error) {

        console.error('Error al obtener transportes:', error);
        setLoading(false);
        setErrorCargaDeDatos('Error al obtener datos');
      }
    }

    fetchTrasnportes()
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setIsInputFocused(true);
    }
  }

  const handleInputChange = (event) => {
    setLegajoNum(event.target.value);
    if (event.target.value === '') setIsInputFocused(false)
  }

  const onCreateTransporte = () => {
    setCrearTransporte(true)
    setErrorCargaDeDatos(null)
  }

  const handleAddtransporte = (transporte) => {
    transportes.push(transporte)
    setTransportes(transportes)
  }

  const onDeleteTransporte = (id) => {
    const tranposteNotDeleted = transportes.filter(transp => id !== transp.id)
    setTransportes(tranposteNotDeleted)
  }


  return (
    <>
      {
        transportes.length > 0 && <input
          className="inputBuscarMulta"
          type="text"
          placeholder="Buscar por N° de legajo"
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
        />
      }
      <button onClick={() => onCreateTransporte()}>Dar de alta nuevo transporte</button>

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


      {
        crearTransporte ?
          <CrearTransporte
            addTransporte={handleAddtransporte}
            cratingTransp={setCrearTransporte}
          />
          :
          (isInputFocused ? (
            <RenderTransportePorLegajo
              legajoNum={legajoNum}
              transport={transportes}
              deletedTransp={onDeleteTransporte} />
          ) : (
            <RenderTransporte
              transportes={transportes}
              deletedTransp={onDeleteTransporte} />
          ))


      }

    </>
  )
}
