import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/DetalleEmprendimiento.css";

const EmprendimientoDetalle = () => {
  const { id } = useParams();
  const [emprendimiento, setEmprendimiento] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/emprendimientos/${id}`)
      .then(res => setEmprendimiento(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!emprendimiento) return <p>Cargando...</p>;

  return (
    <div className="detalle-container">
      <div className="detalle-left">
        <img 
          src={`http://localhost:5000${emprendimiento.url_logo}`} 
          alt={emprendimiento.nombre_Emprendimiento} 
          className="detalle-logo" 
        />
        <h2>Descripción</h2>
        <p>{emprendimiento.descripcion}</p>
      </div>
      
      <div className="detalle-right">
        <h1>{emprendimiento.nombre_Emprendimiento}</h1>
        <h3>{emprendimiento.categoria}</h3>
        
        <p className="seguidores-count">{emprendimiento.seguidores || 1693}</p>
        <p className="seguidores-text">Seguidores</p>
        
        <div className="botones-container">
          <button className="seguir-btn">Seguir</button>
          <button className="mensaje-btn">Enviar mensaje</button>
        </div>
        
        <div className="rating">
          ⭐⭐⭐⭐⭐ 4.6
        </div>
        
        <div className="comentarios">
          <div className="comentario">
            <p><strong>Pepito_Per3z:</strong> Me parece que apple es una excelente empresa pero los celulares solo son caros</p>
          </div>
          <div className="comentario">
            <p><strong>EL_Harold:</strong> ME SUPER ENCANTO LA CAMARA pero me parece que el precio es un poco elevado</p>
          </div>
          <div className="comentario">
            <p><strong>Jesus_Je_Rardo:</strong> Me gusta mucho la atención al cliente, son muy amables</p>
          </div>
          <button className="reportar-btn">Reportar</button>
        </div>
      </div>
    </div>
  );
};

export default EmprendimientoDetalle;