import { useState } from 'react'
import loginUser from '../../api/login.js'
import { useNavigate } from 'react-router-dom';



function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()



  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    try {

      const user = await loginUser({ email: username, password });
      if ( user.statusCode >= 400 && user.statusCode < 500) {
        return setError('Email o contraseña no son correctas');
      } else {
        setError('');
      }
      
      const token = localStorage.getItem('token')
      if(token) localStorage.removeItem('token') 
      localStorage.setItem('token', user.token);

      switch(user.user.tipo) {
        case 'Juez':
          navigate('/juez', {replace:true})
        break;
      }

    } catch (error) {
      console.log(error)
    }

  }


  return (
    <form onSubmit={(event) => onSubmit(event)} className="login-container">
      <h1>Username</h1>
      <input
        type="text"
        placeholder='Nombre de usuario'
        value={username}
        onChange={handleUsernameChange}
      />

      <h1>Password</h1>
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      {error && <div className='errorMessage'>{error}</div>}
      <button type='submit'>Login</button>
    </form>
  )
}

export default LoginScreen

