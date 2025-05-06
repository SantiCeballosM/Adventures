// src/App.jsx
// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"; // Asegúrate de que la ruta sea correcta
import RegisterUsuario from "./pages/RegisterUsuario"; // Asegúrate de que la ruta sea correcta
import RegisterInversionista from "./pages/RegisterInversionista";
import RegisterEmprendedor from "./pages/RegisterEmprendedor";

const App = () => {
  return (
    // <div>
    //   <h1>Bienvenido a Adventures</h1>
    //   <Login />
    //   <RegisterUsuario />
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registerUsuario" element={<RegisterUsuario />} />
        <Route path="/registerEmprendedor" element={<RegisterEmprendedor />} />
        <Route path="/registerInversionista" element={<RegisterInversionista />} />

      </Routes>
    </BrowserRouter>  
  );
};

export default App;

