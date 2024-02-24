import { useEffect, useState } from "react";
import getValorUnidadFija from '../api/combustible';



export const useObtenerValorUnFija = () => {
    const [valor, setValor] = useState();


    useEffect(() => {
        const obtenerValor = async () => {
            try {
                const valorData = await getValorUnidadFija();
                setValor(valorData[0]);
            } catch (error) {
                console.error('Error al obtener el valor de Unidad Fija:', error);
            }
        };

        obtenerValor();
    }, []);

    return valor;
};