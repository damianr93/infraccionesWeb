import { useEffect, useState } from "react";
import { ScreenBarTurismo } from "./screen-bar-turismo";
import { useNavigate } from "react-router-dom";
import { SolicitudesObservadas } from "./solicitudes-observadas/solicitures-observadas";
import { SolicitudesAprobadas } from "./solicitudes-aprobadas/solicitudes-aprobadas";
import { GestionSolicitudes } from "./gestion-solicitudes/gestion-solicitudes";



export const TurismoScreen = () => {

  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    if (selectedOption === 'Cerrar sesión') {
      localStorage.removeItem('token');
      navigate('/login', { replace: true });
    }
  }, [selectedOption, navigate]);

  const renderOptionContent = () => {

    switch (selectedOption) {
      case 'Gestion de solicitudes':
        return <GestionSolicitudes/>;
      case 'Solicitudes aprobadas':
        return <SolicitudesAprobadas/>;
      case 'Solicitudes observadas':
        return <SolicitudesObservadas/>;
      default:
        return null;
    }
  }


    return (
      <div className="userScreen">
        <ScreenBarTurismo onOptionSelect={setSelectedOption} />
        <div className="options">
            {renderOptionContent()}
        </div>
      </div>
    )
  
}