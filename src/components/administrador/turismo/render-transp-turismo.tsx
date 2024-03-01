import { useState } from "react";
import deleteSolicitudTurismo from "../../../api/eliminar-solicitud-turismo";
import patchTurismo from "../../../api/editar-solicitud";

export const RenderTranspTurismo = ({ transpTurismo, setTransporteTurism, filtro, onDeleteSolicitud }) => {
    const [observandoSolicitudIndex, setObservandoSolicitudIndex] = useState(null);
    const [newEstado, setNewEstado] = useState('')
    const [newObservacion, setNewObservacion] = useState('')

    const onClickAprobar = (index) => {
        setObservandoSolicitudIndex(index);
    };

    const onFinalizarObservacion = async (transp) => {
        event.preventDefault()
        const updatedSolicitud = transpTurismo.map((s) =>
            s === transp
                ? {
                    ...s,
                    estado: newEstado,
                    observaciones: newObservacion,
                }
                : s
        );
        setTransporteTurism(updatedSolicitud);

        try {

            await patchTurismo(transp.id, {
                ...transp,
                estado: newEstado,
                observaciones: newObservacion,
                creado_por: transp.creado_por.id
            })

        } catch (error) {
            console.log(error)
        }

        setObservandoSolicitudIndex(null);

    }

    const onClickEliminar = async (transp) => {
        onDeleteSolicitud(transp.id)
        await deleteSolicitudTurismo(transp.id)

    }

    const handleObservaciones = (event) => {
        setNewObservacion(event.target.value)
    }
    const handleEstado = (event) => {
        setNewEstado(event.target.value)
    }

    return (
        <>
            {
                filtro !== '' &&
                transpTurismo &&
                transpTurismo
                    .filter(transp => transp.estado === filtro)
                    .map((transp, index) => (
                        <div key={index} className="SolicitudARevisar">
                            <ul>
                                <li>Empresa: {transp.nombre_empresa}</li>
                                <li>Marca del vehiculo: {transp.marca_vehiculo}</li>
                                <li>Dominio: {transp.dominio_vehiculo}</li>
                                <li>Conductores: {transp.nombre_conductores}</li>
                                <li>Ruta de ingreso: {transp.ruta_ingreso}</li>
                                <li>Ruta de egreso: {transp.ruta_egreso}</li>
                                <li>Informacion adicional: {transp.otra_informacion}</li>
                                <li>Fecha de ingreso: {transp.fecha_hora_ingreso}</li>
                                <li>Fecha de egreso: {transp.fecha_hora_egreso}</li>
                                <li>Creado por: {transp.creado_por.name}</li>
                                {
                                    transp.observaciones &&
                                    <li>Observacion: {transp.observaciones}</li>
                                }
                                <li>Estado: <span className={
                                    transp.estado === "Pendiente Revision" ? "" :
                                        transp.estado === "Observado" ? "resaltarInfo" :
                                            "resaltarInfo2"
                                }>{transp.estado}</span></li>
                            </ul>
                            {observandoSolicitudIndex !== null && observandoSolicitudIndex === index ? (
                                <form className="observacionSolicitud">
                                    <textarea
                                        value={newObservacion}
                                        onChange={handleObservaciones}
                                        placeholder="Su descargo aquí..."
                                        className="editCreateTextArea"
                                    />
                                    <select
                                        value={newEstado}
                                        onChange={handleEstado}
                                    >
                                        <option>Seleccione una opción</option>
                                        <option value="Observado">Observado</option>
                                        <option value="Solicitud Aprobada">Solicitud Aprobada</option>
                                    </select>
                                    <button onClick={() => onFinalizarObservacion(transp)}>Finalizar observación</button>
                                </form>
                            ) : null}
                            <div>
                                <button onClick={() => onClickAprobar(index)}>Aprobar - Observar</button>
                                {
                                    observandoSolicitudIndex !== null && observandoSolicitudIndex === index ?
                                        <button onClick={() => setObservandoSolicitudIndex(null)}>Cancelar</button> :
                                        null
                                }
                                <button onClick={() => onClickEliminar(transp)}>Eliminar</button>
                            </div>
                        </div>
                    ))
            }

            {
                !filtro &&
                transpTurismo &&
                transpTurismo.map((solicitud, index) => (
                    <div key={index} className='solicitudContainer'>
                        <div className="infoGral">
                            <h3>Informacion General:</h3>
                            <ul>
                                <li><b>Nombre empresa:</b> {solicitud.nombre_empresa}</li>
                                <li><b>Marca del vehículo:</b> {solicitud.nombremarca_vehiculo_empresa}</li>
                                <li><b>Domínio:</b> {solicitud.dominio_vehiculo}</li>
                                <li><b>Conductor/es:</b> {solicitud.nombre_conductores}</li>
                                <li><b>Informacion adicional:</b> {solicitud.otra_informacion}</li>
                            </ul>
                        </div>
                        <div className="estado">
                            <h3>Estado:</h3>
                            <ul>
                                <li><b>Estado: </b><span className={
                                    solicitud.estado === "Pendiente Revision" ? "" :
                                        solicitud.estado === "Observado" ? "resaltarInfo" :
                                            "resaltarInfo2"
                                }>{solicitud.estado}</span></li>
                                {
                                    solicitud.observaciones &&
                                    <li><b>Observacion: </b>{solicitud.observaciones}</li>
                                }
                            </ul>

                        </div>
                        <div className="rutaFecha">
                            <h3>Ruta y fecha:</h3>
                            <ul>
                                <li><b>Fecha de ingreso: </b>{solicitud.fecha_hora_ingreso}</li>
                                <li><b>Fecha de egreso: </b>{solicitud.fecha_hora_egreso}</li>
                                <li><b>Ruta de ingreso: </b>{solicitud.ruta_ingreso}</li>
                                <li><b>Ruta de egreso: </b>{solicitud.ruta_egreso}</li>
                            </ul>

                        </div>
                        {observandoSolicitudIndex !== null && observandoSolicitudIndex === index ? (
                            <form className="observacionSolicitud">
                                <textarea
                                    value={newObservacion}
                                    onChange={handleObservaciones}
                                    placeholder="Su descargo aquí..."
                                    className="editCreateTextArea"
                                />
                                <select
                                    value={newEstado}
                                    onChange={handleEstado}
                                >
                                    <option>Seleccione una opción</option>
                                    <option value="Observado">Observado</option>
                                    <option value="Solicitud Aprobada">Solicitud Aprobada</option>
                                </select>
                                <button onClick={() => onFinalizarObservacion(solicitud)}>Finalizar observación</button>
                            </form>
                        ) : null}
                        <div className="buttons">
                            <button onClick={() => onClickAprobar(index)}>Aprobar - Observar</button>
                            {
                                observandoSolicitudIndex !== null && observandoSolicitudIndex === index ?
                                    <button onClick={() => setObservandoSolicitudIndex(null)}>Cancelar</button> :
                                    null
                            }
                            <button onClick={() => onClickEliminar(solicitud)}>Eliminar</button>
                        </div>
                    </div>


                    // <div key={index} className="SolicitudARevisar">
                    //     <ul>
                    //         <li>Empresa: {transp.nombre_empresa}</li>
                    //         <li>Marca del vehiculo: {transp.marca_vehiculo}</li>
                    //         <li>Dominio: {transp.dominio_vehiculo}</li>
                    //         <li>Conductores: {transp.nombre_conductores}</li>
                    //         <li>Ruta de ingreso: {transp.ruta_ingreso}</li>
                    //         <li>Ruta de egreso: {transp.ruta_egreso}</li>
                    //         <li>Informacion adicional: {transp.otra_informacion}</li>
                    //         <li>Fecha de ingreso: {transp.fecha_hora_ingreso}</li>
                    //         <li>Fecha de egreso: {transp.fecha_hora_egreso}</li>
                    //         <li>Creado por: {transp.creado_por.name}</li>
                    //         {
                    //             transp.observaciones &&
                    //             <li>Observacion: {transp.observaciones}</li>
                    //         }
                    //         <li>Estado: <span className={
                    //             transp.estado === "Pendiente Revision" ? "" :
                    //                 transp.estado === "Observado" ? "resaltarInfo" :
                    //                     "resaltarInfo2"
                    //         }>{transp.estado}</span></li>
                    //     </ul>
                        // {observandoSolicitudIndex !== null && observandoSolicitudIndex === index ? (
                        //     <form className="observacionSolicitud">
                        //         <textarea
                        //             value={newObservacion}
                        //             onChange={handleObservaciones}
                        //             placeholder="Su descargo aquí..."
                        //             className="editCreateTextArea"
                        //         />
                        //         <select
                        //             value={newEstado}
                        //             onChange={handleEstado}
                        //         >
                        //             <option>Seleccione una opción</option>
                        //             <option value="Observado">Observado</option>
                        //             <option value="Solicitud Aprobada">Solicitud Aprobada</option>
                        //         </select>
                        //         <button onClick={() => onFinalizarObservacion(transp)}>Finalizar observación</button>
                        //     </form>
                        // ) : null}

                    //     <div>
                    // <button onClick={() => onClickAprobar(index)}>Aprobar - Observar</button>
                    // {
                    //     observandoSolicitudIndex !== null && observandoSolicitudIndex === index ?
                    //         <button onClick={() => setObservandoSolicitudIndex(null)}>Cancelar</button> :
                    //         null
                    // }
                    // <button onClick={() => onClickEliminar(transp)}>Eliminar</button>
                    //     </div>
                    // </div>
                ))}
        </>
    );
};
