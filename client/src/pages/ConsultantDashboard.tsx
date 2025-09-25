import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Calendar, 
  DollarSign, 
  Settings, 
  LogOut, 
  Star, 
  Clock,
  TrendingUp,
  Users,
  Edit,
  Camera,
  Phone,
  Mail,
  FileText,
  MessageSquare,
  Video,
  Globe,
  BarChart3,
  Zap,
  Award,
  CheckCircle,
  XCircle
} from "lucide-react";

export default function ConsultantDashboard() {
  const { user, logout } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  if (!user) return null;

  const initials = `${user.firstName[0]}${user.lastName[0]}`;
  const monthlyEarnings = 2850.00;
  const totalConsultations = 145;
  const rating = 4.9;
  const responseRate = 98;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.profileImageUrl} />
                <AvatarFallback className="bg-purple-500 text-white">{initials}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-sm text-gray-500">Consultor Esotérico</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={isOnline} 
                  onCheckedChange={setIsOnline}
                  className="data-[state=checked]:bg-green-500"
                />
                <span className={`text-sm font-medium ${isOnline ? 'text-green-600' : 'text-gray-400'}`}>
                  {isOnline ? 'Online' : 'Offline'}
                </span>
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
        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 opacity-75" />
                <div className="ml-4">
                  <p className="text-green-100">Ganhos do Mês</p>
                  <p className="text-2xl font-bold">R$ {monthlyEarnings.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 opacity-75" />
                <div className="ml-4">
                  <p className="text-blue-100">Total de Consultas</p>
                  <p className="text-2xl font-bold">{totalConsultations}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Star className="h-8 w-8 opacity-75" />
                <div className="ml-4">
                  <p className="text-yellow-100">Avaliação</p>
                  <p className="text-2xl font-bold">{rating}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 opacity-75" />
                <div className="ml-4">
                  <p className="text-purple-100">Taxa de Resposta</p>
                  <p className="text-2xl font-bold">{responseRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs principais */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="schedule">Agenda</TabsTrigger>
            <TabsTrigger value="earnings">Ganhos</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          {/* Visão Geral */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Próximas consultas */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                    Próximas Consultas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>AF</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Ana Fernanda</p>
                          <p className="text-sm text-gray-500">Tarot + Orientação</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Hoje, 16:00</p>
                        <Badge variant="secondary">Confirmado</Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>RC</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Roberto Carlos</p>
                          <p className="text-sm text-gray-500">Astrologia Natal</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Hoje, 18:30</p>
                        <Badge variant="secondary">Aguardando</Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>MS</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Mariana Silva</p>
                          <p className="text-sm text-gray-500">Mediunidade</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Amanhã, 09:00</p>
                        <Badge variant="secondary">Novo</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Estatísticas do dia */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-green-500" />
                    Estatísticas de Hoje
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Consultas Realizadas</span>
                      <span className="font-semibold">3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Faturamento</span>
                      <span className="font-semibold text-green-600">R$ 225,00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Tempo Online</span>
                      <span className="font-semibold">6h 30m</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Taxa de Conversão</span>
                      <span className="font-semibold text-blue-600">85%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Novos Clientes</span>
                      <span className="font-semibold text-purple-600">2</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Ações rápidas */}
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="h-20 flex-col bg-purple-500 hover:bg-purple-600">
                    <MessageSquare className="w-6 h-6 mb-2" />
                    Chat com Clientes
                  </Button>
                  <Button className="h-20 flex-col bg-green-500 hover:bg-green-600">
                    <Calendar className="w-6 h-6 mb-2" />
                    Definir Horários
                  </Button>
                  <Button className="h-20 flex-col bg-blue-500 hover:bg-blue-600">
                    <DollarSign className="w-6 h-6 mb-2" />
                    Definir Preços
                  </Button>
                  <Button className="h-20 flex-col bg-orange-500 hover:bg-orange-600">
                    <Award className="w-6 h-6 mb-2" />
                    Ver Conquistas
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Metas e conquistas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-500" />
                  Metas do Mês
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Consultas</span>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <p className="text-2xl font-bold text-green-600">25/20</p>
                    <p className="text-sm text-gray-600">Meta atingida!</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Faturamento</span>
                      <Zap className="w-5 h-5 text-blue-500" />
                    </div>
                    <p className="text-2xl font-bold text-blue-600">R$ 2.850</p>
                    <p className="text-sm text-gray-600">95% da meta</p>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Avaliação</span>
                      <Star className="w-5 h-5 text-yellow-500" />
                    </div>
                    <p className="text-2xl font-bold text-yellow-600">4.9</p>
                    <p className="text-sm text-gray-600">Excelente!</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Agenda */}
          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Agenda</CardTitle>
                <CardDescription>
                  Configure seus horários de atendimento e disponibilidade
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="today">
                  <TabsList>
                    <TabsTrigger value="today">Hoje</TabsTrigger>
                    <TabsTrigger value="week">Esta Semana</TabsTrigger>
                    <TabsTrigger value="availability">Disponibilidade</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="today" className="space-y-4">
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-medium">16:00 - 16:30</h3>
                            <p className="text-sm text-gray-500">Ana Fernanda - Tarot + Orientação</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-green-100 text-green-800">Confirmado</Badge>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Remarcar</Button>
                          <Button size="sm">Iniciar Consulta</Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-medium">18:30 - 19:00</h3>
                            <p className="text-sm text-gray-500">Roberto Carlos - Astrologia Natal</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-yellow-100 text-yellow-800">Aguardando</Badge>
                            <Button size="sm" variant="outline">
                              <Phone className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Confirmar</Button>
                          <Button size="sm" variant="outline" className="text-red-600">
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="availability" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Horários de Atendimento</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Segunda a Sexta</Label>
                            <div className="flex space-x-2 mt-1">
                              <Input placeholder="09:00" />
                              <span className="self-center">às</span>
                              <Input placeholder="18:00" />
                            </div>
                          </div>
                          <div>
                            <Label>Sábado e Domingo</Label>
                            <div className="flex space-x-2 mt-1">
                              <Input placeholder="10:00" />
                              <span className="self-center">às</span>
                              <Input placeholder="16:00" />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <Label>Intervalo para Almoço</Label>
                          <div className="flex space-x-2 mt-1">
                            <Input placeholder="12:00" />
                            <span className="self-center">às</span>
                            <Input placeholder="13:00" />
                          </div>
                        </div>
                        
                        <Button>Salvar Horários</Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ganhos */}
          <TabsContent value="earnings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <p className="text-sm text-gray-600">Ganhos do Mês</p>
                      <p className="text-2xl font-bold text-green-600">R$ 2.850,00</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-500" />
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Média por Consulta</p>
                      <p className="text-2xl font-bold text-blue-600">R$ 114,00</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-blue-500" />
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Total Acumulado</p>
                      <p className="text-2xl font-bold text-purple-600">R$ 12.450,00</p>
                    </div>
                    <Award className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Pagamentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">Pagamento - Janeiro</p>
                        <p className="text-sm text-gray-500">Pago em 05/02/2025</p>
                      </div>
                      <span className="text-green-600 font-medium">R$ 2.850,00</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">Pagamento - Dezembro</p>
                        <p className="text-sm text-gray-500">Pago em 05/01/2025</p>
                      </div>
                      <span className="text-green-600 font-medium">R$ 3.200,00</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">Pagamento - Novembro</p>
                        <p className="text-sm text-gray-500">Pago em 05/12/2024</p>
                      </div>
                      <span className="text-green-600 font-medium">R$ 2.900,00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Clientes */}
          <TabsContent value="clients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Meus Clientes</CardTitle>
                <CardDescription>
                  Gerencie sua base de clientes e histórico de atendimentos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="active">
                  <TabsList>
                    <TabsTrigger value="active">Ativos</TabsTrigger>
                    <TabsTrigger value="recent">Recentes</TabsTrigger>
                    <TabsTrigger value="favorites">Favoritos</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="active" className="space-y-4">
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback>AF</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">Ana Fernanda</h3>
                              <p className="text-sm text-gray-500">Cliente desde Jan 2024</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge>Cliente VIP</Badge>
                            <p className="text-sm text-gray-500 mt-1">15 consultas</p>
                          </div>
                        </div>
                        
                        <div className="mt-3 flex justify-between text-sm">
                          <span>Última consulta: Hoje</span>
                          <span>Total investido: R$ 1.425,00</span>
                        </div>
                        
                        <div className="flex space-x-2 mt-3">
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Chat
                          </Button>
                          <Button size="sm" variant="outline">
                            <Calendar className="w-4 h-4 mr-1" />
                            Agendar
                          </Button>
                          <Button size="sm" variant="outline">
                            Ver Histórico
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
                              <h3 className="font-medium">Roberto Carlos</h3>
                              <p className="text-sm text-gray-500">Cliente desde Dez 2024</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="secondary">Regular</Badge>
                            <p className="text-sm text-gray-500 mt-1">8 consultas</p>
                          </div>
                        </div>
                        
                        <div className="mt-3 flex justify-between text-sm">
                          <span>Última consulta: Ontem</span>
                          <span>Total investido: R$ 720,00</span>
                        </div>
                        
                        <div className="flex space-x-2 mt-3">
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Chat
                          </Button>
                          <Button size="sm" variant="outline">
                            <Calendar className="w-4 h-4 mr-1" />
                            Agendar
                          </Button>
                          <Button size="sm" variant="outline">
                            Ver Histórico
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Perfil */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Perfil Público
                  </span>
                  <Button 
                    variant="outline" 
                    onClick={() => setEditMode(!editMode)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {editMode ? 'Cancelar' : 'Editar'}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user.profileImageUrl} />
                    <AvatarFallback className="text-xl">{initials}</AvatarFallback>
                  </Avatar>
                  {editMode && (
                    <Button variant="outline">
                      <Camera className="w-4 h-4 mr-2" />
                      Alterar Foto
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Nome</Label>
                    <Input 
                      id="firstName" 
                      value={user.firstName} 
                      readOnly={!editMode}
                      className={editMode ? '' : 'bg-gray-50'}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Sobrenome</Label>
                    <Input 
                      id="lastName" 
                      value={user.lastName} 
                      readOnly={!editMode}
                      className={editMode ? '' : 'bg-gray-50'}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input 
                        id="email" 
                        value={user.email} 
                        readOnly
                        className="pl-10 bg-gray-50"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input 
                        id="phone" 
                        value={user.phone || ''} 
                        readOnly={!editMode}
                        className={`pl-10 ${editMode ? '' : 'bg-gray-50'}`}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Biografia Profissional</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Conte sobre sua experiência, especialidades e filosofia de trabalho..."
                    readOnly={!editMode}
                    className={editMode ? '' : 'bg-gray-50'}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="specialties">Especialidades</Label>
                    <Input 
                      id="specialties" 
                      placeholder="Tarot, Astrologia, Mediunidade..."
                      readOnly={!editMode}
                      className={editMode ? '' : 'bg-gray-50'}
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience">Anos de Experiência</Label>
                    <Input 
                      id="experience" 
                      placeholder="Ex: 15 anos"
                      readOnly={!editMode}
                      className={editMode ? '' : 'bg-gray-50'}
                    />
                  </div>
                </div>

                {editMode && (
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setEditMode(false)}>
                      Cancelar
                    </Button>
                    <Button>
                      Salvar Alterações
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configurações */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Configurações do Consultor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Preços e Serviços</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Preço por Minuto</Label>
                        <Input placeholder="R$ 3,50" />
                      </div>
                      <div>
                        <Label>Duração Mínima</Label>
                        <Input placeholder="15 minutos" />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Serviços Oferecidos</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">Tarot</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">Astrologia</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" />
                          <span className="text-sm">Mediunidade</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">Orientação Espiritual</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Notificações</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Novas Consultas</p>
                        <p className="text-sm text-gray-500">Receba alertas sobre agendamentos</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Mensagens de Clientes</p>
                        <p className="text-sm text-gray-500">Notificações de chat em tempo real</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Relatórios Financeiros</p>
                        <p className="text-sm text-gray-500">Resumo mensal de ganhos</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Conta</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      Alterar Senha
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Dados Bancários
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Certificações
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-600">
                      Desativar Conta
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