import axios from 'axios';

const API_URL = `http://localhost:5000/api/auth`; // Cambia esto si el backend corre en otro puerto

// Función para login
export const login = async (correo, contraseña) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { correo, contraseña });
    return response.data;
  } catch (error) {
    console.error('Error al hacer login', error);
    throw error;
  }
};

// Función para registrar usuario normal
export const registerUsuario = async (correo, contraseña, nombre_completo, fecha_nacimiento, genero) => {
  try {
    const response = await axios.post(`${API_URL}/register/usuario`, { correo, contraseña, nombre_completo, fecha_nacimiento, genero });
    return response.data;
  } catch (error) {
    console.error('Error al registrar usuario', error);
    throw error;
  }
};

// Función para registrar emprendedor
export const registerEmprendedor = async (
    correo,
    contraseña,
    nombre_completo,
    fecha_nacimiento,
    genero,
    numero_cedula,
  ) => {
    try {
      const response = await axios.post(`${API_URL}/register/emprendedor`, {
        correo,
        contraseña,
        nombre_completo,
        fecha_nacimiento,
        genero,
        numero_cedula,
      });
      return response.data;
    } catch (error) {
      console.error('Error al registrar emprendedor', error);
      throw error;
    }
  };

// Función para registrar inversionista
export const registerInversionista = async (
    correo,
    contraseña,
    nombre_completo,
    fecha_nacimiento,
    genero,
    numero_cedula,
    categoria_interes
  ) => {
    try {
      const response = await axios.post(`${API_URL}/register/inversionista`, {
        correo,
        contraseña,
        nombre_completo,
        fecha_nacimiento,
        genero,
        numero_cedula,
        categoria_interes
      });
      return response.data;
    } catch (error) {
      console.error('Error al registrar inversionista', error);
      throw error;
    }
  };
  