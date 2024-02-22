import { useEffect, useState } from 'react';
import { RenderMultas } from './render-multas';
import { RenderMultasPorNumero } from './render-multas-por-numero';
import { useObtenerMultas } from '../../../hook/obtenerMultas';

export const VerMultas = () => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [numMulta, setNumMulta] = useState('');
    const infracciones = useObtenerMultas()
    const [multas, setMultas] = useState([])

    useEffect(() => {
        setMultas(infracciones);
    }, [infracciones]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setIsInputFocused(true);
        }
    };

    const handleInputChange = (event) => {
        setNumMulta(event.target.value);
        if (event.target.value === '') setIsInputFocused(false)
    };

    const handleDeleteMulta = (id) => {
        const updatedMultas = multas.filter((multa) => multa.id !== id);
        setMultas(updatedMultas);
    };

    return (
        <>
            {
                multas.length > 0 && <input
                    className="inputBuscarMulta"
                    type="text"
                    placeholder="Buscar por N° de multa"
                    onKeyDown={handleKeyDown}
                    onChange={handleInputChange}
                />
            }


            {isInputFocused ? (
                <RenderMultasPorNumero 
                numMulta={numMulta} 
                multas={multas} 
                onDeleteMulta={handleDeleteMulta}/>
            ) : (
                <RenderMultas 
                multas={multas} 
                onDeleteMulta={handleDeleteMulta} />
            )}
        </>
    );
};
