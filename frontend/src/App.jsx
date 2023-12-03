//import React from 'react'}

import Navbar from "./components/navbar/Navbar";
import { Container } from "./components/ui";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Profile } from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

export const App = () => {
  return (
    <>
      <Navbar />

      <Container className="py-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
