import { useNavigate } from "react-router-dom";
import { ScreenBarAdmin } from "./screen-bar-admin";
import { useEffect, useState } from "react";
import { VerUsers } from "../juez/users/users";
import { VerTurismo } from "./turismo/turismo";
import { VerTaxisRemises } from "./taxis-remises/taxis-remises";
import { VerTransportes } from "./transportes/transportes";

export const AdminScreen = () => {

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
      case 'Gestion de usuarios':
        return <VerUsers/>;
      case 'Trasnportes':
        return <VerTransportes/>;
      case 'Taxis-remises':
        return <VerTaxisRemises/>;
      case 'turismo':
        return <VerTurismo/>;
      default:
        return null;
    }
  }


    return (
      <div className="userScreen">
        <ScreenBarAdmin onOptionSelect={setSelectedOption} />
        <div className="options">
            {renderOptionContent()}
        </div>
      </div>
    )
  
}