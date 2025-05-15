import "../styles/Apple_Page.css";
import logoApple from "../img/imgs_Tecnologia_Innovacion/apple-14.svg";
import logoApple1 from "../img/imgs_Tecnologia_Innovacion/apple1.svg"; // usa aquí tu imagen real

const VeterinariaExacta = () => {
  return (
    <div className="vet-wrapper">
      <div className="vet-left">
        <img src={logoApple1} alt="Apple Logo" className="vet-logo" />
        <p className="vet-desc">
          Es una empresa tecnológica multinacional con sede en Cupertino,
          California, reconocida mundialmente por diseñar, desarrollar y vender
          productos electrónicos de consumo, software y servicios en línea.
          Fundada en 1976 por Steve Jobs, Steve Wozniak y Ronald Wayne, Apple se
          ha convertido en una de las compañías más influyentes e innovadoras
          del mundo.
        </p>
        <div className="card">
          <a
            href="#"
            className="socialContainer containerOne"
            title="Instagram"
          >
            <svg className="socialSvg" viewBox="0 0 24 24">
              <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 2 .3 2.5.5.6.2 1 .5 1.5 1 .4.4.8.9 1 1.5.2.5.4 1.3.5 2.5.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 2-.5 2.5-.2.6-.5 1-1 1.5-.4.4-.9.8-1.5 1-.5.2-1.3.4-2.5.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-2-.3-2.5-.5-.6-.2-1-.5-1.5-1-.4-.4-.8-.9-1-1.5-.2-.5-.4-1.3-.5-2.5-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.3-2 .5-2.5.2-.6.5-1 1-1.5.4-.4.9-.8 1.5-1 .5-.2 1.3-.4 2.5-.5C8.4 2.2 8.8 2.2 12 2.2m0-2.2C8.7 0 8.3 0 7 .1 5.6.1 4.4.4 3.4.8c-1 .4-1.9 1-2.7 1.8C.3 3.4-.2 4.3-.6 5.3c-.4 1-.7 2.2-.8 3.6C-1.5 10 0 10.4 0 12s-.1 2 .1 3.3c.1 1.4.4 2.6.8 3.6.4 1 .9 1.9 1.7 2.7.8.8 1.7 1.4 2.7 1.8 1 .4 2.2.7 3.6.8 1.3.1 1.7.1 4.9.1s3.6 0 4.9-.1c1.4-.1 2.6-.4 3.6-.8 1-.4 1.9-1 2.7-1.8.8-.8 1.4-1.7 1.8-2.7.4-1 .7-2.2.8-3.6.1-1.3.1-1.7.1-4.9s0-3.6-.1-4.9c-.1-1.4-.4-2.6-.8-3.6-.4-1-1-1.9-1.8-2.7-.8-.8-1.7-1.4-2.7-1.8C19.6.4 18.4.1 17 .1 15.7 0 15.3 0 12 0z" />
              <path d="M12 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
              <circle cx="18.4" cy="5.6" r="1.4" />
            </svg>
          </a>

          <a href="#" className="socialContainer containerTwo" title="Twitter">
            <svg className="socialSvg" viewBox="0 0 24 24">
              <path d="M23 2.999c-.8.4-1.6.6-2.4.8.9-.6 1.6-1.4 1.9-2.5-.9.6-1.9 1-3 1.2a4.24 4.24 0 0 0-7.3 3.9A12 12 0 0 1 3 2.5a4.2 4.2 0 0 0-.6 2.1c0 1.5.7 2.8 1.9 3.6a4.19 4.19 0 0 1-1.9-.5v.1c0 2.1 1.5 3.8 3.5 4.2a4.1 4.1 0 0 1-1.9.1c.6 1.8 2.3 3.1 4.4 3.2a8.5 8.5 0 0 1-5.2 1.8c-.3 0-.6 0-.8-.1a12 12 0 0 0 6.5 1.9c7.8 0 12-6.4 12-12v-.6c.8-.5 1.5-1.3 2-2.1z" />
            </svg>
          </a>

          <a
            href="#"
            className="socialContainer containerThree"
            title="Facebook"
          >
            <svg className="socialSvg" viewBox="0 0 24 24">
              <path d="M22.7 0H1.3C.6 0 0 .6 0 1.3v21.4C0 23.4.6 24 1.3 24h11.5v-9.3H9.6v-3.6h3.2V8.4c0-3.2 2-5 4.9-5 1.4 0 2.6.1 2.9.2v3.3h-2c-1.6 0-1.9.8-1.9 1.9v2.5h3.8l-.5 3.6h-3.3V24h6.4c.7 0 1.3-.6 1.3-1.3V1.3c0-.7-.6-1.3-1.3-1.3z" />
            </svg>
          </a>

          <a
            href="#"
            className="socialContainer containerFour"
            title="WhatsApp"
          >
            <svg className="socialSvg" viewBox="0 0 24 24">
              <path d="M20.5 3.5A11.6 11.6 0 0 0 3.5 20.5L2 24l3.6-1.5A11.6 11.6 0 1 0 20.5 3.5zM12 21.1c-1.7 0-3.3-.4-4.7-1.1l-.3-.1-2.8 1.2.6-2.9-.2-.3A9.1 9.1 0 1 1 21.1 12c0 5-4.1 9.1-9.1 9.1zm5-6.8c-.3-.1-1.7-.9-1.9-1-.3-.1-.5-.2-.7.2s-.8 1-1 1.2c-.2.2-.4.2-.7.1a7.2 7.2 0 0 1-2.1-1.3c-.6-.5-1-1.2-1.1-1.3-.1-.2 0-.5.1-.6.1-.1.2-.2.3-.3.1-.1.1-.2.2-.3s.1-.2.2-.3c.1-.1.1-.2 0-.3l-.7-1.8c-.2-.5-.4-.4-.6-.4H7c-.2 0-.4 0-.6.3s-.8 1-.8 2 .8 2.3 1 2.5c.1.2 1.6 2.6 4 3.5.6.2 1 .4 1.4.5.6.2 1.1.1 1.5.1.4-.1 1.3-.5 1.4-1 .2-.6.2-1.1.1-1.2-.1-.1-.2-.1-.5-.2z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="vet-right">
        <p className="vet-category">Tecnologia e Innovacion</p>
        <div className="vet-title">
          <img src={logoApple} alt="Mini Logo" className="vet-logo-mini" />
          <h2>Apple</h2>
        </div>
        <div className="vet-follow">
          <p>
            <strong>1693</strong>
            <br />
            Seguidores
          </p>
          <button className="btn-follow">Seguir</button>
          <button className="btn-message">Enviar mensaje</button>
        </div>
        <div className="vet-rating">
          ⭐⭐⭐⭐⭐ <span>4.6</span>
        </div>
        <div className="vet-comments">
          <p>
            <strong>Pepito_Per3z:</strong> Me parece que apple es una exelente
            empresa pero los celulares solo son caros
          </p>
          <p>
            <strong>El_Harold:</strong> ME SUPER ENCANTO LA CAMARA pero me
            parece que el precio es un poco elevado
          </p>
          <p>
            <strong>Jesus_Je_Rardo:</strong> Me gusta mmucho la atención al
            cliente, son muy amables
          </p>
        </div>
        <button className="report-btn">Reportar</button>
      </div>
      <br />

    </div>
  );
};

export default VeterinariaExacta;
