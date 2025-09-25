"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  User, 
  CreditCard, 
  MessageCircle, 
  Star, 
  LogOut, 
  Plus,
  Clock,
  TrendingUp,
  Settings
} from "lucide-react";

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  credits: number;
}

interface Consultation {
  id: string;
  consultant_id: string;
  started_at: string;
  ended_at: string | null;
  status: string;
  price_per_minute_snapshot: number;
  total_charged: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(userData));
    loadUserData(token);
  }, [router]);

  const loadUserData = async (token: string) => {
    try {
      // Load user details
      const userResponse = await fetch('/api/auth/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (userResponse.ok) {
        const userData = await userResponse.json();
        setUser(userData);
      }

      // Load consultations
      const consultationsResponse = await fetch('/api/consultations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (consultationsResponse.ok) {
        const consultationsData = await consultationsResponse.json();
        setConsultations(consultationsData);
      }
    } catch (err) {
      setError('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const addCredits = () => {
    router.push('/creditos');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Erro ao carregar dados</h1>
          <button 
            onClick={() => router.push('/login')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Fazer Login
          </button>
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
              <Link href="/" className="text-2xl font-bold text-purple-600">
                Portal Esotérico
              </Link>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo, {user.firstName}!
          </h1>
          <p className="text-gray-600">
            Gerencie suas consultas e créditos no Portal Esotérico
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Créditos</p>
                <p className="text-2xl font-bold text-gray-900">R$ {user.credits.toFixed(2)}</p>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={addCredits}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Créditos
              </button>
            </div>
          </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                      <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageCircle className="w-6 h-6 text-blue-600" />
                        </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Consultas</p>
                <p className="text-2xl font-bold text-gray-900">{consultations.length}</p>
                      </div>
                    </div>
            <div className="mt-4">
              <Link
                href="/consultores"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Nova Consulta
              </Link>
                        </div>
                      </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Gasto Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  R$ {consultations.reduce((sum, c) => sum + Number(c.total_charged || 0), 0).toFixed(2)}
                </p>
                        </div>
                      </div>
                    </div>
                  </div>

        {/* Recent Consultations */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Consultas Recentes</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {consultations.length === 0 ? (
              <div className="px-6 py-8 text-center">
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma consulta ainda</h3>
                <p className="text-gray-500 mb-4">Comece sua jornada espiritual com nossos consultores</p>
                <Link
                  href="/consultores"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                        Ver Consultores
                    </Link>
              </div>
            ) : (
              consultations.slice(0, 5).map((consultation) => (
                <div key={consultation.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <MessageCircle className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">
                          Consulta #{consultation.id.slice(-8)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(consultation.started_at).toLocaleDateString('pt-BR')}
                        </p>
                  </div>
                          </div>
                          <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        R$ {consultation.total_charged.toFixed(2)}
                      </p>
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          consultation.status === 'active' ? 'bg-green-500' :
                          consultation.status === 'ended' ? 'bg-gray-500' : 'bg-red-500'
                        }`}></div>
                        <span className="text-sm text-gray-500 capitalize">
                          {consultation.status === 'active' ? 'Ativa' :
                           consultation.status === 'ended' ? 'Finalizada' : 'Cancelada'}
                            </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
                    </div>
                  </div>
                  
        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Ações Rápidas</h3>
            <div className="space-y-3">
              <Link
                href="/consultores"
                className="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-purple-600 mr-3" />
                <span className="text-purple-900 font-medium">Nova Consulta</span>
              </Link>
              <Link
                href="/creditos"
                className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <CreditCard className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-green-900 font-medium">Comprar Créditos</span>
              </Link>
              <Link
                href="/"
                className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <User className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-blue-900 font-medium">Ver Consultores</span>
              </Link>
                    </div>
                  </div>
                  
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Informações da Conta</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Nome:</span>
                <span className="font-medium">{user.firstName} {user.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Email:</span>
                <span className="font-medium">{user.email}</span>
                  </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tipo:</span>
                <span className="font-medium capitalize">{user.role}</span>
                </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Créditos:</span>
                <span className="font-medium text-green-600">R$ {user.credits.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}