import { useState } from "react";
import patchTurismoAdmin from "../../../api/editar-solicitud-estado-obs";

export const RenderTranspTurismo = ({ transpTurismo, setTransporteTurism, filtro }) => {
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

            await patchTurismoAdmin(transp.id, {
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
                                <button>Eliminar</button>
                            </div>
                        </div>
                    ))
            }

            {
                !filtro &&
                transpTurismo &&
                transpTurismo.map((transp, index) => (
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
                            <button>Eliminar</button>
                        </div>
                    </div>
                ))}
        </>
    );
};
