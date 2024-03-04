import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useObtenerNomenclador } from "../../../hook/obtenerNomenclador";
import { useObtenerUsuarios } from "../../../hook/obtenerUsers";
import patchMultas from "../../../api/editar-multa"
import { BallTriangle } from "react-loader-spinner"
import { uploadImagesToS3 } from "../../../api/aws";

export const EditarInfraccion = () => {
    const location = useLocation();
    const nomenclador = useObtenerNomenclador()
    const users = useObtenerUsuarios()
    const sessionStorageId = location.state.id
    const [imagesToUpload, setImagesToUpload] = useState([])
    const [selectedImages, setSelectedImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mensajeExito, setMensajeExito] = useState(null)
    const [mensajeError, setMensajeError] = useState(null)
    const [values, setValues] = useState(() => {
        const storedState = sessionStorage.getItem(`editValues-${sessionStorageId}`);
        return storedState ? JSON.parse(storedState) : {
            ...location.state,
            id_nomenclador: location.state.id_nomenclador || [],
        };
    });

    useEffect(() => {
        sessionStorage.setItem(`editValues-${sessionStorageId}`, JSON.stringify(values));
    }, [values]);

    const jueces = users.filter(user => user.tipo === 'Juez')

    const infracciones = values.id_nomenclador

    const handleQuitarInfracion = (id) => {
        const nuevasInfracciones = infracciones.filter(infraccion => infraccion.id !== id)

        setValues(prevValues => ({
            ...prevValues,
            id_nomenclador: nuevasInfracciones
        }));
    }

    const handleSeleccionarInfraccion = (event) => {
        const idSeleccionado = event.target.value;
        if (idSeleccionado === '') return
        const nuevaInfraccion = nomenclador.find(infraccion => infraccion.id === idSeleccionado);

        if (!values.id_nomenclador.some(item => item.id === nuevaInfraccion.id)) {
            setValues(prevValues => ({
                ...prevValues,
                id_nomenclador: [...infracciones, nuevaInfraccion]
            }));
        }
    }

    const handleJuez = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            juez_asignado: event.target.value
        }));

    }


    const handleDominio = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            dominio: event.target.value
        }))
    }

    const handlePropName = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            nombre_propietario: event.target.value
        }))
    }

    const handleDriverName = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            nombre_conductor: event.target.value
        }))
    }

    const handleAdressDriver = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            domicilio_conductor: event.target.value
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

    const handleCarColor = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            color_vehiculo: event.target.value
        }))
    }

    const handleLicNumber = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            numero_licencia_conductor: event.target.value
        }))
    }

    const handleLocationInfraction = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            ubicacion_infraccion: event.target.value
        }))
    }

    const handleLocationRef = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            referencia_ubicacion: event.target.value
        }))
    }

    const handleInfractionNum = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            numero_infraccion: event.target.value
        }))
    }

    const handleSeleccionarEstado = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            estado: event.target.value
        }))
    }

    const handleFoto = (foto) => {
        event.preventDefault()
        values.foto = values.foto.filter(photo => photo !== foto)
        setValues(prevValues => ({
            ...prevValues,
            fotos: values.foto
        }))
    }

    const handleImageChange = async (event) => {
        const selectedFile = event.target.files[0];

        const imageUrl = URL.createObjectURL(selectedFile);
        setSelectedImages((prevImages) => [...prevImages, imageUrl]);
        imagesToUpload.push(selectedFile)
        setImagesToUpload(imagesToUpload)

    };

    const onSubmit = async (event) => {
        event.preventDefault();
        setMensajeError(null)
        setMensajeExito(null)
        setLoading(true)

        const id_nomencladoresNuevos = values.id_nomenclador.map(nomenclador => nomenclador.id);

        try {

            const uploadedPhotos = await uploadImagesToS3(imagesToUpload)
            values.foto.push(...uploadedPhotos)
            setValues(values)

            await patchMultas(values.id, {
                ...values,
                juez_asignado: values.juez_asignado,
                id_nomenclador: id_nomencladoresNuevos,
            });

            setMensajeError(null)
            setLoading(false)
            setSelectedImages([])
            return setMensajeExito('Cambios guardados con exito!')

        } catch (error) {
            console.error('Error al enviar la solicitud PATCH:', error.message);
            setMensajeExito(null)
            setLoading(false)
            return setMensajeError(error.message)
        }
    }

    const handleButtonVolver = () => {
        window.history.back()
        sessionStorage.removeItem(`editValues-${sessionStorageId}`)
    }

    return (
        <div className="editing">
            <h1>Editando infracción N° {values.numero_infraccion}</h1>
            <form onSubmit={(event) => onSubmit(event)}>
                <div className="formEditInputs">
                    <div>
                        <label>Dominio:</label>
                        <input
                            type="text"
                            value={values.dominio}
                            onChange={handleDominio}
                        />
                    </div>
                    <div>
                        <label>Nombre del propietario:</label>
                        <input
                            type="text"
                            value={values.nombre_propietario}
                            onChange={handlePropName}
                        />
                    </div>
                    <div>
                        <label>Nombre del conductor:</label>
                        <input
                            type="text"
                            value={values.nombre_conductor}
                            onChange={handleDriverName}
                        />
                    </div>
                    <div>
                        <label>Domicilio del conductor:</label>
                        <input
                            type="text"
                            value={values.domicilio_conductor}
                            onChange={handleAdressDriver}
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
                        <label>Modelo del vehículo:</label>
                        <input
                            type="text"
                            value={values.modelo_vehiculo}
                            onChange={handleCarModel}
                        />
                    </div>
                    <div>
                        <label>Color del vehículo:</label>
                        <input
                            type="text"
                            value={values.color_vehiculo}
                            onChange={handleCarColor}
                        />
                    </div>
                    <div>
                        <label>Número de licencia del conductor:</label>
                        <input
                            type="text"
                            value={values.numero_licencia_conductor}
                            onChange={handleLicNumber}
                        />
                    </div>
                    <div>
                        <label>Ubicación de la infracción:</label>
                        <input
                            type="text"
                            value={values.ubicacion_infraccion}
                            onChange={handleLocationInfraction}
                        />
                    </div>
                    <div>
                        <label>Referencia de ubicación:</label>
                        <input
                            type="text"
                            value={values.referencia_ubicacion}
                            onChange={handleLocationRef}
                        />
                    </div>
                    <div>
                        <label>Nomenclador:</label>
                        <select
                            value={values.nomenclador}
                            onChange={handleSeleccionarInfraccion} /* Revisar Warning */
                        >
                            <option value="">Seleccione una opción</option>
                            {nomenclador.map(infraccion => {
                                return (
                                    <option key={infraccion.id} value={infraccion.id}>
                                        {infraccion.nombre}
                                    </option>
                                );
                            })}
                        </select>

                        {infracciones.length > 0 && (
                            infracciones.map(infraccion => {
                                return (
                                    <div className="nomencladorDiv" key={infraccion.id}>
                                        <p>{infraccion.nombre}</p>
                                        <button onClick={() => handleQuitarInfracion(infraccion.id)}>Quitar</button>
                                    </div>
                                );
                            })
                        )}
                    </div>
                    <div>
                        <label>Número de infracción:</label>
                        <input
                            type="text"
                            value={values.numero_infraccion}
                            onChange={handleInfractionNum}
                        />
                    </div>
                    <div>
                        <label>Estado:</label>
                        <select
                            value={values.estado}
                            onChange={handleSeleccionarEstado}
                        >
                            <option value="PAGADO">PAGADO</option>
                            <option value="PENDIENTE">PENDIENTE</option>
                            <option value="NULO">NULO</option>
                        </select>
                    </div>
                    <div>
                        <label>Juez asignado:</label>
                        <select
                            onChange={handleJuez}
                        >
                            <option>Seleccione una opción</option>
                            {jueces.map(juez => {
                                return (
                                    <option
                                        key={juez.id}
                                        value={juez.id}
                                    >
                                        {juez.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="fotosEditing">
                        {(values.foto.length > 0) &&
                            <ul>
                                <li>Foto/s:</li>
                                {values.foto.map((foto, id) => (
                                    <div key={id}>
                                        <a
                                            href={foto}
                                            target="blank">
                                            <img
                                                className="imgPrueba"
                                                src={foto}
                                                alt={foto} />
                                            <button
                                                className="eliminarImage"
                                                onClick={() => handleFoto(foto)}
                                            >eliminar
                                            </button>
                                        </a>
                                    </div>
                                ))}

                                {
                                    selectedImages && selectedImages.map((foto, id) => (
                                        <a key={id}>
                                            <img className="imgPrueba" src={foto} alt="Preview" />
                                        </a>
                                    ))
                                }

                            </ul>
                        }

                    </div>
                    <div className="selectImage">
                        <label
                            id="file-input-label"
                            htmlFor="file-input"
                        >Select a File</label>
                        <input
                            type="file"
                            id="file-input"
                            name="file-input"
                            onChange={handleImageChange} />
                    </div>
                </div>
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
                <div className="buttonsEditing">
                    <button className="buttonEditarInfraccion" type='submit'>Guardar Cambios</button>
                    <button
                        className="buttonEditarInfraccion"
                        type='button'
                        onClick={handleButtonVolver}
                    >
                        Volver
                    </button>

                </div>


            </form>
        </div>

    );
};
