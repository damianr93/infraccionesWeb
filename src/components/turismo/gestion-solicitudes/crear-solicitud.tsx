import { useState } from "react"
import { BallTriangle } from "react-loader-spinner"
import crearSolicitudTurismo from "../../../api/crear-solicitud-turismo"
import moment from "moment"


export const CrearSolicitud = ({ addSolicitud, cratingSolicitud }) => {
  const [loading, setLoading] = useState(false)
  const [mensajeError, setMensajeError] = useState(null)
  const [values, setValues] = useState({
    nombre_empresa: '',
    marca_vehiculo: '',
    dominio_vehiculo: '',
    nombre_conductores: '',
    fecha_hora_ingreso: '',
    fecha_hora_egreso: '',
    creado_por: '',
    ruta_ingreso: '',
    ruta_egreso: '',
    otra_informacion: '',
  })

  const handleNombreEmpresa = (event) => {
    setValues(prevValues => ({
      ...prevValues,
      nombre_empresa: event.target.value
    }))

  }

  const handleMarcaVehiculo = (event) => {
    setValues(prevValues => ({
      ...prevValues,
      marca_vehiculo: event.target.value
    }))
  }

  const handleDominio = (event) => {
    setValues(prevValues => ({
      ...prevValues,
      dominio_vehiculo: event.target.value
    }))
  }

  const handleNombresConductores = (event) => {
    setValues(prevValues => ({
      ...prevValues,
      nombre_conductores: event.target.value
    }))
  }

  const handleFechaIngreso = (event) => {

    setValues(prevValues => ({
      ...prevValues,
      fecha_hora_ingreso: event.target.value
    }))
  }


  const handleFechaEgreso = (event) => {
    setValues(prevValues => ({
      ...prevValues,
      fecha_hora_egreso: event.target.value
    }))
  }

  const handleRutaIngreso = (event) => {
    setValues(prevValues => ({
      ...prevValues,
      ruta_ingreso: event.target.value
    }))
  }

  const handleRutaEgreso = (event) => {
    setValues(prevValues => ({
      ...prevValues,
      ruta_egreso: event.target.value
    }))
  }
  const handleInformacionAdicional = (event) => {
    setValues(prevValues => ({
      ...prevValues,
      otra_informacion: event.target.value
    }))
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    setMensajeError(null)
    setLoading(true)

    const userId = sessionStorage.getItem('userId')
    const fechaIngreso = moment(values.fecha_hora_ingreso).format('DD-MM-YYYY HH:mm')
    const fechaEgreso = moment(values.fecha_hora_egreso).format('DD-MM-YYYY HH:mm')

    try {
      const newSolicitud = await crearSolicitudTurismo({
        ...values,
        creado_por: userId,
        fecha_hora_ingreso: fechaIngreso,
        fecha_hora_egreso: fechaEgreso


      });
      addSolicitud(newSolicitud)
      cratingSolicitud(false)
      setMensajeError(null)
      setLoading(false)

    } catch (error) {
      console.error('Error al enviar la solicitud POST:', error.message);
      setLoading(false)
      return setMensajeError(error.message)
    }
  }

  return (
    <div className="editing">
      <h1>Crear Solicitud de ingreso-egreso</h1>
      <form onSubmit={(event) => onSubmit(event)}>
        <div>
          <label>Nombre empresa:</label>
          <input
            type="text"
            value={values.nombre_empresa}
            onChange={handleNombreEmpresa}
          />
        </div>
        <div>
          <label>Marca del vehículo:</label>
          <input
            type="text"
            value={values.marca_vehiculo}
            onChange={handleMarcaVehiculo}
          />
        </div>
        <div>
          <label>Dominio:</label>
          <input
            type="text"
            value={values.dominio_vehiculo}
            onChange={handleDominio}
          />
        </div>
        <div>
          <label>Nombre/s conductor/es:</label>
          <input
            type="text"
            value={values.nombre_conductores}
            onChange={handleNombresConductores}
          />
        </div>
        <div>
          <label>Fecha y hora de ingreso:</label>
          <input
            type="datetime-local"
            value={values.fecha_hora_ingreso}
            onChange={handleFechaIngreso}
          />
        </div>

        <div>
          <label>Fecha y hora de egreso:</label>
          <input
            type="datetime-local"
            value={values.fecha_hora_egreso}
            onChange={handleFechaEgreso}
          />
        </div>

        <div>
          <label>Ruta ingreso:</label>
          <input
            type="text"
            value={values.ruta_ingreso}
            onChange={handleRutaIngreso}
          />
        </div>
        <div>
          <label>Ruta de egreso:</label>
          <input
            type="text"
            value={values.ruta_egreso}
            onChange={handleRutaEgreso}
          />
        </div>
        <div>
          <label>Informacion adicional:</label>
          <textarea
            className="editCreateTextArea"
            value={values.otra_informacion}
            onChange={handleInformacionAdicional}
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

