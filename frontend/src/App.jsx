//import React from 'react'}

import Navbar from "./components/navbar/Navbar";
import { Container } from "./components/ui";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Profile } from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import RecordForm from "./pages/RecordForm";

export const App = () => {
  const { isAuth } = useAuth();

  return (
    <>
      <Navbar />

      <Container className="py-5">
        <Routes>

          <Route element={<ProtectedRoute isAllowed={!isAuth} redirecTo={"/"} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<ProtectedRoute isAllowed={isAuth} redirecTo={"/login"}/>}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/createRecord" element={<RecordForm />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
