import { useState, useEffect } from 'react';
import { Star, MessageCircle, Calendar, User, Home, Search, Heart } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

export default function PWAMobileSimple() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  const { data: consultants = [] } = useQuery({
    queryKey: ['/api/consultants/featured'],
  });

  const { data: testimonials = [] } = useQuery({
    queryKey: ['/api/testimonials'],
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-2xl">🔮</span>
          </div>
          <p className="text-lg font-medium">Carregando...</p>
        </div>
      </div>
    );
  }

  const renderHome = () => (
    <div className="space-y-6 pb-6">
      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-6 mx-4 mt-4">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Bem-vindo ao Universo Espiritual</h2>
          <p className="text-purple-100 text-sm mb-4">Conecte-se com consultores especialistas</p>
          <button className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold text-sm">
            Começar Consulta
          </button>
        </div>
      </div>

      {/* Serviços */}
      <div className="px-4">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Nossos Serviços</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: 'Tarot', icon: '🃏', color: 'bg-purple-500' },
            { name: 'Astrologia', icon: '⭐', color: 'bg-blue-500' },
            { name: 'Mediunidade', icon: '👁️', color: 'bg-indigo-500' },
            { name: 'Runas', icon: '🔮', color: 'bg-violet-500' }
          ].map((service, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border">
              <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center mb-3`}>
                <span className="text-xl">{service.icon}</span>
              </div>
              <h4 className="font-semibold text-gray-900 text-sm">{service.name}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Consultores */}
      <div className="px-4">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Consultores em Destaque</h3>
        <div className="space-y-3">
          {Array.isArray(consultants) && consultants.slice(0, 3).map((consultant: any) => (
            <div key={consultant.id} className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="flex items-center space-x-3">
                <img
                  src={consultant.imageUrl}
                  alt={consultant.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 text-sm truncate">{consultant.name}</h4>
                  <p className="text-xs text-gray-500 truncate">{consultant.specialty}</p>
                  <div className="flex items-center mt-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600 ml-1">{consultant.rating}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-purple-600">R$ {consultant.pricePerMinute}/min</p>
                  <button className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs mt-1">
                    Consultar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderConsultors = () => (
    <div className="px-4 pt-4 space-y-4 pb-6">
      <h2 className="text-xl font-bold text-gray-900">Todos os Consultores</h2>
      <div className="space-y-3">
        {Array.isArray(consultants) && consultants.map((consultant: any) => (
          <div key={consultant.id} className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center space-x-4">
              <img
                src={consultant.imageUrl}
                alt={consultant.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{consultant.name}</h3>
                <p className="text-sm text-gray-600">{consultant.title}</p>
                <p className="text-xs text-purple-600 font-medium">{consultant.specialty}</p>
                <div className="flex items-center mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">{consultant.rating}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-purple-600">R$ {consultant.pricePerMinute}</p>
                <p className="text-xs text-gray-500">por minuto</p>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm mt-2 w-full">
                  Consultar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="px-4 pt-4 pb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Meu Perfil</h2>
      <div className="bg-white rounded-xl p-6 shadow-sm border mb-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Visitante</h3>
          <p className="text-sm text-gray-500">Faça login para acessar todas as funcionalidades</p>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-full text-sm mt-4">
            Fazer Login
          </button>
        </div>
      </div>
    </div>
  );

  const getContent = () => {
    switch (activeTab) {
      case 'home': return renderHome();
      case 'consultors': return renderConsultors();
      case 'profile': return renderProfile();
      default: return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white sticky top-0 z-50 shadow-lg">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-lg">🔮</span>
              </div>
              <div>
                <h1 className="text-lg font-bold">Conselhos Esotéricos</h1>
                <p className="text-xs text-purple-100">Sua consulta espiritual</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full bg-white/20">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full bg-white/20">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        {getContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="grid grid-cols-4 px-2 py-2">
          {[
            { id: 'home', icon: Home, label: 'Início' },
            { id: 'consultors', icon: MessageCircle, label: 'Consultores' },
            { id: 'favorites', icon: Heart, label: 'Favoritos' },
            { id: 'profile', icon: User, label: 'Perfil' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center py-2 px-1 rounded-lg transition-colors ${
                activeTab === tab.id ? 'text-purple-600 bg-purple-50' : 'text-gray-500'
              }`}
            >
              <tab.icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}