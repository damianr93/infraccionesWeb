import { useEffect, useState } from 'react';
import { getTransporteTurismo } from '../api/t-turismo';



export const useObtenerTransporteTurismo = () => {
    const [transpTurismo, setTranspTurismo] = useState([]);

    useEffect(() => {
        const obtenerTranspTurismo = async () => {
            try {
                const transpTurismoData = await getTransporteTurismo();
                setTranspTurismo(transpTurismoData);
            } catch (error) {
                console.error('Error al obtener Transportes de Turismo:', error);
            }
        };

        obtenerTranspTurismo();
    }, []);

    return transpTurismo;
};