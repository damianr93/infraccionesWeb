// import { useNavigate } from 'react-router-dom'
import deleteUser from '../../../api/eliminar-user.js'

export const RenderUsers = ({ users, deletedUser }) => {
    // const navigation = useNavigate()
    

    // const onClickEdit = (user) => {
    //     navigation('/edition-user', { state: user })
    // }

    const onClickDelete = async(user) => {
        deletedUser(user.id)
        await deleteUser(user.id)
    }

    return (
        users.map((user, index) => (
            <div key={index} className="multas">
                <ul id={user.id}>
                    <li>Nombre: {user.name}</li>
                    <li>Username: {user.username}</li>
                    <li>Email: {user.email}</li>
                    <li>Tipo de usuario: {user.tipo}</li>
                </ul>
                <div className='buttonsCrud'>
                    {/* <button onClick={() => onClickEdit(user)}>Editar</button> */}
                    <button onClick={() => onClickDelete(user)}>Eliminar</button>
                </div>
            </div>

        ))
    )
}
