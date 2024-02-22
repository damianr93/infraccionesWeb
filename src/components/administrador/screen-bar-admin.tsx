
export const ScreenBarAdmin = ({ onOptionSelect }) => {

  const handleOptionClick = (option) => {
    onOptionSelect(option);
  };

  return (
    <>


      <div className="userOptions">
        <div className="logoContainer">
          <img className="logo" src="../../../public/la_rioja_logo.jpeg" alt="Logo" />
        </div>
        <button onClick={() => handleOptionClick('Gestion de usuarios')}>Gestion de usuarios</button>
        <button onClick={() => handleOptionClick('Trasnportes')}>Transportes</button>
        <button onClick={() => handleOptionClick('Taxis-remises')}>Taxis y Remises</button>
        <button onClick={() => handleOptionClick('turismo')}>Turismo</button>
        <button onClick={() => handleOptionClick('Cerrar sesión')}>Cerrar sesión</button>
      </div>
    </>

  )
}

