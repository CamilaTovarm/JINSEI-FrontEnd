import { RISK_COLORS } from '../../Utils/constants';

const ChatMessage = ({ message }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('es-CO', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div
      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} message-enter`}
    >
      <div className={`max-w-md ${message.isBot ? 'max-w-lg' : ''}`}>
        <div
          className={`px-4 py-3 rounded-2xl ${
            message.isBot
              ? 'bg-white text-gray-800 shadow-sm border border-gray-100'
              : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        </div>
        
        <div className={`flex items-center gap-2 mt-1 px-2 ${message.isBot ? 'justify-start' : 'justify-end'}`}>
          <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
          
          {!message.isBot && message.riskLevel && message.riskLevel > 1 && (
            <span className={`text-xs px-2 py-0.5 rounded-full ${RISK_COLORS[message.riskLevel].bg} ${RISK_COLORS[message.riskLevel].text}`}>
              {RISK_COLORS[message.riskLevel].label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;