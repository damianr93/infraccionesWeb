import { useEffect, useState } from 'react';
import { RenderMultas } from './render-multas';
import { RenderMultasPorNumero } from './render-multas-por-numero';
import { useObtenerMultas } from '../../../hook/obtenerMultas';
import Loading from 'react-fullscreen-loading';

export const VerMultas = () => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [numMulta, setNumMulta] = useState('');
    const infracciones = useObtenerMultas()
    const [multas, setMultas] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setMultas(infracciones);
        setLoading(false);
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
                loading && <Loading loading background="radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 60%, rgba(0, 0, 0, 0.8) 80%, rgba(0, 0, 0, 1) 100%), #00af5a" loaderColor="white" />
            }
            {
                multas.length > 0 && <input
                    className="inputBuscarMulta"
                    type="text"
                    placeholder="Buscar por N° de infracción"
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
