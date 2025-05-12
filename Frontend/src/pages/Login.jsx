import { useState } from 'react';
import { login } from '../services/authService';
import { NavLink } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [mostrarOpciones, setMostrarOpciones] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(correo, contraseña);
      localStorage.setItem('token', data.token);
      alert('Login exitoso');
      // Redirigir según el rol del usuario si es necesario
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="login-container">
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
          <div className="my-3">
            <span>No tienes cuenta? </span>
            <button type="button" className="btn-register" onClick={() => setMostrarOpciones(!mostrarOpciones)}>
              <NavLink to="/registerUsuario" className="navlink-register">Registrate</NavLink>
            </button>

            <br />
            <span>
              <a href="#">Recuperar contraseña</a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
