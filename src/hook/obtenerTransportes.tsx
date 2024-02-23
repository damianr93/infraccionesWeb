import { useEffect, useState } from 'react';
import getTaxisRemises from '../api/taxis-remises.js'

export const useObtenerTransportes = () => {
    const [transportes, setTransportes] = useState([]);

    useEffect(() => {
        const obtenerTransportes = async () => {
            try {
                const transportesData = await getTaxisRemises();
                setTransportes(transportesData);
            } catch (error) {
                console.error('Error al obtener transportes:', error);
            }
        };

        obtenerTransportes();
    }, []);

    return transportes;
};










getTaxisRemises