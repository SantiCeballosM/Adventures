import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Index from "./pages/Index";
import Login from "./pages/Login";
import RegisterUsuario from "./pages/RegisterUsuario";


const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
    <Index />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registerUsuario" element={<RegisterUsuario />} />
      </Routes>
    </BrowserRouter>  
  );
};

export default App;

