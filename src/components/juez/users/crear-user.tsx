import { useState } from "react"
import crearUser from '../../../api/crear-user.js'

export const CrearUser = ({addUser,cratingUser}) => {
    const [mensajeError, setMensajeError] = useState('')
    const [values, setValues] = useState({
        name:'',
        username:'',
        email:'',
        tipo:'',
        password:''

    })

    const handleName = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            name: event.target.value
        }))
    }

    const handleUsername = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            username: event.target.value
        }))
    }

    const handleEmail = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            email: event.target.value
        }))
    }

    const handleTipo = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            tipo: event.target.value
        }))
    }

    const handlePassword = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            password: event.target.value
        }))
    }

    
    const onSubmit = async (event) => {
        event.preventDefault();
        try {

        

            const newUser = await crearUser({...values});

            addUser(newUser)
            cratingUser(false)
            setMensajeError(null)

        } catch (error) {
            console.error('Error al enviar la solicitud PATCH:', error.message);
            return setMensajeError(error.message)
        }
    }

    return (
        <>
            <div className="editing">
                <h1>Crear un nuevo usuario</h1>
                <form onSubmit={(event) => onSubmit(event)}>
                    <label>Nombre:</label>
                    <input 
                    type="text"
                    value={values.name} 
                    onChange={handleName}
                    />
                    <label>Username:</label>
                    <input 
                    type="text" 
                    value={values.username}
                    onChange={handleUsername}
                    />
                    <label>Email:</label>
                    <input 
                    type="text" 
                    value={values.email}
                    onChange={handleEmail}
                    />
                    <label>Tipo:</label>
                    <select
                    value={values.tipo}
                    onChange={handleTipo}
                    >
                        <option value="">Seleccione un tipo</option>
                        <option value="Juez">Juez</option>
                        <option value="Administrador">Administador</option>
                        <option value="Corralon">Corralón</option>
                        <option value="Inspector">Inspector</option>
                        <option value="Turismo">Turismo</option>
                    </select>
                    <label>Password:</label>
                    <input 
                    type="text" 
                    value={values.password}
                    onChange={handlePassword}
                    />

                    <button className="buttonEditarInfraccion" type='submit'>Guardar Cambios</button>

                    {mensajeError &&
                        <div className="mensajeError">
                            <h3>{mensajeError}</h3>
                        </div>
                    }

                </form>
            </div>

        </>
    )
}