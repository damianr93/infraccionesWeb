import { useNavigate } from "react-router-dom";
import deleteMulta from '../../../api/eliminar-multa';
import { Buttons, DatosMulta, DatosPersonales, DatosUbicacion, DatosVehiculo, ImageContainer, InfoItem, MultaCard } from "./multas-styles";

export const RenderMultas = ({ multas, onDeleteMulta }) => {
    const navigation = useNavigate();

    const onClickEdit = (multa) => {
        navigation('/edition-infraccion', { state: multa });
    };

    const onClickDelete = async (multa) => {
        onDeleteMulta(multa.id);
        await deleteMulta(multa.id);
    };

    return (
        <>
            {multas.map((multa, index) => (
                <MultaCard key={index}>
                    <DatosVehiculo>
                        <h3>Datos del Vehículo:</h3>
                        <InfoItem><span>Dominio:</span> {multa.dominio}</InfoItem>
                        <InfoItem><span>Marca del vehículo:</span> {multa.marca_vehiculo} </InfoItem>
                        <InfoItem><span>Modelo del vehículo:</span> {multa.modelo_vehiculo} </InfoItem>
                        <InfoItem><span>Color del vehículo:</span> {multa.color_vehiculo} </InfoItem>
                    </DatosVehiculo>
                    <DatosMulta>
                        <h3>Infraccion y Juez:</h3>
                        <InfoItem><span>Estado: </span>{multa.estado} </InfoItem>
                        <InfoItem><span>Número de infracción: </span>{multa.numero_infraccion} </InfoItem>
                        <InfoItem><span>Infracciones nomenclador:</span>
                            {multa.id_nomenclador.map((nomenclador, nomencladorIndex) => (
                                <ul key={nomencladorIndex}>
                                    <li className='subElemento'>{nomenclador.nombre}</li>
                                </ul>
                            ))}
                        </InfoItem>
                        <InfoItem><span>Juez asignado: </span>{multa.juez_asignado && multa.juez_asignado.name} </InfoItem>
                    </DatosMulta>
                    <DatosPersonales>
                    <h3>Datos Personales:</h3>
                        <InfoItem><span>Nombre del propietario:</span> {multa.nombre_propietario}</InfoItem>
                        <InfoItem><span>Nombre del conductor:</span> {multa.nombre_conductor}</InfoItem>
                        <InfoItem><span>Domicilio del conductor:</span> {multa.domicilio_conductor} </InfoItem>
                        <InfoItem><span>Número de Licencia del conductor:</span> {multa.numero_licencia_conductor} </InfoItem>
                    </DatosPersonales>
                    <DatosUbicacion>
                    <h3>Referencia a Ubicacion:</h3>
                        <InfoItem><span>Ubicación de la infracción:</span> {multa.ubicacion_infraccion} </InfoItem>
                        <InfoItem><span>Referencia de ubicación:</span> {multa.referencia_ubicacion} </InfoItem>
                    </DatosUbicacion>
                    <ImageContainer>
                        {(multa.foto.length > 0) &&
                            <>
                                <InfoItem><span>Foto/s:</span></InfoItem>
                                {multa.foto.map((foto, id) => (
                                    <a key={id} href={foto} target="blank">
                                        <img className="imgPrueba" src={foto} alt="" />
                                    </a>
                                ))}
                            </>
                        }
                    </ImageContainer>
                    <Buttons>
                        <button className="edit" onClick={() => onClickEdit(multa)}>Editar</button>
                        <button className="delete" onClick={() => onClickDelete(multa)}>Eliminar</button>
                    </Buttons>

                </MultaCard >
            ))}
        </>
    );
};
