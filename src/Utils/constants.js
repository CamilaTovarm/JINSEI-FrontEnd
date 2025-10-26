// URL base de tu API - CAMBIAR cuando tengas tu API corriendo
export const API_BASE_URL = 'http://localhost:8000/api';

// Niveles de riesgo
export const RISK_LEVELS = {
  BAJO: 1,
  MEDIO: 2,
  ALTO: 3,
  CRITICO: 4
};

// Colores por nivel de riesgo
export const RISK_COLORS = {
  1: { bg: 'bg-green-100', text: 'text-green-700', label: 'Bajo' },
  2: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Medio' },
  3: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Alto' },
  4: { bg: 'bg-red-100', text: 'text-red-700', label: 'Crítico' }
};

// Mensajes iniciales del bot
export const INITIAL_BOT_MESSAGE = '¡Hola! Soy Jinsei, tu compañero de apoyo emocional. Este es un espacio seguro donde puedes expresarte libremente. ¿Cómo te sientes hoy?';

// Mensajes de error
export const ERROR_MESSAGES = {
  LOGIN_FAILED: 'Usuario o contraseña incorrectos',
  REGISTER_FAILED: 'Error al crear la cuenta. Intenta con otro alias',
  PASSWORD_MISMATCH: 'Las contraseñas no coinciden',
  NETWORK_ERROR: 'Error de conexión. Verifica tu internet',
  SESSION_ERROR: 'Error al iniciar la sesión de chat',
  MESSAGE_ERROR: 'No se pudo enviar el mensaje. Intenta de nuevo'
};