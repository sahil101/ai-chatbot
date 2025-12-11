import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import MessageList from './MessageList';
import ChatForm from './ChatForm';

type FormData = {
  prompt: string;
};

type ChatResponse = {
  message: string;
};

type Message = {
  role: 'user' | 'bot';
  content: string;
};

const ChatBot = () => {
  const conversationId = useRef(crypto.randomUUID());
  const [messages, setMessages] = useState<Message[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const onSubmit = async ({ prompt }: FormData) => {
    setMessages((prev) => [...prev, { role: 'user', content: prompt }]);
    setIsBotTyping(true);
    try {
      const { data } = await axios.post<ChatResponse>('/api/chat', {
        prompt: prompt,
        conversationId: conversationId.current,
      });
      setMessages((prev) => [...prev, { role: 'bot', content: data.message }]);
      setIsBotTyping(false);
    } catch (error) {
        console.error('Error fetching bot response:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: 'Can\t reply now' },
      ]);
      setIsBotTyping(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit({ prompt: e.currentTarget.value });
    }
  };

  return (
    <div>
      <MessageList messages={messages} isBotTyping={isBotTyping} />
      <ChatForm onSubmit={onSubmit} onKeyDown={onKeyDown} />
    </div>
  );
};

export default ChatBot;
