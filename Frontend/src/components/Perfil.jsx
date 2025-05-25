import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/perfil.css';

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfil = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch('http://localhost:5000/api/auth/perfil', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsuario(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchPerfil();
  }, []);

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleGuardar = async () => {
    const { nombre_completo, correo, cedula, fecha_nacimiento, genero } = usuario;

    if (!nombre_completo || !correo || !cedula || !fecha_nacimiento || !genero) {
      setMensaje('❌ Todos los campos son obligatorios');
      return;
    }

    const token = localStorage.getItem('token');
    const fechaFormateada = new Date(fecha_nacimiento).toISOString().split('T')[0];

    const datosActualizados = {
      ...usuario,
      fecha_nacimiento: fechaFormateada,
    };

    try {
      const response = await fetch('http://localhost:5000/api/auth/perfil', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(datosActualizados),
      });

      if (response.ok) {
        localStorage.setItem('nombreUsuario', datosActualizados.nombre_completo);
        setMensaje('✅ Perfil actualizado correctamente');
        setEditando(false);
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setMensaje('❌ Error al actualizar el perfil');
      }
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error al guardar');
    }
  };

  if (!usuario) return <div className="perfil-wrapper">Cargando...</div>;

  return (
    <div className="perfil-wrapper">
      <div className="perfil-card">
        <div className="perfil-right">
          {mensaje && (
            <p className={`mensaje ${mensaje.includes('✅') ? 'success' : ''}`}>
              {mensaje}
            </p>
          )}

          <label>Nombre completo:</label>
          <input
            type="text"
            name="nombre_completo"
            value={usuario.nombre_completo}
            onChange={handleChange}
            disabled={!editando}
          />

          <label>Correo:</label>
          <input
            type="email"
            name="correo"
            value={usuario.correo}
            onChange={handleChange}
            disabled={!editando}
          />

          <label>Cédula:</label>
          <input
            type="text"
            name="cedula"
            value={usuario.cedula}
            onChange={handleChange}
            disabled={!editando}
          />

          <label>Fecha de nacimiento:</label>
          <input
            type="date"
            name="fecha_nacimiento"
            value={new Date(usuario.fecha_nacimiento).toISOString().split('T')[0]}
            onChange={handleChange}
            disabled={!editando}
          />

          <label>Género:</label>
          <select
            name="genero"
            value={usuario.genero}
            onChange={handleChange}
            disabled={!editando}
          >
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>

          {!editando ? (
            <button onClick={() => setEditando(true)}>Editar perfil</button>
          ) : (
            <button onClick={handleGuardar}>Guardar cambios</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Perfil;
