

export const ScreenBarJuez = ({ onOptionSelect }) => {

  const handleOptionClick = (option) => {
    onOptionSelect(option);
  };

  return (
    <>

      <div className="userOptions">
      <div className="logoContainer">
        <img className="logo" src="https://infracciones-app.s3.sa-east-1.amazonaws.com/la_rioja_logo.jpeg" alt="Logo" />
      </div>
        <button onClick={() => handleOptionClick('Gestion de usuarios')}>Gestion de usuarios</button>
        <button onClick={() => handleOptionClick('Ver multas')}>Ver multas</button>
        <button onClick={() => handleOptionClick('Administrar nomencladores')}>Administrar nomencladores</button>
        <button onClick={() => handleOptionClick('Valor de unidad fija')}>Valor de unidad fija</button>
        <button onClick={() => handleOptionClick('Cerrar sesión')}>Cerrar sesión</button>
      </div>
    </>

  )
}