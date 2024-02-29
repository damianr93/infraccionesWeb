

export const ScreenBarTurismo = ({ onOptionSelect }) => {

  const handleOptionClick = (option) => {
    onOptionSelect(option);
  };

  return (
    <>
      <div className="userOptions">
      <div className="logoContainer">
        <img className="logo" src="https://infracciones-app.s3.sa-east-1.amazonaws.com/la_rioja_logo.jpeg" alt="Logo" />
      </div>
        <button onClick={() => handleOptionClick('Gestion de solicitudes')}>Gestión de Solicitudes</button>
        <button onClick={() => handleOptionClick('Solicitudes aprobadas')}>Solicitudes Aprobadas</button>
        <button onClick={() => handleOptionClick('Solicitudes observadas')}>Solicitudes Observadas</button>
        <button onClick={() => handleOptionClick('Cerrar sesión')}>Cerrar sesión</button>
      </div>
    </>

  )
}