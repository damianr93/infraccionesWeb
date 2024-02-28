import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import patchTransporte from "../../../api/editar-trasnporte"
import { BallTriangle } from "react-loader-spinner"

export const EditarTransporte = () => {
  const location = useLocation()
  const sessionStorageId = location.state.id
  const [loading, setLoading] = useState(false);
  const [mensajeExito, setMensajeExito] = useState(null)
  const [mensajeError, setMensajeError] = useState(null)
  const [values, setValues] = useState(() => {
    const storedState = sessionStorage.getItem(`editValues-${sessionStorageId}`);
    return storedState ? JSON.parse(storedState) : {
      ...location.state
    };
  });

  useEffect(() => {
    sessionStorage.setItem(`editValues-${sessionStorageId}`, JSON.stringify(values));
  }, [values]);

  const handleNumLegado = (event) => {
    setValues(prevValues => ({
      ...prevValues,
      numero_legajo: event.target.value
    }))
  }
  const handleDominio = (event) => {
    setValues(prevValues => ({
      ...prevValues,
      dominio_vehiculo: event.target.value
    }))
  }
  const handleNumeroMotor = (event) => {
    setValues(prevValues => ({
      ...prevValues,
      numero_motor: event.target.value
    }))
  }
  const handleNumChasis = (event) => {
    setValues(prevValues => ({
      ...prevValues,
      numero_chasis: event.target.value
    }))
  }
  const handleMarcaVehiculo = (event) => {
    setValues(prevValues => ({
      ...prevValues,
      marca_vehiculo: event.target.value
    }))
  }
  const handleCarModel = (event) => {
    setValues(prevValues => ({
      ...prevValues,
      modelo_vehiculo: event.target.value
    }))
  }
  const handleNombleTitular = (event) => {
    setValues(prevValues => ({
      ...prevValues,
      nombre_titular: event.target.value
    }))
  }
  const handleNumeroLicenciaConductor = (event) => {
    setValues(prevValues => ({
      ...prevValues,
      numero_licencia_conductor: event.target.value
    }))
  }

  const handleNombreConductor = (event) => {
    setValues(prevValues => ({
      ...prevValues,
      nombre_conductor: event.target.value
    }))
  }

  const handlePoliza = (event) => {
    setValues(prevValues => ({
      ...prevValues,
      poliza_seguro: event.target.value
    }))
  }
  const handleVtv = (event) => {
    setValues(prevValues => ({
      ...prevValues,
      vtv: event.target.value
    }))
  }
  const handleTipoTransporte = (event) => {
    setValues(prevValues => ({
      ...prevValues,
      tipo_transporte: event.target.value
    }))
  }
  const handleObservaciones = (event) => {
    setValues(prevValues => ({
      ...prevValues,
      observaciones: event.target.value
    }))
  }

  const handleButtonVolver = () => {
    window.history.back()
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    setMensajeError(null)
    setMensajeExito(null)
    setLoading(true)

    try {

      await patchTransporte(values.id, { ...values });

      setMensajeError(null)
      setLoading(false)
      return setMensajeExito('Cambios guardados con exito!')

    } catch (error) {
      console.error('Error al enviar la solicitud PATCH:', error.message);
      setMensajeExito(null)
      setLoading(false)
      return setMensajeError(error.message)
    }
  }



  return (
    <div className="editing">
      <h1>Editando transporte N° {values.numero_legajo}</h1>
      <form onSubmit={(event) => onSubmit(event)}>
        <div>
          <label>Numero de legajo:</label>
          <input
            type="text"
            value={values.numero_legajo}
            onChange={handleNumLegado}
          />
        </div>
        <div>
          <label>Dominio de vehiculo:</label>
          <input
            type="text"
            value={values.dominio_vehiculo}
            onChange={handleDominio}
          />
        </div>
        <div>
          <label>Numero de motor:</label>
          <input
            type="text"
            value={values.numero_motor}
            onChange={handleNumeroMotor}
          />
        </div>
        <div>
          <label>Número chasis:</label>
          <input
            type="text"
            value={values.numero_chasis}
            onChange={handleNumChasis}
          />
        </div>
        <div>
          <label>Marca vehículo:</label>
          <input
            type="text"
            value={values.marca_vehiculo}
            onChange={handleMarcaVehiculo}
          />
        </div>
        <div>
          <label>Modelo vehiculo:</label>
          <input
            type="text"
            value={values.modelo_vehiculo}
            onChange={handleCarModel}
          />
        </div>
        <div>
          <label>Nombre titular:</label>
          <input
            type="text"
            value={values.nombre_titular}
            onChange={handleNombleTitular}
          />
        </div>
        <div>
          <label>Numero licencia del conductor:</label>
          <input
            type="text"
            value={values.numero_licencia_conductor}
            onChange={handleNumeroLicenciaConductor}
          />
        </div>

        <div>
          <label>Nombre del conductor:</label>
          <input
            type="text"
            value={values.nombre_conductor}
            onChange={handleNombreConductor}
          />
        </div>

        <div>
          <label>Poliza seguro:</label>
          <input
            type="text"
            value={values.poliza_seguro}
            onChange={handlePoliza}
          />
        </div>
        <div>
          <label>vtv:</label>
          <select
            value={values.vtv}
            onChange={handleVtv}
          >
            <option value="Vigente">Vigente</option>
            <option value="Vencida">Vencida</option>
          </select>
        </div>
        <div>
          <label>Tipo:</label>
          <select
            value={values.tipo_transporte}
            onChange={handleTipoTransporte}
          >
            <option value="Carga-Descarga">Carga-Descarga</option>
            <option value="Aridos">Aridos</option>
          </select>
        </div>
        <div>
          <label>Observaciones:</label>
          <input
            type="text"
            value={values.observaciones}
            onChange={handleObservaciones}
          />
        </div>

        <div>
          <button className="buttonEditarInfraccion" type='submit'>Guardar Cambios</button>
          <button
            className="buttonEditarInfraccion"
            type='button'
            onClick={handleButtonVolver}
          >
            Volver
          </button>

          {
            loading && (
              <div className="loaderInScreens editSection">
                <BallTriangle
                  height={50}
                  width={50}
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

          {mensajeExito && !mensajeError &&
            <div className="mensajeExito">
              <h3>{mensajeExito}</h3>
            </div>
          }

          {!mensajeExito && mensajeError &&
            <div className="mensajeError">
              <h3>{mensajeError}</h3>
            </div>
          }
        </div>

      </form>
    </div>
  )
}
