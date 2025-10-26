import { User, LogOut, AlertCircle, X } from 'lucide-react';
import { useAuth } from '../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { RISK_LEVELS } from '../../Utils/constants';

const Sidebar = ({ show, onClose, currentRiskLevel }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleHelpRequest = () => {
    navigate('/help-request');
    onClose();
  };

  const showHelpButton = currentRiskLevel >= RISK_LEVELS.ALTO;

  return (
    <>
      {/* Overlay para móvil */}
      {show && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-10"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`
          ${show ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 
          fixed lg:static 
          w-80 h-full 
          bg-gradient-to-b from-purple-600 to-blue-600 
          text-white p-6 
          transition-transform duration-300
          z-20
          overflow-y-auto
        `}
      >
        <button 
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 hover:bg-white/10 p-2 rounded-lg transition"
        >
          <X size={24} />
        </button>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Jinsei</h2>
          <p className="text-purple-100 text-sm">Apoyo emocional universitario</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
            <User size={20} />
            <span className="font-medium">{user?.AKA || 'Usuario'}</span>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-semibold mb-2">¿Qué es Jinsei?</h3>
            <p className="text-sm text-purple-100">
              Un chatbot de apoyo emocional diseñado para estudiantes universitarios que necesitan ser escuchados.
            </p>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Tu privacidad</h3>
            <p className="text-sm text-purple-100">
              Todas tus conversaciones son confidenciales y anónimas. Usamos IA para detectar situaciones de riesgo y ofrecerte ayuda profesional cuando la necesites.
            </p>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Cómo funciona</h3>
            <p className="text-sm text-purple-100">
              Jinsei utiliza inteligencia artificial (Mistral) para conversar contigo y análisis de riesgo (BERT) para identificar si necesitas apoyo adicional.
            </p>
          </div>

          {showHelpButton && (
            <div className="bg-red-500/20 border-2 border-red-300 rounded-lg p-4 animate-pulse">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle size={20} />
                <h3 className="font-semibold">Apoyo Disponible</h3>
              </div>
              <p className="text-sm mb-3">
                Detectamos que podrías necesitar ayuda profesional inmediata.
              </p>
              <button 
                onClick={handleHelpRequest}
                className="w-full bg-white text-purple-600 py-2 rounded-lg font-medium hover:bg-purple-50 transition"
              >
                Solicitar Ayuda Ahora
              </button>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-purple-100 hover:text-white hover:bg-white/10 py-2 px-3 rounded-lg transition w-full"
        >
          <LogOut size={20} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </>
  );
};

export default Sidebar;