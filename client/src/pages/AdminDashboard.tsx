import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Shield, 
  Users, 
  DollarSign, 
  Settings, 
  LogOut, 
  Star, 
  TrendingUp,
  UserCheck,
  UserX,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  BarChart3,
  PieChart,
  Calendar,
  MessageSquare,
  Phone,
  Mail,
  Globe,
  Activity
} from "lucide-react";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <Card className="p-8 text-center">
          <CardContent>
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-600 mb-2">Acesso Negado</h2>
            <p className="text-gray-600">Você não tem permissão para acessar esta área.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const initials = `${user.firstName[0]}${user.lastName[0]}`;
  const totalUsers = 1247;
  const totalConsultants = 89;
  const monthlyRevenue = 45670.00;
  const activeConsultations = 23;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.profileImageUrl} />
                <AvatarFallback className="bg-red-500 text-white">{initials}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Administrador
                </h1>
                <p className="text-sm text-gray-500">Painel de Controle</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                <Activity className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Sistema Online</span>
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cards de Estatísticas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 opacity-75" />
                <div className="ml-4">
                  <p className="text-blue-100">Total de Usuários</p>
                  <p className="text-2xl font-bold">{totalUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <UserCheck className="h-8 w-8 opacity-75" />
                <div className="ml-4">
                  <p className="text-purple-100">Consultores</p>
                  <p className="text-2xl font-bold">{totalConsultants}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 opacity-75" />
                <div className="ml-4">
                  <p className="text-green-100">Receita Mensal</p>
                  <p className="text-2xl font-bold">R$ {monthlyRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Activity className="h-8 w-8 opacity-75" />
                <div className="ml-4">
                  <p className="text-orange-100">Consultas Ativas</p>
                  <p className="text-2xl font-bold">{activeConsultations}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Principais */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="consultants">Consultores</TabsTrigger>
            <TabsTrigger value="finances">Financeiro</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          {/* Visão Geral */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Atividade Recente */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-blue-500" />
                    Atividade Recente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <div>
                          <p className="font-medium">Novo consultor aprovado</p>
                          <p className="text-sm text-gray-500">Maria Clara - Tarot</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">5 min atrás</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="font-medium">15 novos usuários</p>
                          <p className="text-sm text-gray-500">Cadastros hoje</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">1 hora atrás</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                        <div>
                          <p className="font-medium">Denúncia reportada</p>
                          <p className="text-sm text-gray-500">Consultor João Silva</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">2 horas atrás</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <DollarSign className="w-5 h-5 text-purple-500" />
                        <div>
                          <p className="font-medium">Pagamento processado</p>
                          <p className="text-sm text-gray-500">R$ 2.450,00 para consultores</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">3 horas atrás</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Estatísticas do Sistema */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-green-500" />
                    Estatísticas do Sistema
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Usuários Ativos (24h)</span>
                      <span className="font-semibold text-green-600">1,234</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Consultas Hoje</span>
                      <span className="font-semibold text-blue-600">89</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Taxa de Conversão</span>
                      <span className="font-semibold text-purple-600">12.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Suporte Pendente</span>
                      <span className="font-semibold text-orange-600">7</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Avaliação Média</span>
                      <span className="font-semibold text-yellow-600">4.8 ⭐</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Ações Rápidas */}
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas do Administrador</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="h-20 flex-col bg-blue-500 hover:bg-blue-600">
                    <UserCheck className="w-6 h-6 mb-2" />
                    Aprovar Consultores
                  </Button>
                  <Button className="h-20 flex-col bg-green-500 hover:bg-green-600">
                    <DollarSign className="w-6 h-6 mb-2" />
                    Processar Pagamentos
                  </Button>
                  <Button className="h-20 flex-col bg-purple-500 hover:bg-purple-600">
                    <BarChart3 className="w-6 h-6 mb-2" />
                    Relatórios
                  </Button>
                  <Button className="h-20 flex-col bg-orange-500 hover:bg-orange-600">
                    <Settings className="w-6 h-6 mb-2" />
                    Configurações
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Consultores Pendentes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <UserCheck className="w-5 h-5 mr-2 text-orange-500" />
                    Consultores Pendentes de Aprovação
                  </span>
                  <Badge variant="secondary">3 pendentes</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>LC</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">Luna Celestial</h3>
                          <p className="text-sm text-gray-500">lunacelestial@email.com</p>
                        </div>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-500">Especialidade:</span>
                        <p className="font-medium">Mediunidade</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Experiência:</span>
                        <p className="font-medium">8 anos</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Telefone:</span>
                        <p className="font-medium">(11) 99999-9999</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Cadastro:</span>
                        <p className="font-medium">Hoje</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button size="sm" variant="outline" className="text-red-600">
                        <XCircle className="w-4 h-4 mr-1" />
                        Rejeitar
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Aprovar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Usuários */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Gerenciar Usuários
                  </span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Exportar
                    </Button>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-1" />
                      Novo Usuário
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input 
                        placeholder="Buscar usuários..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>AF</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">Ana Fernanda Silva</h3>
                          <p className="text-sm text-gray-500">ana.silva@email.com</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge>Cliente</Badge>
                        <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                      </div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Cadastro:</span>
                        <p className="font-medium">15/01/2025</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Última atividade:</span>
                        <p className="font-medium">Hoje</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Consultas:</span>
                        <p className="font-medium">23</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Gasto total:</span>
                        <p className="font-medium">R$ 1.245,00</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2 mt-4">
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Contatar
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600">
                        <UserX className="w-4 h-4 mr-1" />
                        Suspender
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>RC</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">Roberto Carlos Santos</h3>
                          <p className="text-sm text-gray-500">roberto.santos@email.com</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge>Cliente</Badge>
                        <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                      </div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Cadastro:</span>
                        <p className="font-medium">10/01/2025</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Última atividade:</span>
                        <p className="font-medium">Ontem</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Consultas:</span>
                        <p className="font-medium">8</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Gasto total:</span>
                        <p className="font-medium">R$ 560,00</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2 mt-4">
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Contatar
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600">
                        <UserX className="w-4 h-4 mr-1" />
                        Suspender
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Consultores */}
          <TabsContent value="consultants" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <UserCheck className="w-5 h-5 mr-2" />
                    Gerenciar Consultores
                  </span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Exportar
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="active">
                  <TabsList>
                    <TabsTrigger value="active">Ativos</TabsTrigger>
                    <TabsTrigger value="pending">Pendentes</TabsTrigger>
                    <TabsTrigger value="suspended">Suspensos</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="active" className="space-y-4">
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback>MC</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">Maria Clara - Tarot Cigano</h3>
                              <p className="text-sm text-gray-500">maria.clara@email.com</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-green-100 text-green-800">Online</Badge>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 mr-1" />
                              <span className="text-sm font-medium">4.9</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                          <div>
                            <span className="text-gray-500">Consultas:</span>
                            <p className="font-medium">145</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Ganhos (mês):</span>
                            <p className="font-medium">R$ 2.850,00</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Taxa resposta:</span>
                            <p className="font-medium">98%</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Ativo desde:</span>
                            <p className="font-medium">Nov 2024</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4 mr-1" />
                            Editar
                          </Button>
                          <Button size="sm" variant="outline">
                            <BarChart3 className="w-4 h-4 mr-1" />
                            Estatísticas
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600">
                            <UserX className="w-4 h-4 mr-1" />
                            Suspender
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financeiro */}
          <TabsContent value="finances" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                    Resumo Financeiro
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Receita Total (Janeiro)</p>
                      <p className="text-2xl font-bold text-green-600">R$ 45.670,00</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-500" />
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Comissão Plataforma</p>
                      <p className="text-2xl font-bold text-blue-600">R$ 9.134,00</p>
                    </div>
                    <PieChart className="w-8 h-8 text-blue-500" />
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Pagos a Consultores</p>
                      <p className="text-2xl font-bold text-purple-600">R$ 36.536,00</p>
                    </div>
                    <Users className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Transações Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">Pagamento - Maria Clara</p>
                        <p className="text-sm text-gray-500">Hoje, 14:30</p>
                      </div>
                      <span className="text-green-600 font-medium">R$ 2.850,00</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">Compra de Créditos - Ana Silva</p>
                        <p className="text-sm text-gray-500">Hoje, 13:15</p>
                      </div>
                      <span className="text-blue-600 font-medium">R$ 100,00</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">Consulta - Roberto Santos</p>
                        <p className="text-sm text-gray-500">Hoje, 12:00</p>
                      </div>
                      <span className="text-purple-600 font-medium">R$ 75,00</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">Pagamento - João Silva</p>
                        <p className="text-sm text-gray-500">Ontem, 18:45</p>
                      </div>
                      <span className="text-green-600 font-medium">R$ 1.920,00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Relatórios */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Relatórios e Análises
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="h-20 flex-col">
                    <BarChart3 className="w-6 h-6 mb-2" />
                    Relatório de Vendas
                  </Button>
                  <Button className="h-20 flex-col" variant="outline">
                    <Users className="w-6 h-6 mb-2" />
                    Relatório de Usuários
                  </Button>
                  <Button className="h-20 flex-col" variant="outline">
                    <DollarSign className="w-6 h-6 mb-2" />
                    Relatório Financeiro
                  </Button>
                  <Button className="h-20 flex-col" variant="outline">
                    <Star className="w-6 h-6 mb-2" />
                    Relatório de Avaliações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configurações */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Configurações do Sistema
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Configurações Gerais</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Manutenção Programada</p>
                        <p className="text-sm text-gray-500">Ativar modo de manutenção</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Novos Cadastros</p>
                        <p className="text-sm text-gray-500">Permitir novos registros</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Aprovação Automática</p>
                        <p className="text-sm text-gray-500">Aprovar consultores automaticamente</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Configurações Financeiras</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Taxa da Plataforma (%)</Label>
                      <Input placeholder="20" />
                    </div>
                    <div>
                      <Label>Valor Mínimo Saque</Label>
                      <Input placeholder="50.00" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Backup e Segurança</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Fazer Backup Completo
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Upload className="w-4 h-4 mr-2" />
                      Restaurar Backup
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="w-4 h-4 mr-2" />
                      Logs de Segurança
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}