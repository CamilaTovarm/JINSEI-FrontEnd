import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import helpService from '../../Services/helpService';
import { useChat } from '../../Hooks/useChat';

const HelpRequestForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    documentNumber: '',
    contactName: '',
    contactPhone: '',
    contactRelation: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const { sessionId } = useChat();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // 1. Crear consentimiento
    const consentResult = await helpService.createConsent({
      sessionId: sessionId,
      fullName: formData.fullName,
      documentNumber: formData.documentNumber
    });

    if (!consentResult.success) {
      setError(consentResult.error);
      setLoading(false);
      return;
    }

    // 2. Crear contacto de emergencia
    const contactResult = await helpService.createContact({
      consentId: consentResult.data.ConsentId,
      description: `${formData.contactName} - ${formData.contactPhone} - ${formData.contactRelation}`
    });

    if (!contactResult.success) {
      setError(contactResult.error);
      setLoading(false);
      return;
    }

    // 3. Vincular contacto con consentimiento
    await helpService.linkConsentContact(
      consentResult.data.ConsentId,
      contactResult.data.ContactId
    );

    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle size={32} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Solicitud Enviada
        </h2>
        <p className="text-gray-600 mb-6">
          Un profesional se pondrá en contacto contigo pronto. No estás solo.
        </p>
        <button
          onClick={() => navigate('/chat')}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
        >
          Volver al Chat
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle size={32} className="text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Solicitud de Apoyo Institucional
        </h2>
        <p className="text-gray-600">
          Para brindarte la mejor ayuda, necesitamos algunos datos
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre Completo
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Número de Documento
          </label>
          <input
            type="text"
            name="documentNumber"
            value={formData.documentNumber}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            required
            disabled={loading}
          />
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Contacto de Emergencia
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Contacto
              </label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono del Contacto
              </label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Relación con el Contacto
              </label>
              <select
                name="contactRelation"
                value={formData.contactRelation}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                required
                disabled={loading}
              >
                <option value="">Selecciona una opción</option>
                <option value="padre">Padre/Madre</option>
                <option value="hermano">Hermano/a</option>
                <option value="amigo">Amigo/a</option>
                <option value="pareja">Pareja</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-sm text-purple-800">
            <strong>Nota:</strong> Esta información será tratada con absoluta confidencialidad 
            y solo será usada para brindarte el apoyo necesario.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate('/chat')}
            disabled={loading}
            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Enviando...' : 'Enviar Solicitud'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HelpRequestForm;