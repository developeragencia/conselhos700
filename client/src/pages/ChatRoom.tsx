import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Smile, 
  Paperclip, 
  Phone, 
  Video, 
  MoreVertical,
  Clock,
  CheckCheck,
  Star,
  Heart,
  ThumbsUp
} from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: "text" | "image" | "file" | "system";
  status: "sending" | "sent" | "delivered" | "read";
  reactions?: { emoji: string; count: number; users: string[] }[];
}

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline" | "busy";
  isTyping: boolean;
}

export default function ChatRoom() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: "consultant",
      senderName: "Consultor Especialista",
      content: "Olá! Seja bem-vindo(a) à nossa consulta. Como posso te ajudar hoje?",
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      type: "text",
      status: "read"
    },
    {
      id: "2",
      senderId: "user",
      senderName: "Você",
      content: "Olá! Gostaria de uma orientação sobre minha vida amorosa.",
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      type: "text",
      status: "read"
    },
    {
      id: "3",
      senderId: "consultant",
      senderName: "Consultor Especialista",
      content: "Perfeito! Vou fazer uma leitura especial para você. Me conte um pouco sobre sua situação atual...",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      type: "text",
      status: "read",
      reactions: [
        { emoji: "❤️", count: 1, users: ["user"] }
      ]
    }
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [consultant] = useState<ChatUser>({
    id: "consultant",
    name: "Consultor Especialista",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=150&h=150&fit=crop&crop=face",
    status: "online",
    isTyping: false
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simular digitação do consultor
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          // Adicionar mensagem aleatória do consultor
          if (Math.random() > 0.7) {
            const responses = [
              "Interessante... vejo uma energia muito forte aqui.",
              "As cartas estão me mostrando algo importante...",
              "Sinto que você está passando por uma fase de transformação.",
              "O universo tem planos especiais para você!"
            ];
            
            const newMsg: Message = {
              id: Date.now().toString(),
              senderId: "consultant",
              senderName: "Consultor Especialista",
              content: responses[Math.floor(Math.random() * responses.length)],
              timestamp: new Date(),
              type: "text",
              status: "sent"
            };
            
            setMessages(prev => [...prev, newMsg]);
          }
        }, 2000 + Math.random() * 3000);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: "user",
      senderName: "Você",
      content: newMessage,
      timestamp: new Date(),
      type: "text",
      status: "sending"
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");

    // Simular envio
    setTimeout(() => {
      setMessages(prev => 
        prev.map(m => 
          m.id === message.id 
            ? { ...m, status: "delivered" }
            : m
        )
      );
    }, 1000);

    // Simular leitura
    setTimeout(() => {
      setMessages(prev => 
        prev.map(m => 
          m.id === message.id 
            ? { ...m, status: "read" }
            : m
        )
      );
    }, 2000);
  };

  const addReaction = (messageId: string, emoji: string) => {
    setMessages(prev => 
      prev.map(message => {
        if (message.id === messageId) {
          const reactions = message.reactions || [];
          const existingReaction = reactions.find(r => r.emoji === emoji);
          
          if (existingReaction) {
            if (existingReaction.users.includes("user")) {
              // Remove reaction
              return {
                ...message,
                reactions: reactions.map(r => 
                  r.emoji === emoji 
                    ? { ...r, count: r.count - 1, users: r.users.filter(u => u !== "user") }
                    : r
                ).filter(r => r.count > 0)
              };
            } else {
              // Add user to reaction
              return {
                ...message,
                reactions: reactions.map(r => 
                  r.emoji === emoji 
                    ? { ...r, count: r.count + 1, users: [...r.users, "user"] }
                    : r
                )
              };
            }
          } else {
            // New reaction
            return {
              ...message,
              reactions: [...reactions, { emoji, count: 1, users: ["user"] }]
            };
          }
        }
        return message;
      })
    );
    setSelectedMessageId(null);
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sending": return <Clock className="w-3 h-3 text-gray-400" />;
      case "sent": return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case "delivered": return <CheckCheck className="w-3 h-3 text-blue-500" />;
      case "read": return <CheckCheck className="w-3 h-3 text-purple-500" />;
      default: return null;
    }
  };

  const emojis = ["❤️", "👍", "😊", "😍", "🙏", "✨", "🔮", "⭐"];

  return (
    <div className="h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={consultant.avatar}
                alt={consultant.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                consultant.status === "online" ? "bg-green-500" : "bg-gray-400"
              }`} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{consultant.name}</h2>
              <p className="text-sm text-gray-600">
                {consultant.status === "online" ? "Online agora" : "Offline"}
                {isTyping && " • digitando..."}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors">
              <Phone className="w-5 h-5 text-purple-600" />
            </button>
            <button className="p-2 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors">
              <Video className="w-5 h-5 text-purple-600" />
            </button>
            <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.senderId === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-xs lg:max-w-md ${message.senderId === "user" ? "order-2" : "order-1"}`}>
              {message.senderId !== "user" && (
                <div className="flex items-center mb-1">
                  <img
                    src={consultant.avatar}
                    alt={consultant.name}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <span className="text-xs text-gray-500">{message.senderName}</span>
                </div>
              )}
              
              <div
                className={`relative px-4 py-2 rounded-2xl cursor-pointer group ${
                  message.senderId === "user"
                    ? "bg-purple-600 text-white"
                    : "bg-white text-gray-800 shadow-sm"
                }`}
                onClick={() => setSelectedMessageId(
                  selectedMessageId === message.id ? null : message.id
                )}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                
                {/* Reactions */}
                {message.reactions && message.reactions.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {message.reactions.map((reaction, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          addReaction(message.id, reaction.emoji);
                        }}
                        className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs transition-colors ${
                          reaction.users.includes("user")
                            ? "bg-purple-100 text-purple-600"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        <span>{reaction.emoji}</span>
                        <span>{reaction.count}</span>
                      </button>
                    ))}
                  </div>
                )}
                
                <div className={`flex items-center justify-between mt-1 ${
                  message.senderId === "user" ? "text-purple-200" : "text-gray-500"
                }`}>
                  <span className="text-xs">{formatTime(message.timestamp)}</span>
                  {message.senderId === "user" && (
                    <div className="ml-2">
                      {getStatusIcon(message.status)}
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Reactions */}
              <AnimatePresence>
                {selectedMessageId === message.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex justify-center mt-2"
                  >
                    <div className="flex items-center space-x-2 bg-white rounded-full shadow-lg p-2">
                      {emojis.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => addReaction(message.id, emoji)}
                          className="hover:scale-125 transition-transform text-lg"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex justify-start"
            >
              <div className="flex items-center space-x-2">
                <img
                  src={consultant.avatar}
                  alt={consultant.name}
                  className="w-6 h-6 rounded-full"
                />
                <div className="bg-white px-4 py-2 rounded-2xl shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t p-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Smile className="w-5 h-5 text-gray-600" />
          </button>
          
          <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <Paperclip className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Digite sua mensagem..."
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Emoji Picker */}
        <AnimatePresence>
          {showEmojiPicker && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-20 left-4 bg-white rounded-2xl shadow-xl p-4 grid grid-cols-8 gap-2"
            >
              {emojis.concat(["😀", "😂", "🥰", "😢", "😮", "😡", "🤔", "👏"]).map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => {
                    setNewMessage(prev => prev + emoji);
                    setShowEmojiPicker(false);
                  }}
                  className="text-2xl hover:scale-125 transition-transform p-2"
                >
                  {emoji}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}