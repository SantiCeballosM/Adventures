// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { login } from '../services/authService';
import { NavLink } from 'react-router-dom';

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
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="contraseña">Contraseña:</label>
          <input
            type="password"
            id="contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Iniciar Sesión</button>
        <br />
        <div className="my-3">
          <span>No tienes cuenta?</span>{" "}
          <button type="button" onClick={() => setMostrarOpciones(!mostrarOpciones)}>
            Registrate
          </button>
          {mostrarOpciones && (
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              <li><NavLink to="/registerUsuario">Registrar Usuario</NavLink></li>
              <li><NavLink to="/registerEmprendedor">Registrar Emprendedor</NavLink></li>
              <li><NavLink to="/registerInversionista">Registrar Inversionista</NavLink></li>
            </ul>
          )}
          <br />
          <span>
            <a href="#">Recuperar contraseña</a>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
