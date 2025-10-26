import { createContext, useState, useEffect } from 'react';
import chatService from '../Services/chatService';
import { INITIAL_BOT_MESSAGE, RISK_LEVELS } from '../Utils/constants';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [currentRiskLevel, setCurrentRiskLevel] = useState(RISK_LEVELS.BAJO);
  const [loading, setLoading] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);

  // Iniciar nueva sesión de chat
  const initSession = async (userId) => {
    setLoading(true);
    const result = await chatService.createSession(userId);
    
    if (result.success) {
      setSessionId(result.data.SessionId);
      setSessionActive(true);
      
      // Agregar mensaje inicial del bot
      setMessages([{
        id: Date.now(),
        text: INITIAL_BOT_MESSAGE,
        isBot: true,
        timestamp: new Date().toISOString(),
        riskLevel: null,
        riskPercent: null
      }]);
    }
    
    setLoading(false);
    return result;
  };

  // Enviar mensaje del usuario y recibir respuesta del bot
  const sendMessage = async (userMessage) => {
    if (!sessionId || !userMessage.trim()) return;

    // Agregar mensaje del usuario inmediatamente
    const userMsg = {
      id: Date.now(),
      text: userMessage,
      isBot: false,
      timestamp: new Date().toISOString(),
      riskLevel: null,
      riskPercent: null
    };
    
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    // Enviar a la API (que procesa con Mistral y BERT)
    const result = await chatService.sendMessage(sessionId, userMessage);
    
    if (result.success) {
      const { BotMessage, RiskLevelId, RiskPercent } = result.data;
      
      // Actualizar nivel de riesgo actual
      setCurrentRiskLevel(RiskLevelId);
      
      // Agregar respuesta del bot
      const botMsg = {
        id: Date.now() + 1,
        text: BotMessage,
        isBot: true,
        timestamp: new Date().toISOString(),
        riskLevel: RiskLevelId,
        riskPercent: RiskPercent
      };
      
      setMessages(prev => [...prev, botMsg]);
      
      // Si el riesgo es alto o crítico, actualizar la sesión
      if (RiskLevelId >= RISK_LEVELS.ALTO) {
        await chatService.updateSessionRisk(sessionId, RiskLevelId);
      }
    }
    
    setLoading(false);
    return result;
  };

  // Cargar historial de mensajes
  const loadMessages = async (sessionId) => {
    const result = await chatService.getMessages(sessionId);
    if (result.success && result.data.length > 0) {
      const formattedMessages = result.data.map(msg => ({
        id: msg.MessageId,
        text: msg.BotMessage || msg.UserResponse,
        isBot: !!msg.BotMessage,
        timestamp: msg.CreatedAt,
        riskLevel: msg.RiskLevelId,
        riskPercent: msg.RiskPercent
      }));
      setMessages(formattedMessages);
    }
  };

  // Finalizar sesión
  const endSession = async () => {
    if (sessionId) {
      await chatService.endSession(sessionId, currentRiskLevel);
      setSessionActive(false);
      setMessages([]);
      setSessionId(null);
    }
  };

  const value = {
    messages,
    sessionId,
    currentRiskLevel,
    loading,
    sessionActive,
    sendMessage,
    initSession,
    loadMessages,
    endSession
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};