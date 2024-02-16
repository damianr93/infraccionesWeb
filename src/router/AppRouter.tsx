import { Navigate, Route, Routes } from "react-router-dom"
import LoginScreen from "../components/login/loginScreen"
import { JuezScreen } from "../components/juez/juezScreen"
import { EditarElemento } from "../components/edition-infraction/editar-elemento"


export const AppRouter = () => {

    return(
    <>
    <Routes>
        <Route path="login" element={<LoginScreen/>} />
        <Route path="juez" element={<JuezScreen/>} />
        <Route path="edition-infraccion" element={<EditarElemento/>} />

        <Route path="/" element={<Navigate to="login"/>} />
    </Routes>

    </>
    )

}