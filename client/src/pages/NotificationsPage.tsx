import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Bell, AlertCircle, Clock, Check, Star, Trash2, MarkAsUnread } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  isUrgent: boolean;
  actionUrl?: string;
  actionText?: string;
  createdAt: string;
  data?: Record<string, any>;
}

export default function NotificationsPage() {
  const [filter, setFilter] = useState<'all' | 'unread' | 'urgent'>('all');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const queryClient = useQueryClient();

  // Fetch notifications based on filter
  const { data: notifications = [], isLoading, refetch } = useQuery<Notification[]>({
    queryKey: ['/api/notifications', filter],
    queryFn: () => {
      const params = new URLSearchParams();
      if (filter === 'unread') params.append('isRead', 'false');
      if (filter === 'urgent') params.append('isUrgent', 'true');
      params.append('limit', '50');
      
      return apiRequest('GET', `/api/notifications?${params.toString()}`);
    },
    refetchInterval: 30000,
  });

  // Mark notification as read
  const markAsReadMutation = useMutation({
    mutationFn: (id: number) => apiRequest('POST', `/api/notifications/${id}/read`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/notifications'] });
      refetch();
    },
  });

  // Mark all as read
  const markAllAsReadMutation = useMutation({
    mutationFn: () => apiRequest('POST', '/api/notifications/read-all'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/notifications'] });
      refetch();
    },
  });

  // Get notification icon based on type
  const getNotificationIcon = (type: string, isUrgent: boolean) => {
    if (isUrgent) return <AlertCircle className="w-6 h-6 text-red-500" />;
    
    switch (type) {
      case 'consultation_booked':
        return <Clock className="w-6 h-6 text-blue-500" />;
      case 'payment_received':
        return <Check className="w-6 h-6 text-green-500" />;
      case 'new_message':
        return <Bell className="w-6 h-6 text-purple-500" />;
      case 'consultant_approved':
        return <Star className="w-6 h-6 text-yellow-500" />;
      default:
        return <Bell className="w-6 h-6 text-gray-500" />;
    }
  };

  // Format time ago
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Agora mesmo';
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d atrás`;
    return date.toLocaleDateString('pt-BR');
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      markAsReadMutation.mutate(notification.id);
    }
    
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl;
    }
  };

  const toggleSelection = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedIds.length === notifications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(notifications.map(n => n.id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Central de Notificações</h1>
              <p className="text-gray-600 mt-1">Acompanhe todas as suas notificações em tempo real</p>
            </div>
            <Bell className="w-8 h-8 text-purple-500" />
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'all' 
                  ? 'bg-purple-100 text-purple-700 font-medium' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Todas ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'unread' 
                  ? 'bg-purple-100 text-purple-700 font-medium' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Não lidas ({notifications.filter(n => !n.isRead).length})
            </button>
            <button
              onClick={() => setFilter('urgent')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'urgent' 
                  ? 'bg-red-100 text-red-700 font-medium' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Urgentes ({notifications.filter(n => n.isUrgent).length})
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedIds.length === notifications.length && notifications.length > 0}
                onChange={selectAll}
                className="rounded"
              />
              <span className="text-sm text-gray-600">
                {selectedIds.length > 0 ? `${selectedIds.length} selecionadas` : 'Selecionar todas'}
              </span>
            </div>
            
            <div className="flex space-x-2">
              {notifications.filter(n => !n.isRead).length > 0 && (
                <button
                  onClick={() => markAllAsReadMutation.mutate()}
                  disabled={markAllAsReadMutation.isPending}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
                >
                  Marcar todas como lidas
                </button>
              )}
              <button
                onClick={() => refetch()}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Atualizar
              </button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-lg shadow-sm">
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="animate-spin w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-500">Carregando notificações...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-12 text-center">
              <Bell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">Nenhuma notificação encontrada</h3>
              <p className="text-gray-500">
                {filter === 'all' && 'Você não tem notificações no momento.'}
                {filter === 'unread' && 'Todas as suas notificações foram lidas.'}
                {filter === 'urgent' && 'Você não tem notificações urgentes.'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {notifications.map((notification, index) => (
                <div
                  key={notification.id}
                  className={`p-6 hover:bg-gray-50 transition-colors ${
                    !notification.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  } ${index === 0 ? 'rounded-t-lg' : ''} ${index === notifications.length - 1 ? 'rounded-b-lg' : ''}`}
                >
                  <div className="flex items-start space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(notification.id)}
                      onChange={() => toggleSelection(notification.id)}
                      className="mt-1 rounded"
                    />
                    
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type, notification.isUrgent)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className={`text-lg font-medium ${
                              !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                            }`}>
                              {notification.title}
                            </h3>
                            {notification.isUrgent && (
                              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                                Urgente
                              </span>
                            )}
                            {!notification.isRead && (
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                Nova
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 mt-2 leading-relaxed">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-4">
                            <span className="text-sm text-gray-500">
                              {formatTimeAgo(notification.createdAt)}
                            </span>
                            <div className="flex space-x-2">
                              {!notification.isRead && (
                                <button
                                  onClick={() => markAsReadMutation.mutate(notification.id)}
                                  className="text-sm text-blue-600 hover:text-blue-700"
                                >
                                  Marcar como lida
                                </button>
                              )}
                              {notification.actionText && notification.actionUrl && (
                                <button
                                  onClick={() => handleNotificationClick(notification)}
                                  className="text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition-colors"
                                >
                                  {notification.actionText} →
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Smart Suggestions */}
        <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">💡 Dicas Inteligentes</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Configure suas preferências de notificação para receber apenas o que é importante</p>
            <p>• Notificações urgentes aparecem com destaque vermelho para sua atenção imediata</p>
            <p>• Use os filtros para organizar melhor suas notificações por tipo</p>
          </div>
        </div>
      </div>
    </div>
  );
}