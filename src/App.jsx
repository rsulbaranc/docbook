//import React from 'react'}

//import Navbar from "./components/navbar/Navbar";
//import { Container } from "./components/ui";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Profile } from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import DashboardDoctor from "./pages/DashboardDoctor";
import { useAuth } from "./context/AuthContext";
import { ProtectedRoute} from "./components/guards/ProtectedRoute";
import { PatientGuard } from "./components/guards/PatientGuard";
import { DoctorGuard } from "./components/guards/DoctorGuard";
import  RegisterPatient  from "./pages/RegisterPatient"
import RecordForm from "./pages/RecordForm";
import { LayoutSidebar } from "./components/navbar/Layout-sidebar";
import { MantenimientoUsuario } from "./pages/admin/MantenimientoUsuario";
import { MantenimientoPerfil } from "./pages/admin/MantenimientoPerfil";
import { MantenimientoEspecialidades } from "./pages/admin/MantenimientoEspecialidades";
import { MantenimientoPersona } from "./pages/admin/MantenimientoPersona";
import { MantenimientoProceso } from "./pages/admin/MantenimientoProceso";
import { MantenimientoPermiso } from "./pages/admin/MantenimientoPermiso";

export const App = () => {
  const { isAuth, user } = useAuth();
  //console.log(isAuth);

  const license = user ? user.profile : null;

  return (
    <>
        <Routes>

          {/* <Route element={<ProtectedRoute isAllowed={!isAuth} redirecTo={"/"} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
 
          /* rutas comunes para usuarios autenticados  /
          <Route element={<ProtectedRoute isAllowed={isAuth} redirecTo={"/login"} />}>
            <Route path="/profile" element={<LayoutSidebar><Profile/></LayoutSidebar>} />
          </Route>

          <Route element={<PatientGuard isAllowed={isAuth} license={license}/>}>
            <Route path="/" element={<LayoutSidebar><Home /></LayoutSidebar>} />

            
          </Route>

          <Route element={<DoctorGuard isAllowed={isAuth} license={license}/>}>
            <Route path="/dashboard" element={<LayoutSidebar><DashboardDoctor/></LayoutSidebar>}/>
            <Route path="/createRecord" element={<LayoutSidebar><RecordForm /></LayoutSidebar>} />
            <Route path="/registerPatient" element={<LayoutSidebar><RegisterPatient /></LayoutSidebar>} />
          </Route> */}
      
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/profile" element={<LayoutSidebar><Profile/></LayoutSidebar>} />
            <Route path="/" element={<LayoutSidebar><Home /></LayoutSidebar>} />
            <Route path="/dashboard" element={<LayoutSidebar><DashboardDoctor/></LayoutSidebar>}/>
            <Route path="/createRecord" element={<LayoutSidebar><RecordForm /></LayoutSidebar>} />
            <Route path="/registerPatient" element={<LayoutSidebar><RegisterPatient /></LayoutSidebar>} />

            <Route path="/mantenimiento" element={<LayoutSidebar/>}>
              <Route index element={<MantenimientoUsuario/>} />
              <Route path="usuario" element={<MantenimientoUsuario/>} />
              <Route path="persona" element={<MantenimientoPersona/>} />
              <Route path="perfil" element={<MantenimientoPerfil/>} />
              <Route path="procesos" element={<MantenimientoProceso/>} /> 
              <Route path="especialidades" element={<MantenimientoEspecialidades/>} />
              <Route path="permisos" element={<MantenimientoPermiso/>} />
            </Route>

            <Route path="/prueba" element={<LayoutSidebar> <MantenimientoUsuario/></LayoutSidebar>}/>

          <Route path="*" element={<NotFound />} />

        </Routes>
    </>
  );
};

export default App;
