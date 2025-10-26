import { useContext } from 'react';
import { ChatContext } from '../Context/chatContext';

export const useChat = () => {
  const context = useContext(ChatContext);
  
  if (!context) {
    throw new Error('useChat debe ser usado dentro de un ChatProvider');
  }
  
  return context;
};