import { useState } from "react";
import "../styles/CrearEmprendimiento.css";
import { crearEmprendimiento } from "../services/authService"; // importa la función creada

const CrearEmprendimiento = () => {
  const [form, setForm] = useState({
    nombre: "",
    estado: "",
    categoria: "",
    descripcion: "",
    logo: null,
  });

  const estados = ["Activo", "En proceso", "Finalizado"];
  const categorias = [
    "Negocios y Finanzas",
    "Tecnología e Innovación",
    "Salud y Bienestar",
    "Educación y Formación",
    "Comercio y Consumo",
    "Alimentos y Bebidas",
    "Medio Ambiente y Sustentabilidad",
    "Logística y Transporte",
    "Hogar e Inmuebles",
    "Moda y Estilo de Vida",
    "Turismo y Hospitalidad",
    "Redes y Comunicación",
    "Impacto Social y ONG",
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value, // si es input file, toma el archivo; si no, el valor
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", form.nombre);
    formData.append("estado", form.estado);
    formData.append("categoria", form.categoria);
    formData.append("descripcion", form.descripcion);
    formData.append("logo", form.logo);
    formData.append("rol_usuario_id", 2); // asegúrate que este ID corresponda a tu usuario/emprendedor

    try {
      await crearEmprendimiento(formData); // usar la función importada que maneja la URL y headers
      alert("Emprendimiento creado con éxito");
      setForm({
        nombre: "",
        estado: "",
        categoria: "",
        descripcion: "",
        logo: null,
      }); // limpiar formulario si quieres
    } catch (error) {
      console.error(error);
      alert("Error al crear emprendimiento");
    }
  };

  return (
    <div className="crear-emprendimiento-container">
      <div className="crear-emprendimiento">
        <div className="imagen-lado"></div>
        <div className="formulario-lado">
          <h2>Registrar Emprendimiento</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label>Nombre del Emprendimiento</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />

            <label>Estado</label>
            <select
              name="estado"
              value={form.estado}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione</option>
              {estados.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>

            <label>Categoría</label>
            <select
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <label>Descripción</label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              required
            />

            <label>Logo</label>
            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleChange}
              required
            />

            <button type="submit">Crear Emprendimiento</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearEmprendimiento;
