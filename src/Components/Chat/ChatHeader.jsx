import { Menu } from 'lucide-react';
import { RISK_COLORS } from '../../Utils/constants';

const ChatHeader = ({ riskLevel, onToggleSidebar }) => {
  const riskInfo = RISK_COLORS[riskLevel] || RISK_COLORS[1];

  return (
    <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleSidebar}
          className="lg:hidden hover:bg-gray-100 p-2 rounded-lg transition"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Chat con Jinsei</h1>
      </div>
      
      <div className={`px-3 py-1 rounded-full text-sm font-medium ${riskInfo.bg} ${riskInfo.text}`}>
        Riesgo: {riskInfo.label}
      </div>
    </div>
  );
};

export default ChatHeader;