import React from "react";
import { useNavigate } from "react-router-dom";
import deleteMulta from '../../../api/eliminar-multa';
import styled from 'styled-components';

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
                    <CrudButtons>
                        <button className="edit" onClick={() => onClickEdit(multa)}>Editar</button>
                        <button className="delete" onClick={() => onClickDelete(multa)}>Eliminar</button>
                    </CrudButtons>
                </MultaCard>
            ))}
        </>
    );
};

const MultaCard = styled.div`
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 20px;
    overflow: hidden;
    transition: transform 0.3s ease-in-out;
    display: flex;
    flex-direction: column;

    &:hover {
        transform: scale(1.05);
    }
`;

const MultaInfo = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const InfoItem = styled.li`
    width: calc(33.33% - 20px); /* Adjust the width as needed */
    box-sizing: border-box;
    float: left;
    margin-right: 20px;
    margin-bottom: 20px;
    margin-top: 20px;

    &:nth-child(3n) {
        margin-right: 0;
    }

    &:last-child {
        margin-bottom: 0;
    }

    span {
        font-weight: bold;
        margin-right: 8px;
        width: 150px; /* Adjust as needed for the width of titles */
        flex-shrink: 0; /* Prevent titles from shrinking */
    }
`;


const ImageContainer = styled.div`
    margin-top: 16px;
    text-align: center;
    background-color: #f9f9f9;

    img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
`;

const CrudButtons = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    button {
        padding: 10px 20px;
        font-size: 14px;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease-in-out;
    }

    button.edit {
        background-color: #3498db;

        &:hover {
            background-color: #2980b9;
        }
    }

    button.delete {
        background-color: #e74c3c;

        &:hover {
            background-color: #c0392b;
        }
    }
`;
