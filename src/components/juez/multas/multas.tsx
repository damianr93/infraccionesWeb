import { useEffect, useState } from 'react';
import { RenderMultas } from './render-multas';
import { RenderMultasPorNumero } from './render-multas-por-numero';
import { BallTriangle } from "react-loader-spinner"
import getMultas from '../../../api/multas';

export const VerMultas = () => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [numMulta, setNumMulta] = useState('');
    const [multas, setMultas] = useState([])
    const [loading, setLoading] = useState(true);
    const [errorCargaDeDatos, setErrorCargaDeDatos] = useState(null)

    useEffect(() => {

        const fetchInfracciones = async () => {
            try {

                const multasData = await getMultas();
                if (multasData.length === 0) setErrorCargaDeDatos('No hay datos')

                setMultas(multasData);
                setLoading(false);

            } catch (error) {

                console.error('Error al obtener multas:', error);
                setLoading(false);
                setErrorCargaDeDatos('Error al obtener datos');
            }
        }

        fetchInfracciones()

    }, []);

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

            {
                errorCargaDeDatos && (
                    <div className="mensajeError cargaDatosErro">
                        <h3>{errorCargaDeDatos}</h3>
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
