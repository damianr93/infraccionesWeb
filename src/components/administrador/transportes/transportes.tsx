import { useEffect, useState } from "react"
import { useObtenerTransportes } from "../../../hook/obtenerTransportes"
import { RenderTransporte } from "./render-transporte"
// import { RenderTransportePorLegajo } from "./render-transporte-por-legajo"
// import { CrearTransporte } from "./crear-transporte"


export const VerTransportes = () => {
  const transportesDB = useObtenerTransportes()
  // const [crearTransporte, setCrearTransporte] = useState(false)
  // const [legajoNum, setLegajoNum] = useState('')
  const [transportes, setTransportes] = useState([])
  // const [isInputFocused, setIsInputFocused] = useState(false)

  useEffect(() => {
    setTransportes(transportesDB);
}, [transportesDB]);

const handleKeyDown = () => {
  console.log('busca el transporte')
}

const handleInputChange = (event) => {
  console.log(event.target.value)
} 

// const onCreateTransporte = () => {
//   setCrearTransporte(true)
// }

// const handleAddtransporte = (transporte) => {
//   transportes.push(transporte)
//   setTransportes(transporte)
// }

const onDeleteTransporte = (id) => {
  const tranposteNotDeleted =  transportes.filter(transp => id !== transp.id)
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
    {/* <button onClick={() => onCreateTransporte()}>Dar de alta nuevo usuario</button> */}

    <RenderTransporte
            transportes={transportes}
            deletedTransp={onDeleteTransporte} />

    {/* {
      crearTransporte ?
        <CrearTransporte
          addUser={handleAddtransporte}
          cratingUser={setCrearTransporte}
        />
        :
        (isInputFocused ? (
          <RenderTransportePorLegajo
            legadoNum={legajoNum}
            transport={transportes}
            deletedTransp={onDeleteTransporte} />
        ) : (
          <RenderTransporte
            transportes={transportes}
            deletedTransp={onDeleteTransporte} />
        ))
        

    } */}

  </>
  )
}
