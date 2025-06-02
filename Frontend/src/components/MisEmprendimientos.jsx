import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/MisEmprendimientos.css";
import { NavLink } from "react-router-dom";

const MisEmprendimientos = () => {
  const [emprendimientos, setEmprendimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({});

  const fetchMisEmprendimientos = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        setError("No autorizado. Por favor inicia sesión.");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/emprendimientos/misEmprendimientos",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEmprendimientos(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Sesión expirada o no autorizada. Por favor inicia sesión.");
      } else {
        setError("Error al cargar tus emprendimientos.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMisEmprendimientos();
  }, []);

  useEffect(() => {
    document.body.className = "body-emprendimientos";
    return () => {
      document.body.className = "";
    };
  }, []);

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar este emprendimiento?");
    if (!confirmar) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/emprendimientos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmprendimientos(emprendimientos.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Error eliminando emprendimiento:", error);
      alert("Ocurrió un error al eliminar el emprendimiento.");
    }
  };

  const handleEditClick = (emp) => {
    setEditandoId(emp.id);
    setFormData(emp);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardar = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/emprendimientos/${editandoId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const actualizados = emprendimientos.map((e) =>
        e.id === editandoId ? { ...e, ...formData } : e
      );
      setEmprendimientos(actualizados);
      setEditandoId(null);
    } catch (error) {
      console.error("Error actualizando emprendimiento:", error);
      alert("Error al guardar los cambios");
    }
  };

  if (loading) return <p>Cargando tus emprendimientos...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="mis-emprendimientos-container">
      <div className="mis-emprendimientos">
        <h2>Mis Emprendimientos</h2>
        {emprendimientos.length === 0 ? (
          <div className="sin-emprendimientos">
            <p>No has creado ningún emprendimiento aún.</p>
            <NavLink to="/registerEmprendimiento" className="btn-crear">
              Crear mi primer emprendimiento
            </NavLink>
          </div>
        ) : (
          <div className="emprendimientos-list">
            {emprendimientos.map((emp) => (
              <div key={emp.id} className="emprendimiento-card">
                <div className="logo-container">
                  {emp.url_logo ? (
                    <img
                      src={`http://localhost:5000${emp.url_logo}`}
                      alt={`Logo de ${emp.nombre_Emprendimiento}`}
                      className="logo"
                    />
                  ) : (
                    <div className="placeholder-logo">
                      <span>{emp.nombre_Emprendimiento.charAt(0).toUpperCase()}</span>
                    </div>
                  )}
                </div>
                <div className="card-content">
                  {editandoId === emp.id ? (
                    <>
                      <input
                        name="nombre_Emprendimiento"
                        value={formData.nombre_Emprendimiento}
                        onChange={handleChange}
                        placeholder="Nombre"
                      />
                      <input
                        name="estado_emprendimiento"
                        value={formData.estado_emprendimiento}
                        onChange={handleChange}
                        placeholder="Estado"
                      />
                      <input
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleChange}
                        placeholder="Categoría"
                      />
                      <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        placeholder="Descripción"
                      />
                      <div className="acciones">
                        <button className="btn-editar" onClick={handleGuardar}>
                          Guardar
                        </button>
                        <button
                          className="btn-eliminar"
                          onClick={() => setEditandoId(null)}
                        >
                          Cancelar
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3>{emp.nombre_Emprendimiento}</h3>
                      <p>
                        <strong>Estado:</strong> {emp.estado_emprendimiento}
                      </p>
                      <p>
                        <strong>Categoría:</strong> {emp.categoria}
                      </p>
                      <p className="descripcion">{emp.descripcion}</p>
                      <div className="acciones">
                        <button className="btn-editar" onClick={() => handleEditClick(emp)}>
                          Editar
                        </button>
                        <button
                          className="btn-eliminar"
                          onClick={() => handleEliminar(emp.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MisEmprendimientos;
