import { Navigate, Route, Routes } from "react-router-dom"
import LoginScreen from "../components/login/loginScreen"
import { JuezScreen } from "../components/juez/juezScreen"
import { EditarInfraccion } from "../components/juez/multas/editar-infraccion"
import { EditarNomenclador } from "../components/juez/nomencladores/editar-nomenclador"
import { EditarUser } from "../components/juez/users/editar-user"

export const AppRouter = () => {

    return(
    <>
    <Routes>
        <Route path="login" element={<LoginScreen/>} />
        <Route path="juez" element={<JuezScreen/>} />
        <Route path="edition-infraccion" element={<EditarInfraccion/>} />
        <Route path="edition-nomenclador" element={<EditarNomenclador/>} />
        <Route path="edition-user" element={<EditarUser/>} />


        <Route path="/" element={<Navigate to="login"/>} />
    </Routes>

    </>
    )
}
