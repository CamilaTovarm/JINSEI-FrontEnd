import api from './api';

const helpService = {
  // POST /consents - Crear consentimiento para ayuda institucional
  createConsent: async (consentData) => {
    try {
      const response = await api.post('/consents', {
        SessionId: consentData.sessionId,
        FullName: consentData.fullName,
        DocumentTypeId: consentData.documentTypeId || 1, // CC por defecto
        DocumentNumber: consentData.documentNumber,
        CreatedAt: new Date().toISOString(),
        IsDeleted: false
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error al crear consentimiento' 
      };
    }
  },

  // POST /contacts - Crear contacto de emergencia
  createContact: async (contactData) => {
    try {
      const response = await api.post('/contacts', {
        ConsentId: contactData.consentId,
        ContactTypeId: contactData.contactTypeId || 1, // Familiar por defecto
        Description: contactData.description,
        CreatedAt: new Date().toISOString(),
        IsDeleted: false
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error al crear contacto' 
      };
    }
  },

  // POST /consent-contacts - Vincular contacto con consentimiento
  linkConsentContact: async (consentId, contactId) => {
    try {
      const response = await api.post('/consent-contacts', {
        ConsentId: consentId,
        ContactId: contactId
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: 'Error al vincular contacto' };
    }
  },

  // GET /document-types - Obtener tipos de documentos
  getDocumentTypes: async () => {
    try {
      const response = await api.get('/document-types');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, data: [] };
    }
  },

  // GET /contact-types - Obtener tipos de contactos
  getContactTypes: async () => {
    try {
      const response = await api.get('/contact-types');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, data: [] };
    }
  }
};

export default helpService;