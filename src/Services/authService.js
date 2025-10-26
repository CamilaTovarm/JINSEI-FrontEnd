import api from './api';

const authService = {
  // POST /users - Registro de nuevo usuario
  register: async (userData) => {
    try {
      const response = await api.post('/users', {
        AKA: userData.aka,
        Password: userData.password,
        CreatedAt: new Date().toISOString(),
        IsDeleted: false
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error al registrar usuario' 
      };
    }
  },

  // POST /auth/login - Iniciar sesión
  login: async (aka, password) => {
    try {
      const response = await api.post('/auth/login', {
        AKA: aka,
        Password: password
      });
      
      // Guardar token y datos del usuario
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Credenciales inválidas' 
      };
    }
  },

  // Cerrar sesión
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('sessionId');
  },

  // Obtener usuario actual
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Verificar si está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export default authService;