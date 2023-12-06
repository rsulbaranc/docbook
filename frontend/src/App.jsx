//import React from 'react'}

import Navbar from "./components/navbar/Navbar";
import { Container } from "./components/ui";

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

export const App = () => {
  const { isAuth, user } = useAuth();
  console.log(isAuth);

  const license = user ? user.profile : null;

  return (
    <>
      <Navbar />

      <Container className="py-5">
        <Routes>

          <Route element={<ProtectedRoute isAllowed={!isAuth} redirecTo={"/"} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
 
          {/* rutas comunes para usuarios autenticados */}
          <Route element={<ProtectedRoute isAllowed={isAuth} redirecTo={"/login"} />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route element={<PatientGuard isAllowed={isAuth} license={license}/>}>
            <Route path="/" element={<Home />} />

            
          </Route>

          <Route element={<DoctorGuard isAllowed={isAuth} license={license}/>}>
            <Route path="/dashboard" element={<DashboardDoctor/>}/>
            <Route path="/createRecord" element={<RecordForm />} />
            <Route path="/registerPatient" element={<RegisterPatient />} />
          </Route>


          


          <Route path="*" element={<NotFound />} />

        </Routes>
      </Container>
    </>
  );
};

export default App;
