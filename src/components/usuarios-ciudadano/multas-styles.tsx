import styled from 'styled-components';

const MultaCard = styled.div`
    background-color: #fff;
    border: 1px solid #ddd;
    width: 75%;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 20px;
    padding:10px;
    overflow: hidden;   
    transition: transform 0.3s ease-in-out, height 0.3s ease-in-out;
    display: grid; 
    gap: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr; 
    grid-template-rows: 1fr 0.5fr 1.5fr 0.3fr 1.7fr 0.5fr 1.5fr auto;
    grid-template-areas: 
    "DatosVehiculo DatosVehiculo DatosMulta DatosMulta"
    "DatosVehiculo DatosVehiculo DatosMulta DatosMulta"
    "DatosPersonales DatosPersonales DatosUbicacion DatosUbicacion"
    "DatosPersonales DatosPersonales DatosUbicacion DatosUbicacion"
    "ImageContainer ImageContainer ImageContainer ImageContainer"
    "ImageContainer ImageContainer ImageContainer ImageContainer"
    "buttons buttons buttons buttons";

    &:hover {
        transform: scale(1.005);
        overflow: auto;
    }
`;

const DatosVehiculo =  styled.div`
    grid-area: DatosVehiculo;
    text-align: left;
    border: 1px solid black;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5)
`
const DatosMulta = styled.div`
    grid-area: DatosMulta; 
    text-align: left;
    border: 1px solid black;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5)
`

const DatosPersonales = styled.div`
    grid-area: DatosPersonales; 
    text-align: left;
    border: 1px solid black;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5)
`
const DatosUbicacion = styled.div`
    grid-area: DatosUbicacion; 
    text-align: left;
    border: 1px solid black;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5)
`

const InfoItem = styled.li`
    list-style: none;
    width: 75%;

    &:nth-child(3n) {
        margin-right: 0;
    }
    &:last-child {
        margin-bottom: 0;
    }

    span {
        font-weight: bold;
        margin-right: 8px;
        width: 150px; 
    }
`;


const ImageContainer = styled.div`
    grid-area: ImageContainer;
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

const Buttons = styled.div`
    grid-area: buttons;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

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

export { MultaCard, InfoItem, ImageContainer, Buttons, DatosVehiculo, DatosMulta, DatosPersonales, DatosUbicacion };