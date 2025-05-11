import "../styles/Index.css";
import laptopImage from "../img/Laptop_manos.png";

const Landing = () => {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="landing-text">
          <h1 className="">Bienvenido a ADVENTURES</h1>
          <h2 className="landing-title">Sembrando ideas, cocechando exitos</h2>

          <div className="landing-grid">
            <div className="search-section">
              <form className="search-form">
                <div className="form-group">
                  <label className="form-label">¿Qué buscas?</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Ej: Inversionista, proyecto, etc."
                    />
                    <span className="input-icon">
                      <i className="bi bi-search" />
                    </span>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">¿Dónde?</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Ej: Ciudad, país, etc."
                    />
                    <span className="input-icon">
                      <i className="bi bi-geo-alt" />
                    </span>
                  </div>
                </div>
              </form>
            </div>

            {/* Sección de Cita - Columna Derecha */}
            <div className="quote-section">
              <img
                src={laptopImage}
                alt="Conexión entre emprendedores"
                className="laptop-image"
              />
              <blockquote className="landing-quote">
                “Somos una aplicación web donde permitimos la conexión entre
                proyectos, ideas y emprendimientos con posibles usuarios e
                inversionistas”
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
