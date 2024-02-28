import { useState } from "react"
import crearTaxiRemis from "../../../api/crear-taxi-remis"
import { BallTriangle } from "react-loader-spinner"


export const CrearTaxiRemis = ({ addTaxiRemis, cratingTR }) => {
  const [mensajeError, setMensajeError] = useState('')
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    numero_legajo: '',
    dominio_vehiculo: '',
    numero_motor: '',
    numero_chasis: '',
    marca_vehiculo: '',
    modelo_vehiculo: '',
    nombre_titular: '',
    numero_licencia_conductor: '',
    nombre_conductor: '',
    poliza_seguro: '',
    vtv: '',
    revision_salud: '',
    desinfeccion_vehicular: '',
    taximetro: '',
    tipo: '',
    observaciones: '',
  })
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

  const handleRevisionSalud = (event) => {
    setValues(prevValues => ({
      ...prevValues,
      revision_salud: event.target.value
    }))
  }
  const handleDesinfeccionVehicular = (event) => {
    setValues(prevValues => ({
      ...prevValues,
      desinfeccion_vehicular: event.target.value
    }))
  }
  const handleTaximetro = (event) => {
    setValues(prevValues => ({
      ...prevValues,
      taximetro: event.target.value
    }))
  }

  const handleTipoTransporte = (event) => {
    setValues(prevValues => ({
      ...prevValues,
      tipo: event.target.value
    }))
  }
  const handleObservaciones = (event) => {
    setValues(prevValues => ({
      ...prevValues,
      observaciones: event.target.value
    }))
  }


  const onSubmit = async (event) => {
    event.preventDefault();
    setMensajeError(null)
    setLoading(true)

    try {
      const newTaxiRemis = await crearTaxiRemis({ ...values });
      addTaxiRemis(newTaxiRemis)
      cratingTR(false)
      setMensajeError(null)
      setLoading(false)

    } catch (error) {
      console.error('Error al enviar la solicitud PATCH:', error.message);
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
            <option>Seleccione una opción</option>
            <option value="Vigente">Vigente</option>
            <option value="Vencida">Vencida</option>
          </select>
        </div>
        <div>
          <label>Revision de salud:</label>
          <select
            value={values.revision_salud}
            onChange={handleRevisionSalud}
          >
            <option>Seleccione una opción</option>
            <option value="Vigente">Vigente</option>
            <option value="Pendiente">Pendiente</option>
          </select>
        </div>
        <div>
          <label>Desinfección vehicular:</label>
          <select
            value={values.desinfeccion_vehicular}
            onChange={handleDesinfeccionVehicular}
          >
            <option>Seleccione una opción</option>
            <option value="Regular">Regular</option>
            <option value="Pendiente">Pendiente</option>
          </select>
        </div>
        <div>
          <label>Taximetro:</label>
          <select
            value={values.taximetro}
            onChange={handleTaximetro}
          >
            <option>Seleccione una opción</option>
            <option value="En condiciones">En condiciones</option>
            <option value="Novedades">Novedades</option>
          </select>
        </div>
        <div>
          <label>Tipo:</label>
          <select
            value={values.tipo}
            onChange={handleTipoTransporte}
          >
            <option>Seleccione una opción</option>
            <option value="Remis">Remis</option>
            <option value="Taxi">Taxi</option>
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

        <button className="buttonEditarInfraccion" type='submit'>Guardar Cambios</button>

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

        {mensajeError &&
          <div className="mensajeError">
            <h3>{mensajeError}</h3>
          </div>
        }

      </form>
    </div>
  )
}
