"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send, Clock, CreditCard, MessageCircle } from "lucide-react";

interface Message {
  id: string;
  consultation_id: string;
  sender_type: 'user' | 'consultant';
  content: string;
  created_at: string;
}

interface Consultant {
  id: string;
  name: string;
  slug: string;
  price_per_minute: number;
  status: string;
}

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const [consultant, setConsultant] = useState<Consultant | null>(null);
  const [consultationId, setConsultationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [credits, setCredits] = useState(0);
  const [consultationActive, setConsultationActive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (params.slug) {
      loadConsultant(params.slug as string);
    }
  }, [params.slug]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadConsultant = async (slug: string) => {
    try {
      const response = await fetch(`/api/consultants/slug/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setConsultant(data);
        await checkUserCredits();
      } else {
        setError("Consultor não encontrado");
      }
    } catch (err) {
      setError("Erro ao carregar consultor");
    } finally {
      setLoading(false);
    }
  };

  const checkUserCredits = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const response = await fetch('/api/credits/balance', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setCredits(data.credits);
      }
    } catch (err) {
      console.error('Erro ao verificar créditos:', err);
    }
  };

  const startConsultation = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    if (!consultant) return;

    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ consultantId: consultant.id })
      });

      if (response.ok) {
        const data = await response.json();
        setConsultationId(data.consultationId);
        setConsultationActive(true);
        connectWebSocket(data.consultationId, token);
      } else {
        setError("Erro ao iniciar consulta");
      }
    } catch (err) {
      setError("Erro ao iniciar consulta");
    }
  };

  const connectWebSocket = (consultationId: string, token: string) => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}`;
    const websocket = new WebSocket(wsUrl);

    websocket.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
      
      // Authenticate
      websocket.send(JSON.stringify({
        type: 'auth',
        token: token
      }));
    };

    websocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      
      if (message.type === 'auth_success') {
        // Join consultation room
        websocket.send(JSON.stringify({
          type: 'join_consultation',
          consultationId: consultationId
        }));
        loadMessages(consultationId);
      } else if (message.type === 'message') {
        // Add new message to state
        const newMsg: Message = {
          id: `msg_${Date.now()}`,
          consultation_id: message.consultationId,
          sender_type: message.senderType,
          content: message.content,
          created_at: message.timestamp
        };
        setMessages(prev => [...prev, newMsg]);
      }
    };

    websocket.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
    };

    setWs(websocket);
  };

  const loadMessages = async (consultationId: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`/api/consultations/${consultationId}/messages`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (err) {
      console.error('Erro ao carregar mensagens:', err);
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !ws || !consultationActive) return;

    ws.send(JSON.stringify({
      type: 'message',
      content: newMessage.trim()
    }));

    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error || !consultant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Erro ao carregar consultor</h1>
          <Link href="/">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
              Voltar ao início
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href={`/consultor/${consultant.slug}`} className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </Link>
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-800">{consultant.name}</h1>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>R$ {consultant.price_per_minute}/min</span>
                </div>
                <div className="flex items-center">
                  <CreditCard className="w-4 h-4 mr-1" />
                  <span>{credits.toFixed(2)} créditos</span>
                </div>
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>{isConnected ? 'Conectado' : 'Desconectado'}</span>
              </div>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {!consultationActive ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <MessageCircle className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Iniciar Consulta</h2>
            <p className="text-gray-600 mb-6">
              Você está prestes a iniciar uma consulta com {consultant.name} por R$ {consultant.price_per_minute}/minuto.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800 text-sm">
                <strong>Saldo atual:</strong> R$ {credits.toFixed(2)} créditos
              </p>
              {credits < consultant.price_per_minute && (
                <p className="text-red-600 text-sm mt-2">
                  Saldo insuficiente. <Link href="/creditos" className="underline">Compre mais créditos</Link>
                </p>
              )}
            </div>
            <button
              onClick={startConsultation}
              disabled={credits < consultant.price_per_minute}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              {credits < consultant.price_per_minute ? 'Saldo Insuficiente' : 'Iniciar Consulta'}
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm h-[600px] flex flex-col">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Nenhuma mensagem ainda. Digite algo para começar!</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender_type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender_type === 'user'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender_type === 'user' ? 'text-purple-200' : 'text-gray-500'
                      }`}>
                        {new Date(message.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={!isConnected}
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim() || !isConnected}
                  className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {isConnected ? 'Conectado' : 'Desconectado'} • Pressione Enter para enviar
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
