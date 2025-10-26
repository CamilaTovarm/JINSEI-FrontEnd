import { useState, useEffect } from 'react';
import { useAuth } from '../Hooks/useAuth';
import { useChat } from '../Hooks/useChat';
import Sidebar from '../Components/Sidebar/Sidebar';
import ChatHeader from '../Components/Chat/ChatHeader';
import ChatArea from '../Components/Chat/ChatArea';
import ChatInput from '../Components/Chat/ChatInput';

const ChatPage = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { user } = useAuth();
  const { messages, sendMessage, initSession, loading, sessionActive, currentRiskLevel } = useChat();

  useEffect(() => {
    // Iniciar sesión de chat cuando el componente se monta
    if (user && !sessionActive) {
      initSession(user.UserId);
    }
  }, [user, sessionActive]);

  const handleSendMessage = async (message) => {
    await sendMessage(message);
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        show={showSidebar} 
        onClose={() => setShowSidebar(false)}
        currentRiskLevel={currentRiskLevel}
      />

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <ChatHeader 
          riskLevel={currentRiskLevel}
          onToggleSidebar={() => setShowSidebar(true)}
        />
        
        <ChatArea 
          messages={messages}
          loading={loading}
        />
        
        <ChatInput 
          onSendMessage={handleSendMessage}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default ChatPage;