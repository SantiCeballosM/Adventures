import "../styles/Banner.css";
import laptopImage from "../img/Laptos_estrechon.png";
import { Fragment } from "react";

export default function Banner(){
  return (
    <Fragment>
    <div className="landing-page">
      <div className="landing-content">
        <div className="landing-text">
          <h1 className="h1_bienvenido">Bienvenido a ADVENTURES</h1>
          <h2 className="landing-title">Sembrando ideas, cosechando éxitos</h2>

          <div className="landing-grid">
            {/* <div className="search-section">
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
            </div> */}
            <div className="search-section">
              <div className="quote-section">
                <blockquote className="landing-quote">
                  “Somos una aplicación web donde permitimos la conexión entre
                  proyectos, ideas y emprendimientos con posibles usuarios e
                  inversionistas”
                </blockquote>
              </div>

            </div>
            <img
                src={laptopImage}
                alt="Conexión entre emprendedores"
                className="laptop-image"
              />
          </div>
        </div>
      </div>
    </div>
    </Fragment>
  );
}


