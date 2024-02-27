import { useEffect, useState } from 'react';
import { RenderMultas } from './render-multas';
import { RenderMultasPorNumero } from './render-multas-por-numero';
import { useObtenerMultas } from '../../../hook/obtenerMultas';
import { BallTriangle } from "react-loader-spinner"

export const VerMultas = () => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [numMulta, setNumMulta] = useState('');
    const infracciones = useObtenerMultas()
    const [multas, setMultas] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setMultas(infracciones);
        if (infracciones.length > 0) setLoading(false)
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
                    placeholder="Buscar por N° de infracción"
                    onKeyDown={handleKeyDown}
                    onChange={handleInputChange}
                />
            }

            {
                loading && (
                    <div className="loaderInScreens">
                        <BallTriangle
                            height={100}
                            width={100}
                            radius={5}
                            color="#4fa94d"
                            ariaLabel="ball-triangle-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />

                    </div>

                )
            }


            {isInputFocused ? (
                <RenderMultasPorNumero
                    numMulta={numMulta}
                    multas={multas}
                    onDeleteMulta={handleDeleteMulta} />
            ) : (
                <RenderMultas
                    multas={multas}
                    onDeleteMulta={handleDeleteMulta} />
            )}
        </>
    );
};
