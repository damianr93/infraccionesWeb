import { useEffect, useState } from 'react';
import getTaxiRemis from '../api/taxi-remis';


export const useObtenerTaxiRemis = () => {
    const [TaxiRemis, setTransportes] = useState([]);

    useEffect(() => {
        const obtenerTaxiRemis = async () => {
            try {
                const taxiRemisData = await getTaxiRemis();
                setTransportes(taxiRemisData);
            } catch (error) {
                console.error('Error al obtener Taxi-Remis:', error);
            }
        };

        obtenerTaxiRemis();
    }, []);

    return TaxiRemis;
};