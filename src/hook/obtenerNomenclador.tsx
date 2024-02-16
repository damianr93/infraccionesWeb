import { useEffect, useState } from "react";
import getNomenclador from '../api/nomenclador.js';

export const useObtenerNomenclador = () => {
    const [nomenclador, setNomenclador] = useState([]);

    useEffect(() => {
        const obtenerNomenclador = async () => {
            try {
                const nomencladorData = await getNomenclador();
                setNomenclador(nomencladorData);
            } catch (error) {
                console.error('Error al obtenerNomenclador:', error);
            }
        };

        obtenerNomenclador();
    }, []);

    return nomenclador;
};
