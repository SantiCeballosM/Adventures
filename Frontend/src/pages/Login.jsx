import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { NavLink } from 'react-router-dom';
import '../styles/Login.css';

// ✅ Importa el fondo de login y la imagen visual
import fondoLogin from '../img/fondo_Login_Registro.jpg';
import imagenLogin from '../img/imagenlogin.jpeg';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(correo, contraseña);
      localStorage.setItem('token', data.token);
      localStorage.setItem('rol', data.rol);
      localStorage.setItem('nombreUsuario', data.nombre);

      alert('Login exitoso');
      navigate('/');
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${fondoLogin})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="login-box">
        {/* Imagen a la izquierda */}
        <div className="login-image">
          <img src={imagenLogin} alt="Login Visual" />
        </div>

        {/* Formulario a la derecha */}
        <div className="login-form">
          <h2>Iniciar Sesión</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="correo">Correo:</label>
              <input
                type="email"
                id="correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contraseña">Contraseña:</label>
              <input
                type="password"
                id="contraseña"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="btn-submit">Iniciar Sesión</button>

            <div className="login-links">
              <p>
                No tienes cuenta?{' '}
                <button
                  type="button"
                  className="btn-register"
                  onClick={() => setMostrarOpciones(!mostrarOpciones)}
                >
                  <NavLink to="/registerUsuario" className="navlink-register">
                    Regístrate
                  </NavLink>
                </button>
              </p>
              <a href="#">Recuperar contraseña</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
