// Al principio, debajo de imports:
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/EmprendimientosCategoria.css";

const EmprendimientosCategoria = () => {
  const { nombreCategoria } = useParams();
  const [emprendimientos, setEmprendimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favoritos, setFavoritos] = useState([]); // 👈 estado local

  useEffect(() => {
    const fetchEmprendimientos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/emprendimientos/categoria/${nombreCategoria}`
        );
        setEmprendimientos(response.data);
      } catch (error) {
        setError("Error al cargar los emprendimientos.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmprendimientos();
  }, [nombreCategoria]);

  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  if (loading)
    return <div className="catemp-loader">Cargando emprendimientos...</div>;
  if (error) return <div className="catemp-error-message">{error}</div>;

  return (
    <div className="catemp-wrapper">
      <div className="catemp-container">
        <h2 className="catemp-title">
          Emprendimientos en: <span>{decodeURIComponent(nombreCategoria)}</span>
        </h2>
        {emprendimientos.length === 0 ? (
          <p className="catemp-no-results">
            No hay emprendimientos en esta categoría.
          </p>
        ) : (
          <div className="catemp-grid">
            {emprendimientos.map((emp) => (
              <Link
                key={emp.id}
                to={`/emprendimiento/${emp.id}`}
                className="catemp-card"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <button
                  className={`catemp-fav-button ${
                    favoritos.includes(emp.id) ? "activo" : ""
                  }`}
                  title="Agregar a favoritos"
                  onClick={(e) => {
                    e.preventDefault(); // evita navegación al hacer click en el corazón
                    toggleFavorito(emp.id);
                  }}
                >
                  {favoritos.includes(emp.id) ? "❤" : "♡"}
                </button>

                <div className="catemp-logo-wrapper">
                  {emp.url_logo ? (
                    <img
                      src={`http://localhost:5000${emp.url_logo}`}
                      alt={`Logo de ${emp.nombre_Emprendimiento}`}
                      className="catemp-logo-image"
                    />
                  ) : (
                    <div className="catemp-logo-placeholder">
                      {emp.nombre_Emprendimiento.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="catemp-card-body">
                  <h3>{emp.nombre_Emprendimiento}</h3>
                  <p>{emp.descripcion}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmprendimientosCategoria;
