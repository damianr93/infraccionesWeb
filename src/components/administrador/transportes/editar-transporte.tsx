import { useLocation } from "react-router-dom"
import { useObtenerTransportes } from "../../../hook/obtenerTransportes"
import { useEffect, useState } from "react"


export const EditarTransporte = () => {
  const location = useLocation()
  const transportesDB = useObtenerTransportes()
  const sessionStorageId = location.state.id
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

  return (
    <div className="editing">
      <h1>Editando transporte N° {values.numero_legajo}</h1>
      <form onSubmit={(event) => onSubmit(event)}>
        <div>
          <label>Numero de legajo:</label>
          <input
            type="text"
            value={values.numero_legajo}
            onChange={handleDominio}
          />
        </div>
        <div>
          <label>Dominio de vehiculo:</label>
          <input
            type="text"
            value={values.dominio_vehiculo}
            onChange={handlePropName}
          />
        </div>
        <div>
          <label>Numero de motor:</label>
          <input
            type="text"
            value={values.numero_motor}
            onChange={handleDriverName}
          />
        </div>
        <div>
          <label>Número chasis:</label>
          <input
            type="text"
            value={values.numero_chasis}
            onChange={handleAdressDriver}
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
            onChange={handleLicNumber}
          />
        </div>
        <div>
          <label>Numero licencia del conductor:</label>
          <input
            type="text"
            value={values.numero_licencia_conductor}
            onChange={handleLocationInfraction}
          />
        </div>
        <div>
          <label>Poliza seguro:</label>
          <input
            type="text"
            value={values.poliza_seguro}
            onChange={handleLocationRef}
          />
        </div>
        <div>
          <label>vtv:</label>
          <select></select>
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
