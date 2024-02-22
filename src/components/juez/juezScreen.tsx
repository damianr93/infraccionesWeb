import { useEffect, useState } from "react";
import { VerMultas } from "./multas/multas";
import { ScreenBarJuez } from "./screen-bar-juez";
import { VerNomencladores } from "./nomencladores/nomencladores";
import { ValorUnidadFija } from "./valor-unidad-fija/valor-unidad-fija";
import { useNavigate } from "react-router-dom";
import { VerUsers } from "./users/users";


export const JuezScreen = () => {

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
      case 'Ver multas':
        return <VerMultas/>;
      case 'Administrar nomencladores':
        return <VerNomencladores/>;
      case 'Valor de unidad fija':
        return <ValorUnidadFija/>;
      default:
        return null;
    }
  }


    return (
      <div className="userScreen">
        <ScreenBarJuez onOptionSelect={setSelectedOption} />
        <div className="options">
            {renderOptionContent()}
        </div>
      </div>
    )
  
}