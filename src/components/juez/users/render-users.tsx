
import deleteUser from '../../../api/eliminar-user'

export const RenderUsers = ({ users, deletedUser }) => {


    const onClickDelete = async(user) => {
        deletedUser(user.id)
        await deleteUser(user.id)
    }

    return (
        users.map((user, index) => (
            <div key={index} className="usersCard">
                <ul id={user.id}>
                    <li><b>Nombre:</b> {user.name}</li>
                    <li><b>Username:</b> {user.username}</li>
                    <li><b>Email:</b> {user.email}</li>
                    <li><b>Tipo de usuario:</b> {user.tipo}</li>
                </ul>
                <div className='buttonsCrud'>
                    <button onClick={() => onClickDelete(user)}>Eliminar</button>
                </div>
            </div>

        ))
    )
}
