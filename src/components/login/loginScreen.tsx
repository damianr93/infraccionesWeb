import { useState } from 'react'
import loginUser from '../../api/login'
import { useNavigate } from 'react-router-dom';
import Loading from 'react-fullscreen-loading';

function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setLoading(true);

    try {

      const user = await loginUser({ username, password });
      if (user.statusCode >= 400 && user.statusCode < 500) {
        setLoading(false);
        return setError('Email o contraseña no son correctas');
      }

      const token = localStorage.getItem('token')
      if (token) localStorage.removeItem('token')
      localStorage.setItem('token', user.token);
      setLoading(false);

      switch (user.user.tipo) {
        case 'Juez':
          navigate('/juez', { replace: true })
          break;
        case 'Administrador':
          navigate('/admin', { replace: true })
          break;

      }

    } catch (error) {
      console.log(error)
    }

  }

  const handleBtnVerMultas = () => {
    navigate('/ciudadano', { replace: true })
  }


  return (
    <>
      <img className='imgLogin' src="https://infracciones-app.s3.sa-east-1.amazonaws.com/la_rioja_logo.jpeg" alt="Logo" />
      {loading ? <Loading loading background="radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 60%, rgba(0, 0, 0, 0.8) 80%, rgba(0, 0, 0, 1) 100%), #00af5a;" loaderColor="white" />
        : (
          <form onSubmit={(event) => onSubmit(event)} className="login-container">
            <h1>Usuario</h1>
            <input
              type="text"
              placeholder='Nombre de usuario'
              value={username}
              onChange={handleUsernameChange}
            />

            <h1>Contraseña</h1>
            <input
              type="password"
              placeholder='*********'
              value={password}
              onChange={handlePasswordChange}
            />
            {error && <div className='errorMessage'>{error}</div>}
            <button type='submit'>Ingresar</button>
          </form>
        )}

      {
        !loading &&
        <button
          className='VerMisMultasBtn'
          onClick={handleBtnVerMultas}
        >Ver mis multas</button>
      }

    </>

  )
}

export default LoginScreen

