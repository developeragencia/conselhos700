import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  X, 
  CheckCircle, 
  AlertCircle, 
  MessageCircle,
  Users,
  Clock
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface Notification {
  id: number;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  action?: {
    text: string;
    url: string;
  };
}

export function ConsultationNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Buscar estatísticas para gerar notificações dinâmicas
  const { data: stats } = useQuery({
    queryKey: ['/api/consultation/stats'],
    refetchInterval: 5000,
  });

  // Simular notificações em tempo real baseadas nas estatísticas
  useEffect(() => {
    if (stats) {
      const currentTime = new Date().toLocaleTimeString();
      
      // Gerar notificações baseadas em dados reais
      const dynamicNotifications: Notification[] = [];

      if (stats.onlineConsultants > 0) {
        dynamicNotifications.push({
          id: Date.now() + 1,
          type: 'success',
          title: 'Consultores Online',
          message: `${stats.onlineConsultants} especialistas disponíveis agora`,
          timestamp: currentTime,
          isRead: false,
          action: {
            text: 'Ver Consultores',
            url: '/consultas-online'
          }
        });
      }

      if (stats.activeConsultations > 0) {
        dynamicNotifications.push({
          id: Date.now() + 2,
          type: 'info',
          title: 'Consultas Ativas',
          message: `${stats.activeConsultations} sessões em andamento`,
          timestamp: currentTime,
          isRead: false
        });
      }

      if (stats.queueLength > 0) {
        dynamicNotifications.push({
          id: Date.now() + 3,
          type: 'warning',
          title: 'Fila de Espera',
          message: `${stats.queueLength} pessoa(s) aguardando atendimento`,
          timestamp: currentTime,
          isRead: false
        });
      }

      // Atualizar notificações evitando duplicatas
      setNotifications(prev => {
        const existingIds = prev.map(n => n.type + n.title);
        const newNotifications = dynamicNotifications.filter(
          n => !existingIds.includes(n.type + n.title)
        );
        
        const updated = [...newNotifications, ...prev].slice(0, 5); // Manter apenas 5 mais recentes
        setUnreadCount(updated.filter(n => !n.isRead).length);
        return updated;
      });
    }
  }, [stats]);

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    setUnreadCount(0);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      default:
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Botão de Notificações */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative bg-white p-3 rounded-full shadow-lg border-2 border-purple-100 hover:border-purple-300 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bell className="w-6 h-6 text-purple-600" />
        {unreadCount > 0 && (
          <motion.div
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {unreadCount}
          </motion.div>
        )}
      </motion.button>

      {/* Painel de Notificações */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-16 right-0 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Notificações</h3>
                <div className="flex items-center space-x-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-sm bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors"
                    >
                      Marcar todas como lidas
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Lista de Notificações */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>Nenhuma notificação no momento</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                      !notification.isRead ? 'bg-purple-50' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900 truncate">
                            {notification.title}
                          </h4>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-400">
                            {notification.timestamp}
                          </span>
                          {notification.action && (
                            <a
                              href={notification.action.url}
                              className="text-xs text-purple-600 hover:text-purple-800 font-medium"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {notification.action.text}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Estatísticas Rápidas */}
            {stats && (
              <div className="bg-gray-50 p-4 border-t">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <Users className="w-4 h-4 text-green-500 mx-auto mb-1" />
                    <div className="text-sm font-semibold text-gray-900">{stats.onlineConsultants}</div>
                    <div className="text-xs text-gray-500">Online</div>
                  </div>
                  <div>
                    <MessageCircle className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                    <div className="text-sm font-semibold text-gray-900">{stats.activeConsultations}</div>
                    <div className="text-xs text-gray-500">Ativas</div>
                  </div>
                  <div>
                    <Clock className="w-4 h-4 text-orange-500 mx-auto mb-1" />
                    <div className="text-sm font-semibold text-gray-900">{stats.queueLength}</div>
                    <div className="text-xs text-gray-500">Na Fila</div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}