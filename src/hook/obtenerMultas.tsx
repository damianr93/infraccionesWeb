import { useEffect, useState } from "react";
import getMultas from '../api/multas';

export const useObtenerMultas = () => {
    const [multas, setMultas] = useState([]);

    useEffect(() => {
        const obtenerMultas = async () => {
            try {
                const multasData = await getMultas();
                setMultas(multasData);
            } catch (error) {
                console.error('Error al obtener multas:', error);
            }
        };

        obtenerMultas();
    }, []);

    return multas;
};