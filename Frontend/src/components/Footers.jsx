import "../styles/Footers.css";
import logo from "../img/Adventures_logo.png";

function Footers() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section logo-section">
          <img src={logo} alt="Logo Adventurs" className="logo" />
          <p className="slogan_logo">
            Tecnología, Innovación y <br /> Emprendimiento
          </p>
        </div>

        <div className="footer-section about-section">
          <h3>Sobre el Proyecto</h3>
          <p>
            Adventures es una plataforma dedicada a visibilizar emprendimientos locales en Pereira. Aquí podrás descubrir ideas innovadoras, contactar emprendedores y compartir tu propio proyecto.
          </p>
        </div>

        <div className="footer-section">
          <h3>Datos personales</h3>
          <p><strong>Santiago Ceballos</strong><br />
            <i className="bi bi-telephone-fill"></i> 3133065028<br />
            <i className="bi bi-envelope-fill"></i> ceballosmarins@gmail.com
          </p>
          <p><strong>Harol Ramírez</strong><br />
            <i className="bi bi-telephone-fill"></i> 3028263330<br />
            <i className="bi bi-envelope-fill"></i> haroldhd0987@gmail.com
          </p>
          <p><strong>Esteban Jaramillo</strong><br />
            <i className="bi bi-telephone-fill"></i> 3122412365<br />
            <i className="bi bi-envelope-fill"></i> juan.jaramillo.1228@gmail.com
          </p>
        </div>

        <div className="footer-section">
          <h3>Datos empresa</h3>
          <p><i className="bi bi-envelope-fill"></i> proyect.adveture@gmail.com</p>
          <p><i className="bi bi-telephone-fill"></i> 3133065028</p>
        </div>

        <div className="footer-section">
          <h3>Redes Sociales</h3>
          <ul className="socials">
            <li><i className="bi bi-facebook"></i> Facebook</li>
            <li><i className="bi bi-twitter-x"></i> Twitter</li>
            <li><i className="bi bi-instagram"></i> Instagram</li>
            <li><i className="bi bi-youtube"></i> YouTube</li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2025 Adventures - Todos los derechos reservados</p>
      </div>
    </footer>
  );
}

export default Footers;
