import "../styles/Tecnologia_Innovacion.css";
import { Link } from "react-router-dom";

// Importación de logos
import appleLogo from "../img/imgs_Tecnologia_Innovacion/apple-14.svg";
import googleLogo from "../img/imgs_Tecnologia_Innovacion/google-1-1.svg";
import huaweiLogo from "../img/imgs_Tecnologia_Innovacion/huawei.svg";
import ibmLogo from "../img/imgs_Tecnologia_Innovacion/ibm.svg";
import amazonLogo from "../img/imgs_Tecnologia_Innovacion/logo-amazon.svg";
import microsoftLogo from "../img/imgs_Tecnologia_Innovacion/microsoft-5.svg";
import nvidiaLogo from "../img/imgs_Tecnologia_Innovacion/nvidia.svg";
import samsungLogo from "../img/imgs_Tecnologia_Innovacion/samsung-8.svg";
import teslaLogo from "../img/imgs_Tecnologia_Innovacion/tesla-motors.svg";

// Datos de los emprendimientos
const emprendimientos = [
  {
    id: 1,
    titulo: "Apple",
    descripcion:
      "Innovadora en diseño y tecnología de consumo, creadora del iPhone, Mac y más.",
    logo: appleLogo,
  },
  {
    id: 2,
    titulo: "Google",
    descripcion:
      "Líder mundial en servicios de búsqueda, inteligencia artificial y Android.",
    logo: googleLogo,
  },
  {
    id: 3,
    titulo: "Huawei",
    descripcion:
      "Pionera en redes 5G, smartphones y telecomunicaciones globales.",
    logo: huaweiLogo,
  },
  {
    id: 4,
    titulo: "IBM",
    descripcion:
      "Referente en innovación empresarial, IA, blockchain y computación cuántica.",
    logo: ibmLogo,
  },
  {
    id: 5,
    titulo: "Amazon",
    descripcion:
      "Gigante del comercio electrónico y la nube, creadora de AWS y Alexa.",
    logo: amazonLogo,
  },
  {
    id: 6,
    titulo: "Microsoft",
    descripcion:
      "Desarrolladora de Windows, Azure, Office y herramientas para empresas.",
    logo: microsoftLogo,
  },
  {
    id: 7,
    titulo: "NVIDIA",
    descripcion:
      "Líder en procesamiento gráfico, inteligencia artificial y deep learning.",
    logo: nvidiaLogo,
  },
  {
    id: 8,
    titulo: "Samsung",
    descripcion:
      "Potencia global en smartphones, pantallas y chips electrónicos.",
    logo: samsungLogo,
  },
  {
    id: 9,
    titulo: "Tesla",
    descripcion: "Revolucionó la movilidad eléctrica y la conducción autónoma.",
    logo: teslaLogo,
  },
];

const Tecnologia_Innovavion = () => {
  return (
    <div className="tech-grid-main">
      <div className="tech-title-wrapper">
        <h1 className="tech-main-title">Tecnología e Innovación</h1>
      </div>
      <div className="tech-grid-container">
        {emprendimientos.map((item) => (
          <Link
            to={`/Emprendimientos`}
            // to={`/Emprendimientos/${item.id}`}
            key={item.id}
            className="tech-grid-item"
          >
            <div className="logo-container">
              <img src={item.logo} alt={item.titulo} />
            </div>
            <div className="tech-text-content">
              <h3>{item.titulo}</h3>
              <p>{item.descripcion}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Tecnologia_Innovavion;


// return (
//   <div className="tech-grid-main">
//     <div className="tech-title-wrapper">
//       <h1 className="tech-main-title">Tecnología e Innovación</h1>
//     </div>
//     <div className="tech-grid-container">
//       {emprendimientos.map((item) => (
//         <Link
//           to={`/Apple_Page/${item.id}`}
//           key={item.id}
//           className="tech-grid-item"
//         >
//           <div className="logo-container">
//             <img src={item.logo} alt={item.titulo} />
//           </div>
//           <div className="tech-text-content">
//             <h3>{item.titulo}</h3>
//             <p>{item.descripcion}</p>
//           </div>
//         </Link>
//       ))}
//     </div>
//   </div>
// );