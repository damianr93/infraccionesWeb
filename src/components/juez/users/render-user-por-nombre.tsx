import deleteUser from '../../../api/eliminar-user.js'

export const RenderUserPorNombre = ({ usernam, users, deletedUser }) => {
  const user = users.find((user) => usernam === user.username);

  if (!user) {
    return (
      <div className="errorMessage">Especifique un número correcto de infracción.</div>);
  }

  const onClickDelete = async (user) => {
    deletedUser(user.id)
    await await deleteUser(user.id)
  }

  return (
    <div className='multas' id={user.id} >
      <ul>
        <li>Nombre: {user.name}</li>
        <li>Username: {user.username}</li>
        <li>Email: {user.email}</li>
        <li>Tipo de usuario: {user.tipo}</li>
      </ul>

      <div className='buttonsCrud'>
        <button onClick={() => onClickDelete(user)}>Eliminar</button>
      </div>
    </div>
  )
}
