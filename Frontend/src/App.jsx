import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import RegisterUsuario from "./pages/RegisterUsuario";
import Categoria_Tecnologia from "./pages/Categoria_Tecnologia"; 
// import DetalleEmprendimiento from "./pages/DetalleEmprendimiento";
import Emprendimientos from './pages/Emprendimientos';
import Invertir from './pages/Invertir';
import RegisterEmprendimiento from './pages/RegisterEmprendimiento';
import MostrarEmprendimientos from './pages/MostrarEmprendimientos';
import Categoria_Filtrada from "./pages/Categoria_Filtrada";
import NotFound from './pages/NotFound';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registerUsuario" element={<RegisterUsuario />} />
        <Route path="/tecnologia_innovacion" element={<Categoria_Tecnologia />} />
        <Route path="/emprendimientos" element={<Emprendimientos/>}/>
        <Route path="/invertir" element={<Invertir/>}/>
        <Route path="/RegisterEmprendimiento" element={<RegisterEmprendimiento/>}/>
        <Route path="/mostrarEmprendimientos" element={<MostrarEmprendimientos/>}/>
        <Route path="/emprendimientos/categoria/:nombreCategoria" element={<Categoria_Filtrada />} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>  
  );
};

export default App;

