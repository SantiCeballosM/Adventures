import { useState, useEffect } from "react";
import { registerUsuario, getRoles } from "../services/authService";
import "../styles/RegisterUsuario.css";

const RegisterUsuario = () => {
  const [formData, setFormData] = useState({
    nombre_completo: "",
    cedula: "",
    correo: "",
    contraseña: "",
    fecha_nacimiento: "",
    genero: "",
    rol_id: "",
  });
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState("");

  // Obtener roles disponibles al cargar el componente
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const rolesData = await getRoles();
        setRoles(rolesData);
      } catch (err) {
        setError("Error al cargar los roles");
      }
    };
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.rol_id) {
      setError("Debes seleccionar un rol");
      return;
    }

    try {
      const response = await registerUsuario(formData);

      if (response.success) {
        alert("Usuario registrado exitosamente");
        // Limpiar formulario
        setFormData({
          nombre_completo: "",
          cedula: "",
          correo: "",
          contraseña: "",
          fecha_nacimiento: "",
          genero: "",
          rol_id: "",
        });
        setError("");
      } else {
        setError(response.message || "Error al registrar usuario");
      }
    } catch (err) {
      console.error("Error completo:", err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.sqlError ||
          "Error al conectar con el servidor"
      );
    }
  };

  return (
    <div className="register-container ">
      <h2>Registrar Usuario</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre_completo">Nombre Completo:</label>
          <input
            type="text"
            id="nombre_completo"
            name="nombre_completo"
            value={formData.nombre_completo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cedula">Cédula:</label>
          <input
            type="number"
            id="cedula"
            name="cedula"
            value={formData.cedula}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contraseña">Contraseña:</label>
          <input
            type="password"
            id="contraseña"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fecha_nacimiento">Fecha de Nacimiento:</label>
          <input
            type="date"
            id="fecha_nacimiento"
            name="fecha_nacimiento"
            value={formData.fecha_nacimiento}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="genero">Género:</label>
          <select
            id="genero"
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona tu género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="rol_id">Selecciona tu rol:</label>
          <select
            id="rol_id"
            name="rol_id"
            value={formData.rol_id}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un rol</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.rol}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-btn">
          Registrar Usuario
        </button>
      </form>
    </div>
  );
};

export default RegisterUsuario;
