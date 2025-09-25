import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { 
  Home, 
  User, 
  Calendar, 
  Search, 
  Settings,
  Bell,
  CreditCard,
  MessageCircle,
  Star,
  Menu,
  X
} from 'lucide-react';

// Mobile-first PWA interface
export default function PWAMobile() {
  const [location, setLocation] = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    // Configurar PWA mobile específico
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }
  }, []);

  const navigation = [
    { icon: Home, label: 'Início', path: '/' },
    { icon: Search, label: 'Buscar', path: '/consultores' },
    { icon: Calendar, label: 'Agenda', path: '/agendamentos' },
    { icon: MessageCircle, label: 'Chat', path: '/chat' },
    { icon: User, label: 'Perfil', path: '/perfil' }
  ];

  const quickActions = [
    { icon: Calendar, label: 'Agendar Consulta', color: 'bg-purple-500' },
    { icon: CreditCard, label: 'Comprar Créditos', color: 'bg-green-500' },
    { icon: Star, label: 'Favoritos', color: 'bg-yellow-500' },
    { icon: Bell, label: 'Notificações', color: 'bg-blue-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Mobile */}
      <header className="bg-white shadow-sm border-b px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-lg hover:bg-gray-100 mr-3"
          >
            {showMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Conselhos Esotéricos
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-lg hover:bg-gray-100">
            <Bell className="w-6 h-6 text-gray-600" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Settings className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </header>

      {/* Slide Menu */}
      {showMenu && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowMenu(false)} />
          <div className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-xl p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold">Menu</h2>
              <button onClick={() => setShowMenu(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="space-y-4">
              {navigation.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setLocation(item.path);
                    setShowMenu(false);
                  }}
                  className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <item.icon className="w-5 h-5 mr-3 text-gray-600" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 pb-20">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl text-white p-6 mb-6">
          <h2 className="text-2xl font-bold mb-2">Bem-vindo ao App!</h2>
          <p className="opacity-90">Sua jornada espiritual na palma da sua mão</p>
          <div className="mt-4 flex items-center">
            <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1 text-sm">
              💰 Créditos: R$ 150,00
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className={`${action.color} text-white p-4 rounded-xl flex flex-col items-center transition-transform active:scale-95`}
              >
                <action.icon className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Consultants */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-4">Consultores em Destaque</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((consultant) => (
              <div key={consultant} className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    C{consultant}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Consultor {consultant}</h4>
                    <p className="text-sm text-gray-600">Especialista em Tarot</p>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">4.9</span>
                      </div>
                      <span className="text-sm text-green-600 ml-3">● Online</span>
                    </div>
                  </div>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Consultar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-lg font-bold mb-4">Atividade Recente</h3>
          <div className="space-y-3">
            {[
              { type: 'consultation', title: 'Consulta de Tarot finalizada', time: '2h atrás' },
              { type: 'credit', title: 'Créditos adicionados', time: '1 dia atrás' },
              { type: 'favorite', title: 'Consultor adicionado aos favoritos', time: '2 dias atrás' }
            ].map((activity, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                    {activity.type === 'consultation' && <Calendar className="w-5 h-5 text-purple-600" />}
                    {activity.type === 'credit' && <CreditCard className="w-5 h-5 text-green-600" />}
                    {activity.type === 'favorite' && <Star className="w-5 h-5 text-yellow-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around">
          {navigation.map((item, index) => (
            <button
              key={index}
              onClick={() => setLocation(item.path)}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                location === item.path 
                  ? 'text-purple-600 bg-purple-50' 
                  : 'text-gray-600'
              }`}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}