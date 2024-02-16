import { useState } from "react";
import { VerMultas } from "./multas/multas";
import { ScreenBarJuez } from "./screen-bar-juez";
import { VerNomencladores } from "./nomencladores/nomencladores";


export const JuezScreen = () => {

  const [selectedOption, setSelectedOption] = useState('');

  const renderOptionContent = () => {

    switch (selectedOption) {
      case 'Ver multas':
        return <VerMultas/>;
      case 'Administrar nomencladores':
        return <VerNomencladores/>;
      case 'Valor de unidad fija':
        return <div>Contenido para valor de unidad fija</div>;
      case 'Cerrar sesión':
        return <div>Contenido para cerrar sesión</div>;
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