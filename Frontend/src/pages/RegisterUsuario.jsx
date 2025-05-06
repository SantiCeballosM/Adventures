import { useState } from 'react';
import { registerUsuario } from '../services/authService';

const RegisterUsuario = () => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [nombre_completo, setNombreCompleto] = useState('');
  const [fecha_nacimiento, setFechaNacimiento] = useState('');
  const [genero, setGenero] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUsuario(correo, contraseña, nombre_completo, fecha_nacimiento, genero);
      alert('Usuario registrado exitosamente');
    } catch (err) {
      setError('Error al registrar usuario');
    }
  };

  return (
    <div>
      <h2>Registrar Usuario</h2>
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
        <div>
          <label htmlFor="nombre_completo">Nombre Completo:</label>
          <input
            type="text"
            id="nombre_completo"
            value={nombre_completo}
            onChange={(e) => setNombreCompleto(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="fecha_nacimiento">Fecha de Nacimiento:</label>
          <input
            type="date"
            id="fecha_nacimiento"
            value={fecha_nacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="genero">Género:</label>
          <select
            id="genero"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            required
          >
            <option value="">Selecciona tu género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Registrar Usuario</button>
      </form>
    </div>
  );
};

export default RegisterUsuario;
