import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/MisEmprendimientos.css";
import { NavLink } from "react-router-dom";

const MisEmprendimientos = () => {
  const [emprendimientos, setEmprendimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchMisEmprendimientos();
  }, []);

  if (loading) return <p>Cargando tus emprendimientos...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="mis-emprendimientos-container">
      <div className="mis-emprendimientos">
        <h2>Mis Emprendimientos</h2>
        {emprendimientos.length === 0 ? (
          <div className="sin-emprendimientos">
            <p>No has creado ningún emprendimiento aún.</p>
            <NavLink to="/CrearEmprendimiento" className="btn-crear">
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
                      <span>
                        {emp.nombre_Emprendimiento.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="card-content">
                  <h3>{emp.nombre_Emprendimiento}</h3>
                  <p>
                    <strong>Estado:</strong> {emp.estado_emprendimiento}
                  </p>
                  <p>
                    <strong>Categoría:</strong> {emp.categoria}
                  </p>
                  <p className="descripcion">{emp.descripcion}</p>

                  <div className="acciones">
                    <button className="btn-editar">Editar</button>
                    <button className="btn-eliminar">Eliminar</button>
                  </div>
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
