import { useEffect, useState } from "react";
import { RenderUserPorNombre } from "./render-user-por-nombre";
import { RenderUsers } from "./render-users";
import { CrearUser } from "./crear-user";
import { BallTriangle } from "react-loader-spinner";
import getUsers from "../../../api/users";




export const VerUsers = () => {
    const [crearUser, setCrearUser] = useState(false)
    const [username, setUsername] = useState('')
    const [users, setUsers] = useState([])
    const [isInputFocused, setIsInputFocused] = useState(false)
    const [loading, setLoading] = useState(true);
    const [errorCargaDeDatos, setErrorCargaDeDatos] = useState(null)

    useEffect(() => {

        const fetchUsers = async () => {
            try {

                const usersData = await getUsers();
                if (usersData.length === 0) setErrorCargaDeDatos('No hay datos')

                setUsers(usersData);
                setLoading(false);

            } catch (error) {

                console.error('Error al obtener multas:', error);
                setLoading(false);
                setErrorCargaDeDatos('Error al obtener datos');
            }
        }

        fetchUsers()
    }, []);

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

            <div className="usersContainer">
                {
                    loading && (
                        <div className="loaderInScreens">
                            <BallTriangle
                                height={100}
                                width={100}
                                radius={5}
                                color="#4fa94d"
                                ariaLabel="ball-triangle-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            />

                        </div>

                    )
                }

                {
                    errorCargaDeDatos && (
                        <div className="mensajeError cargaDatosErro">
                            <h3>{errorCargaDeDatos}</h3>
                        </div>
                    )
                }

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
                                deletedUser={onDeleteUser} />
                        ) : (
                            <RenderUsers
                                users={users}
                                deletedUser={onDeleteUser} />
                        ))

                }
            </div>

        </>
    )
}
