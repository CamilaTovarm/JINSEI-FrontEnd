import api from './api';

const chatService = {
  // POST /sessions - Crear nueva sesión de chat
  createSession: async (userId) => {
    try {
      const response = await api.post('/sessions', {
        UserId: userId,
        StartTime: new Date().toISOString(),
        RiskLevelId: 1, // Inicialmente bajo
        FinalRiskLevel: null,
        IsDeleted: false
      });
      
      // Guardar sessionId en localStorage
      localStorage.setItem('sessionId', response.data.SessionId);
      
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error al crear sesión' 
      };
    }
  },

  // GET /sessions/:id - Obtener sesión
  getSession: async (sessionId) => {
    try {
      const response = await api.get(`/sessions/${sessionId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: 'Error al obtener sesión' };
    }
  },

  // PUT /sessions/:id - Actualizar nivel de riesgo de la sesión
  updateSessionRisk: async (sessionId, riskLevelId) => {
    try {
      const response = await api.put(`/sessions/${sessionId}`, {
        RiskLevelId: riskLevelId
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: 'Error al actualizar riesgo' };
    }
  },

  // POST /messages - Enviar mensaje y recibir respuesta del bot
  // Este endpoint llama a Mistral (respuesta) y BERT (detección de riesgo)
  sendMessage: async (sessionId, userMessage) => {
    try {
      const response = await api.post('/messages', {
        SessionId: sessionId,
        UserResponse: userMessage,
        CreatedAt: new Date().toISOString(),
        IsDeleted: false
      });
      
      // La respuesta debe incluir:
      // - BotMessage (generado por Mistral)
      // - RiskLevelId (detectado por BERT)
      // - RiskPercent (% de riesgo)
      
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error al enviar mensaje' 
      };
    }
  },

  // GET /messages?sessionId=X - Obtener historial de mensajes
  getMessages: async (sessionId) => {
    try {
      const response = await api.get(`/messages`, {
        params: { sessionId }
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: 'Error al cargar mensajes' };
    }
  },

  // PUT /sessions/:id/end - Finalizar sesión
  endSession: async (sessionId, finalRiskLevel) => {
    try {
      const response = await api.put(`/sessions/${sessionId}/end`, {
        EndTime: new Date().toISOString(),
        FinalRiskLevel: finalRiskLevel
      });
      localStorage.removeItem('sessionId');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: 'Error al finalizar sesión' };
    }
  }
};

export default chatService;