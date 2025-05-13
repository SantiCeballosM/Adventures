import "../styles/CategoryCard.css";

// Importación de imágenes
import Alimentos_Bebidas from "../img/imgs_categorias/Alimentos_Bebidas.png";
import Comercio_Consumo from "../img/imgs_categorias/Comercio_Consumo.png";
import Educacion_Formacion from "../img/imgs_categorias/Educacion_Formacion.png";
import Hogar_Inmuebles from "../img/imgs_categorias/Hogar_Inmuebles.png";
import ImpactoSocial from "../img/imgs_categorias/ImpactoSocial.png";
import Logistica_Transporte from "../img/imgs_categorias/Logistica_Transporte.png";
import MedioAmbiente_Sustentabilidad from "../img/imgs_categorias/MedioAmbiente_Sustentabilidad.png";
import Moda_Estilos from "../img/imgs_categorias/Moda_Estilos.png";
import Negocios_Finanzas from "../img/imgs_categorias/Negocios_Finanzas.png";
import Redes_Comunicacion from "../img/imgs_categorias/Redes_Comunicacion.png";
import Salud_Bienestar from "../img/imgs_categorias/Salud_Bienestar.png";
import Tecnologia_Innovacion from "../img/imgs_categorias/Tecnologia_Innovacion.png";
import Turismo_Hospitalidad from "../img/imgs_categorias/Turismo_Hospitalidad.png";

const categorias = [
  {
    titulo: "Negocios y Finanzas",
    descripcion:
      "Soluciones empresariales, servicios financieros, asesorías y más para hacer crecer tu negocio.",
    imagen: Negocios_Finanzas,
  },
  {
    titulo: "Tecnología e Innovación",
    descripcion:
      "Últimos avances, productos inteligentes y servicios tecnológicos para potenciar tu entorno.",
    imagen: Tecnologia_Innovacion,
  },
  {
    titulo: "Salud y Bienestar",
    descripcion:
      "Tiendas naturistas, comida saludable y más cuidados para tu salud.",
    imagen: Salud_Bienestar,
  },
  {
    titulo: "Educación y Formación",
    descripcion:
      "Instituciones, cursos y recursos educativos para tu desarrollo personal y profesional.",
    imagen: Educacion_Formacion,
  },
  {
    titulo: "Comercio y Consumo",
    descripcion:
      "Tienda en línea, artículos esenciales y productos de consumo diario.",
    imagen: Comercio_Consumo,
  },
  {
    titulo: "Alimentos y Bebidas",
    descripcion:
      "Comida fresca, bebidas y todo lo relacionado con el mundo gastronómico.",
    imagen: Alimentos_Bebidas,
  },
  {
    titulo: "Medio Ambiente y Sustentabilidad",
    descripcion:
      "Iniciativas verdes, reciclaje y productos ecológicos para un mundo mejor.",
    imagen: MedioAmbiente_Sustentabilidad,
  },
  {
    titulo: "Logística y Transporte",
    descripcion:
      "Soluciones para envíos, transporte de mercancías y movilidad urbana.",
    imagen: Logistica_Transporte,
  },
  {
    titulo: "Hogar e Inmuebles",
    descripcion:
      "Encuentra productos para tu hogar o la propiedad que estás buscando.",
    imagen: Hogar_Inmuebles,
  },
  {
    titulo: "Moda y Estilo de Vida",
    descripcion:
      "Ropa, tendencias, accesorios y mucho más para tu estilo personal.",
    imagen: Moda_Estilos,
  },
  {
    titulo: "Turismo y Hospitalidad",
    descripcion:
      "Viajes, destinos turísticos, hospedajes y experiencias inolvidables.",
    imagen: Turismo_Hospitalidad,
  },
  {
    titulo: "Redes y Comunicación",
    descripcion:
      "Servicios y herramientas para conectar personas, empresas y dispositivos.",
    imagen: Redes_Comunicacion,
  },
  {
    titulo: "Impacto Social y ONG",
    descripcion:
      "Proyectos con propósito, voluntariado y organizaciones sin fines de lucro.",
    imagen: ImpactoSocial,
  },
];

const Categories_Grid = () => {
  return (
    <div className="grid-main-container">
      {/* Título con el mismo fondo del grid */}
      <div
        className="grid-title-wrapper"
        style={{ backgroundColor: "#989898" }}
      >
        <h1 className="main-title">ESTAS SON NUESTRAS CATEGORÍAS</h1>
      </div>

      {/* Contenedor del grid (sin cambios) */}
      <div className="grid-container">
        {categorias.map((categoria, index) => (
          <div className="grid-item" key={index}>
            <img src={categoria.imagen} alt={categoria.titulo} />
            <div className="text-content">
              <h3>{categoria.titulo}</h3>
              <p>{categoria.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories_Grid;
