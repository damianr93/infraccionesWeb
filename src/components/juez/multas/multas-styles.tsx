import styled from 'styled-components';

const MultaCard = styled.div`
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 20px;
    height: 75px;
    overflow: hidden;   
    transition: transform 0.3s ease-in-out, height 0.3s ease-in-out;
    display: flex;
    flex-direction: column;

    &:hover {
        transform: scale(1.05);
        height: 750px;
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

export { MultaCard, MultaInfo, InfoItem, ImageContainer, CrudButtons };