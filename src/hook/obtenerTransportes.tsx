import { useEffect, useState } from 'react';
import getTransportes from '../api/transporte'

export const useObtenerTransportes = () => {
    const [transportes, setTransportes] = useState([]);

    useEffect(() => {
        const obtenerTransportes = async () => {
            try {
                const transportesData = await getTransportes();
                setTransportes(transportesData);
            } catch (error) {
                console.error('Error al obtener transportes:', error);
            }
        };

        obtenerTransportes();
    }, []);

    return transportes;
};










getTransportes