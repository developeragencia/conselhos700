import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Star, MessageCircle, Calendar, User, Home, Search, Heart, Settings } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { LoadingScreen } from '@/components/LoadingScreen';

export default function PWAMobileFinal() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const { data: consultants = [] } = useQuery({
    queryKey: ['/api/consultants/featured'],
  });

  const { data: testimonials = [] } = useQuery({
    queryKey: ['/api/testimonials'],
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowContent(true), 100);
    }, 1000); // Reduzido para 1s para melhor UX mobile
    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 100);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  if (!showContent) {
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

  const renderHomeContent = () => (
    <div className="space-y-6 pb-6">
      {/* Banner Hero Mobile */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-6 mx-4 mt-4">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Bem-vindo ao seu Universo Espiritual</h2>
          <p className="text-purple-100 text-sm mb-4">Conecte-se com nossos consultores especialistas</p>
          <button className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold text-sm hover:bg-purple-50 transition-colors">
            Começar Consulta
          </button>
        </div>
      </div>

      {/* Serviços em Cards Mobile */}
      <div className="px-4">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Nossos Serviços</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: 'Tarot', icon: '🃏', color: 'bg-purple-500' },
            { name: 'Astrologia', icon: '⭐', color: 'bg-blue-500' },
            { name: 'Mediunidade', icon: '👁️', color: 'bg-indigo-500' },
            { name: 'Runas', icon: '🔮', color: 'bg-violet-500' }
          ].map((service, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center mb-3`}>
                <span className="text-xl">{service.icon}</span>
              </div>
              <h4 className="font-semibold text-gray-900 text-sm">{service.name}</h4>
              <p className="text-xs text-gray-500 mt-1">Consulta online</p>
            </div>
          ))}
        </div>
      </div>

      {/* Consultores Destaque Mobile */}
      <div className="px-4">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Consultores em Destaque</h3>
        <div className="space-y-3">
          {Array.isArray(consultants) && consultants.length > 0 ? consultants.slice(0, 3).map((consultant: any) => (
            <div key={consultant.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
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
                    <span className="text-xs text-gray-400 ml-1">({consultant.reviewCount})</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-purple-600">R$ {consultant.pricePerMinute}/min</p>
                  <button className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs mt-1 hover:bg-purple-700 transition-colors">
                    Consultar
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <div className="text-center py-6">
              <p className="text-gray-500">Carregando consultores...</p>
            </div>
          )}
        </div>
      </div>

      {/* Depoimentos Mobile */}
      <div className="px-4">
        <h3 className="text-lg font-bold text-gray-900 mb-4">O que dizem nossos clientes</h3>
        <div className="space-y-3">
          {Array.isArray(testimonials) && testimonials.length > 0 ? testimonials.slice(0, 2).map((testimonial: any) => (
            <div key={testimonial.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-start space-x-3">
                <img
                  src={testimonial.authorImageUrl || 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'}
                  alt={testimonial.authorName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{testimonial.content}</p>
                  <p className="text-xs text-gray-500 mt-2 font-medium">{testimonial.authorName}</p>
                </div>
              </div>
            </div>
          )) : (
            <div className="text-center py-6">
              <p className="text-gray-500">Carregando depoimentos...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderConsultorsContent = () => (
    <div className="px-4 pt-4 space-y-4 pb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Consultores</h2>
        <button className="p-2 bg-gray-100 rounded-full">
          <Search className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="space-y-3">
        {Array.isArray(consultants) && consultants.length > 0 ? consultants.map((consultant: any) => (
          <div key={consultant.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={consultant.imageUrl}
                  alt={consultant.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                {consultant.status === 'online' && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{consultant.name}</h3>
                <p className="text-sm text-gray-600">{consultant.title}</p>
                <p className="text-xs text-purple-600 font-medium">{consultant.specialty}</p>
                <div className="flex items-center mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">{consultant.rating}</span>
                  <span className="text-sm text-gray-400 ml-1">({consultant.reviewCount} avaliações)</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-purple-600">R$ {consultant.pricePerMinute}</p>
                <p className="text-xs text-gray-500">por minuto</p>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm mt-2 hover:bg-purple-700 transition-colors w-full">
                  Consultar Agora
                </button>
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Carregando consultores...</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderFavoritesContent = () => (
    <div className="px-4 pt-4 pb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Meus Favoritos</h2>
      <div className="text-center py-12">
        <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum favorito ainda</h3>
        <p className="text-gray-500 text-sm">Adicione consultores aos seus favoritos para acesso rápido</p>
      </div>
    </div>
  );

  const renderProfileContent = () => (
    <div className="px-4 pt-4 pb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Meu Perfil</h2>
      
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Visitante</h3>
          <p className="text-sm text-gray-500">Faça login para acessar todas as funcionalidades</p>
          <Link href="/login">
            <button className="bg-purple-600 text-white px-6 py-2 rounded-full text-sm mt-4 hover:bg-purple-700 transition-colors">
              Fazer Login
            </button>
          </Link>
        </div>
      </div>

      <div className="space-y-3">
        {[
          { icon: Calendar, label: 'Minhas Consultas', count: 0 },
          { icon: Heart, label: 'Favoritos', count: 0 },
          { icon: Settings, label: 'Configurações', count: null },
        ].map((item, index) => (
          <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <item.icon className="w-5 h-5 text-gray-600" />
              </div>
              <span className="font-medium text-gray-900">{item.label}</span>
            </div>
            {item.count !== null && (
              <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs font-medium">
                {item.count}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const getActiveContent = () => {
    switch (activeTab) {
      case 'home': return renderHomeContent();
      case 'consultors': return renderConsultorsContent();
      case 'favorites': return renderFavoritesContent();
      case 'profile': return renderProfileContent();
      default: return renderHomeContent();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 overflow-x-hidden pwa-mobile-container">
      {/* Header Mobile - Fixo e Responsivo */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white sticky top-0 z-50 shadow-lg pwa-safe-area-top">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg">🔮</span>
              </div>
              <div>
                <h1 className="text-lg font-bold">Conselhos Esotéricos</h1>
                <p className="text-xs text-purple-100">Sua consulta espiritual</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors pwa-touch-target">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors pwa-touch-target">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal - Com Scroll Adequado */}
      <main className="flex-1 overflow-y-auto pwa-smooth-scroll">
        {getActiveContent()}
      </main>

      {/* Bottom Navigation - Fixo e Responsivo */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 pwa-bottom-nav">
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
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-colors pwa-touch-target ${
                activeTab === tab.id
                  ? 'text-purple-600 bg-purple-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className={`w-5 h-5 mb-1 ${activeTab === tab.id ? 'text-purple-600' : 'text-gray-500'}`} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}