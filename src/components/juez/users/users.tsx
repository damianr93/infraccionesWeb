import { useEffect, useState } from "react";
import { useObtenerUsuarios } from "../../../hook/obtenerUsers";
import { RenderUserPorNombre } from "./render-user-por-nombre";
import { RenderUsers } from "./render-users";
import { CrearUser } from "./crear-user";


export const VerUsers = () => {
    const usersInDB = useObtenerUsuarios()
    const [crearUser, setCrearUser] = useState(false)
    const [username, setUsername] = useState('')
    const [users, setUsers] = useState([])
    const [isInputFocused, setIsInputFocused] = useState(false)

    useEffect(() => {
        setUsers(usersInDB);
    }, [usersInDB]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setIsInputFocused(true);
        }
    };

    const handleInputChange = (event) => {
        setUsername(event.target.value);
        if (event.target.value === '') setIsInputFocused(false)
    };

    const onDeleteUser = (id) => {
        const usersNotDeleted = users.filter(user => id !== user.id)
        setUsers(usersNotDeleted)
    }

    const onCreateUser = () => {
        setCrearUser(true)
    }

    const handleAddUser = (user) => {
        users.push(user)
        setUsers(users)
    }

    return (
        <>
            {
                users.length > 0 && <input
                    className="inputBuscarMulta"
                    type="text"
                    placeholder="Buscar por username"
                onKeyDown={handleKeyDown}
                onChange={handleInputChange}
                />
            }
            <button onClick={() => onCreateUser()}>Dar de alta nuevo usuario</button>

            {
                crearUser ? 
                <CrearUser
                addUser={handleAddUser}
                cratingUser={setCrearUser}
                /> 
                :
                (isInputFocused ? (
                    <RenderUserPorNombre
                    usernam={username}
                    users={users}
                    deletedUser={onDeleteUser}/>
                ) : (
                    <RenderUsers 
                    users={users} 
                    deletedUser={onDeleteUser}/>
                ))

            }
        </>
    )
}
