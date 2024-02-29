import { Navigate, Route, Routes } from "react-router-dom"
import LoginScreen from "../components/login/loginScreen"
import { JuezScreen } from "../components/juez/juezScreen"
import { EditarInfraccion } from "../components/juez/multas/editar-infraccion"
import { EditarNomenclador } from "../components/juez/nomencladores/editar-nomenclador"
import { AdminScreen } from "../components/administrador/adminScreen"
import { EditarTransporte } from "../components/administrador/transportes/editar-transporte"
import { EditarTaxiRemis } from "../components/administrador/taxis-remises/editar-tr"
import { CiudadanoScreen } from "../components/usuarios-ciudadano/ciudadanoScreen"
import { TurismoScreen } from "../components/turismo/turismoScreen"


export const AppRouter = () => {

    return(
    <>
    <Routes>
        <Route path="login" element={<LoginScreen/>} />
        <Route path="juez" element={<JuezScreen/>} />
        <Route path="admin" element={<AdminScreen/>} />
        <Route path="turismo" element={<TurismoScreen/>} /> 
        <Route path="ciudadano" element={<CiudadanoScreen/>} />
        <Route path="edition-infraccion" element={<EditarInfraccion/>} />
        <Route path="edition-nomenclador" element={<EditarNomenclador/>} />
        <Route path="edition-transporte" element={<EditarTransporte/>} />
        <Route path="edition-taxi-remis" element={<EditarTaxiRemis/>} />


        <Route path="/" element={<Navigate to="login"/>} />
    </Routes>

    </>
    )
}
