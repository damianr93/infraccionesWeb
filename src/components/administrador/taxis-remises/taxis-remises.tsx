import { useEffect, useState } from "react";
import { useObtenerTaxiRemis } from "../../../hook/obtenerTaxiRemis";
import { CrearTaxiRemis } from "./crear-tr";
import { RenderTaxiRemisPorLegajo } from "./render-tr-por-numero-de-legajo";
import { RenderTaxiRemis } from "./render-tr";

export const VerTaxiRemis = () => {
  const taxisRemisDB = useObtenerTaxiRemis();
  const [crearTaxiRemis, setCrearTaxiRemis] = useState(false)
  const [legajoNum, setLegajoNum] = useState('')
  const [taxiRemis, setTaxiRemis] = useState([])
  const [isInputFocused, setIsInputFocused] = useState(false)

  useEffect(() => {
    setTaxiRemis(taxisRemisDB);
  }, [taxisRemisDB]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setIsInputFocused(true);
    }
  }

  const handleInputChange = (event) => {
    setLegajoNum(event.target.value);
    if (event.target.value === '') setIsInputFocused(false)
  }

  const onCreateTaxiRemis = () => {
    setCrearTaxiRemis(true)
  }

  const handleAddTaxiRemis = (taxiRem) => {
    taxiRemis.push(taxiRem)
    setTaxiRemis(taxiRemis)
  }

  const onDeleteTaxiRemis = (id) => {
    const taxiRemisNotDeleted = taxiRemis.filter(tr => id !== tr.id)
    setTaxiRemis(taxiRemisNotDeleted)
  }


  return (
    <>
      {
        taxiRemis.length > 0 && <input
          className="inputBuscarMulta"
          type="text"
          placeholder="Buscar por N° de legajo"
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
        />
      }
      <button onClick={() => onCreateTaxiRemis()}>Dar de alta nuevo Taxi/Remis</button>


      {
        crearTaxiRemis ?
          <CrearTaxiRemis
            addTaxiRemis={handleAddTaxiRemis}
            cratingTR={setCrearTaxiRemis}
          />
          :
          (isInputFocused ? (
            <RenderTaxiRemisPorLegajo
              legajoNum={legajoNum}
              taxiRemis={taxiRemis}
              deletedTR={onDeleteTaxiRemis} />
          ) : (
            <RenderTaxiRemis
              taxiRemis={taxiRemis}
              deletedTR={onDeleteTaxiRemis} />
          ))


      }

    </>
  )
}
