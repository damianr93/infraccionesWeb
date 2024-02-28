import { useEffect, useState } from "react";
import { CrearTaxiRemis } from "./crear-tr";
import { RenderTaxiRemisPorLegajo } from "./render-tr-por-numero-de-legajo";
import { RenderTaxiRemis } from "./render-tr";
import { BallTriangle } from "react-loader-spinner"
import getTaxiRemis from "../../../api/taxi-remis";

export const VerTaxiRemis = () => {
  const [crearTaxiRemis, setCrearTaxiRemis] = useState(false)
  const [legajoNum, setLegajoNum] = useState('')
  const [taxiRemis, setTaxiRemis] = useState([])
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [loading, setLoading] = useState(true);
  const [errorCargaDeDatos, setErrorCargaDeDatos] = useState(null)

  useEffect(() => {
    const fetchTaxiRemis = async () => {
      try {

        const taxiRemisData = await getTaxiRemis();
        if (taxiRemisData.length === 0) setErrorCargaDeDatos('No hay datos')
        setTaxiRemis(taxiRemisData);
        setLoading(false);

      } catch (error) {

        console.error('Error al obtener transportes:', error);
        setLoading(false);
        setErrorCargaDeDatos('Error al obtener datos');
      }
    }

    fetchTaxiRemis()
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

  const onCreateTaxiRemis = () => {
    setCrearTaxiRemis(true)
    setErrorCargaDeDatos(null)
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
