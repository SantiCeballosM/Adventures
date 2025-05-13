import axios from "axios";

const API_URL = `http://localhost:5000/api/auth`; // Cambia esto si el backend corre en otro puerto

// authService.jsx
export const login = async (correo, contraseña) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { correo, contraseña });

    return {
      token: response.data.token,
      rol: response.data.user.roles[0],
      nombre: response.data.user.nombre
    };
  } catch (error) {
    console.error('Error al hacer login', error);
    throw error;
  }
};

export const registerUsuario = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register/usuario`, userData);
    return response.data;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
};

export const getRoles = async () => {
  try {
    const response = await axios.get(`${API_URL}/roles`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener roles:", error);
    throw error;
  }
};
