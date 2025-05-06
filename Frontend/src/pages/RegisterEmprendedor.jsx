import { useState } from 'react';
import { registerEmprendedor } from '../services/authService';

const RegisterEmprendedor = () => {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [nombre_completo, setNombreCompleto] = useState('');
    const [fecha_nacimiento, setFechaNacimiento] = useState('');
    const [genero, setGenero] = useState('');
    const [numero_cedula, setNumeroCedula] = useState('');
//   const [categoria_proyecto, setCategoriaProyecto] = useState('');
  const [error, setError] = useState('');

//   const categorias = [
//     'Negocios y Finanzas', 'Tecnología e Innovación', 'Salud y Bienestar',
//     'Educación y Formación', 'Comercio y Consumo', 'Alimentos y Bebidas',
//     'Medio Ambiente y Sustentabilidad', 'Logística y Transporte', 'Hogar e Inmuebles',
//     'Moda y Estilo de Vida', 'Turismo y Hospitalidad', 'Redes y Comunicación',
//     'Impacto Social y ONG'
//   ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerEmprendedor(
        correo,
        contraseña,
        nombre_completo,
        fecha_nacimiento,
        genero,
        numero_cedula,
      );
      alert('Emprendedor registrado exitosamente');
    } catch (err) {
      setError('Error al registrar emprendedor');
    }
  };

  return (
    <div>
      <h2>Registrar Emprendedor</h2>
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
            <option value="">Seleccione un género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
        </div>
        <div>
          <label htmlFor="numero_cedula">Número de Cédula:</label>
          <input
            type="text"
            id="numero_cedula"
            value={numero_cedula}
            onChange={(e) => setNumeroCedula(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Registrar Emprendedor</button>
      </form>
    </div>
  );
};

export default RegisterEmprendedor;
