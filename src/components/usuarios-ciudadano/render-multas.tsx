import { CrudButtons, ImageContainer, InfoItem, MultaCard, MultaInfo } from "./multas-styles";
import generarLinkPago from "../../api/multas-generar-link";
import { ProgressBar } from "react-loader-spinner"
import { useState } from "react";

export const RenderMultasCiudadano = ({ multas}) => {

    const [loading, setLoading] = useState(false)

    const pagarMulta = (id) => {
        setLoading(true)
        generarLinkPago(id)
            .then((res) => {
                setLoading(false)
                window.open(res, '_blank');
                window.location.reload();
            })
    }

    return (
        <>
            {multas.map((multa, index) => (
                <MultaCard key={index}>
                    <MultaInfo>
                        <InfoItem><span>Dominio:</span> {multa.dominio}</InfoItem>
                        <InfoItem><span>Nombre del propietario:</span> {multa.nombre_propietario}</InfoItem>
                        <InfoItem><span>Nombre del conductor:</span> {multa.nombre_conductor}</InfoItem>
                        <InfoItem><span>Domicilio del conductor:</span> {multa.domicilio_conductor} </InfoItem>
                        <InfoItem><span>Marca del vehículo:</span> {multa.marca_vehiculo} </InfoItem>
                        <InfoItem><span>Modelo del vehículo:</span> {multa.modelo_vehiculo} </InfoItem>
                        <InfoItem><span>Color del vehículo:</span> {multa.color_vehiculo} </InfoItem>
                        <InfoItem><span>Número de Licencia del conductor:</span> {multa.numero_licencia_conductor} </InfoItem>
                        <InfoItem><span>Ubicación de la infracción:</span> <a href={`https://www.google.com/maps/search/?api=1&query=${multa.ubicacion_infraccion}`} target="_blank">VER MAPA</a> </InfoItem>
                        <InfoItem><span>Referencia de ubicación:</span> {multa.referencia_ubicacion} </InfoItem>
                        <InfoItem><span>Infracciones nomenclador:</span>
                            {multa.id_nomenclador.map((nomenclador, nomencladorIndex) => (
                                <ul key={nomencladorIndex}>
                                    <li className='subElemento'>{nomenclador.nombre}</li>
                                </ul>
                            ))}
                        </InfoItem>
                        <InfoItem><span>Número de infracción: </span>{multa.numero_infraccion} </InfoItem>
                        <InfoItem><span>Estado: </span>{multa.estado} </InfoItem>
                        <InfoItem><span>Juez asignado: </span>{multa.juez_asignado && multa.juez_asignado.name} </InfoItem>
                    </MultaInfo>
                    <ImageContainer>
                        {(multa.foto.length > 0) &&
                            <>
                                <li>Foto/s:</li>
                                {multa.foto.map((foto, id) => (
                                    <a key={id} href={foto} target="blank">
                                        <img className="imgPrueba" src={foto} alt="" />
                                    </a>
                                ))}
                            </>
                        }
                    </ImageContainer>
                    <CrudButtons>
                                <button className="edit" disabled={loading} onClick={
                                    () => pagarMulta(multa.id)
                                }>{
                                        loading ? <ProgressBar
                                            visible={loading}
                                            height="20"
                                            width="20"
                                            barColor="white"
                                            borderColor="white"
                                            ariaLabel="progress-bar-loading"
                                            wrapperStyle={{}}
                                            wrapperClass=""
                                        /> : 'Pagar'
                                }</button>
                        </CrudButtons>
                </MultaCard>
            ))}
        </>
    );
};
