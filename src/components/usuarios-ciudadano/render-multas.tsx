import { ImageContainer, InfoItem, MultaCard, MultaInfo } from "./multas-styles";

export const RenderMultasCiudadano = ({ multas}) => {

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
                        <InfoItem><span>Ubicación de la infracción:</span> {multa.ubicacion_infraccion} </InfoItem>
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
                </MultaCard>
            ))}
        </>
    );
};
