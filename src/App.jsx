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
import { RegisterExam } from "./pages/exams/RegisterExam";
import { Exams } from "./pages/exams/Exams";
import { ExamsPatient } from "./pages/exams/ExamsPatient";
import { useEffect, useState } from "react";
import { getPermissionsByProfile } from "./api/admin";

export const App = () => {
  const { isAuth, user } = useAuth();
  const [userPermissions, setUserPermissions] = useState([]);
  //console.log(isAuth);


  useEffect(() => {
    console.log(user);
    checkPermissions();
  }, [user]);

  const checkPermissions = async () => {
    if (user) {

      await getPermissionsByProfile().then((res) => {
        console.log(res.data);
        setUserPermissions(res.data);
      }
      ).catch((error) => {
        console.log(error);
      });
    }
    
  }

  const regidirectTo = (profile) => {
    switch (profile) {
      case 'admin':
        return '/mantenimiento';
      case 'doctor':
        return '/dashboard';
      case 'paciente':
        return '/';
      case 'bioanalista':
        return '/examen';
      default:
        return '/';
    }

  }

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
      
          <Route element={<ProtectedRoute isAllowed={!isAuth} redirecTo={"/"} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
            

            {userPermissions.includes('perfil') && (
              <Route path="/profile" element={<LayoutSidebar><Profile/></LayoutSidebar>} />
            )}

            {/* Solo permitir el acceso a la ruta "/" si el usuario tiene el permiso correspondiente */}
            {userPermissions.includes('Home') && (
              <Route path="/" element={<LayoutSidebar><Home /></LayoutSidebar>} />
            )}
            
            {userPermissions.includes('/dashboard') && (
              <Route path="/dashboard" element={<LayoutSidebar><DashboardDoctor/></LayoutSidebar>}/>
            )}
            {userPermissions.includes('/createRecord') && (
              <Route path="/createRecord" element={<LayoutSidebar><RecordForm /></LayoutSidebar>} />
            )}
            {userPermissions.includes('/registerPatient') && (
              <Route path="/registerPatient" element={<LayoutSidebar><RegisterPatient /></LayoutSidebar>} />
            )}


            {user && user.profile === 'admin' && (
              <Route path="/mantenimiento" element={<LayoutSidebar/>}>
                <Route index element={<MantenimientoUsuario/>} />
                <Route path="usuario" element={<MantenimientoUsuario/>} />
                <Route path="persona" element={<MantenimientoPersona/>} />
                <Route path="perfil" element={<MantenimientoPerfil/>} />
                <Route path="procesos" element={<MantenimientoProceso/>} /> 
                <Route path="especialidades" element={<MantenimientoEspecialidades/>} />
                <Route path="permisos" element={<MantenimientoPermiso/>} />
              </Route>
            )}

            

            {userPermissions.includes('Examenes') && (
            <Route path="/examen" element={<LayoutSidebar/>}>
              {userPermissions.includes('Examen consulta') && (
                <Route index element={<Exams />} />
              )}
              {userPermissions.includes('Examen consulta') && (
                <Route path="consulta" element={<Exams />} />
              )}

              {userPermissions.includes('Examen registro') && (
                <Route path="registrar" element={<RegisterExam/>} />
              )}
\             {userPermissions.includes('Examen paciente') && (
                <Route path="paciente" element={<ExamsPatient />} />
              )}
            </Route>
            )}

          <Route path="*" element={<NotFound />} />

        </Routes>
    </>
  );
};

export default App;
