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
import { 
  User, 
  CreditCard, 
  Calendar, 
  History, 
  Settings, 
  LogOut, 
  Star, 
  Clock,
  Wallet,
  Gift,
  Edit,
  Camera,
  Phone,
  Mail,
  FileText,
  MessageSquare,
  Video,
  Heart
} from "lucide-react";

export default function ClientDashboard() {
  const [editMode, setEditMode] = useState(false);
  
  // Mock user data for now since authentication is not fully implemented
  const user = {
    firstName: "ALEX",
    lastName: "DEVELOPER", 
    email: "alexmoura-2015@hotmail.com",
    credits: "10.00",
    bonusCredits: "0.00",
    profileImageUrl: null,
    phone: "87999272064"
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  const initials = `${user.firstName[0]}${user.lastName[0]}`;
  const totalCredits = parseFloat(user.credits) + parseFloat(user.bonusCredits);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.profileImageUrl} />
                <AvatarFallback className="bg-blue-500 text-white">{initials}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Olá, {user.firstName}!
                </h1>
                <p className="text-sm text-gray-500">Painel do Cliente</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                <Wallet className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  R$ {totalCredits.toFixed(2)}
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={() => logout()}>
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cards de Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <CreditCard className="h-8 w-8 opacity-75" />
                <div className="ml-4">
                  <p className="text-blue-100">Créditos Totais</p>
                  <p className="text-2xl font-bold">R$ {totalCredits.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 opacity-75" />
                <div className="ml-4">
                  <p className="text-green-100">Consultas</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Star className="h-8 w-8 opacity-75" />
                <div className="ml-4">
                  <p className="text-purple-100">Avaliações</p>
                  <p className="text-2xl font-bold">4.8</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Gift className="h-8 w-8 opacity-75" />
                <div className="ml-4">
                  <p className="text-orange-100">Bônus</p>
                  <p className="text-2xl font-bold">R$ {parseFloat(user.bonusCredits).toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs principais */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="consultations">Consultas</TabsTrigger>
            <TabsTrigger value="credits">Créditos</TabsTrigger>
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
                          <AvatarFallback>MC</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Maria Clara</p>
                          <p className="text-sm text-gray-500">Tarot Cigano</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Hoje, 15:00</p>
                        <Badge variant="secondary">Confirmado</Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">João Silva</p>
                          <p className="text-sm text-gray-500">Astrologia</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Amanhã, 10:30</p>
                        <Badge variant="secondary">Agendado</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Histórico recente */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <History className="w-5 h-5 mr-2 text-green-500" />
                    Histórico Recente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>LC</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Luna Celestial</p>
                          <p className="text-sm text-gray-500">Mediunidade - 30 min</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Ontem</p>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="text-sm">5.0</span>
                        </div>
                      </div>
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
                  <Button className="h-20 flex-col bg-blue-500 hover:bg-blue-600">
                    <Calendar className="w-6 h-6 mb-2" />
                    Agendar Consulta
                  </Button>
                  <Button className="h-20 flex-col bg-green-500 hover:bg-green-600">
                    <CreditCard className="w-6 h-6 mb-2" />
                    Comprar Créditos
                  </Button>
                  <Button className="h-20 flex-col bg-purple-500 hover:bg-purple-600">
                    <MessageSquare className="w-6 h-6 mb-2" />
                    Chat Direto
                  </Button>
                  <Button className="h-20 flex-col bg-orange-500 hover:bg-orange-600">
                    <Video className="w-6 h-6 mb-2" />
                    Videochamada
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Consultas */}
          <TabsContent value="consultations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Minhas Consultas</CardTitle>
                <CardDescription>
                  Gerencie suas consultas agendadas e históricas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="scheduled">
                  <TabsList>
                    <TabsTrigger value="scheduled">Agendadas</TabsTrigger>
                    <TabsTrigger value="completed">Concluídas</TabsTrigger>
                    <TabsTrigger value="cancelled">Canceladas</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="scheduled" className="space-y-4">
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback>MC</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">Maria Clara - Tarot Cigano</h3>
                              <p className="text-sm text-gray-500">Especialista em relacionamentos</p>
                            </div>
                          </div>
                          <Badge>Confirmado</Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                            Hoje, 15:00
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-green-500" />
                            30 minutos
                          </div>
                          <div className="flex items-center">
                            <CreditCard className="w-4 h-4 mr-2 text-purple-500" />
                            R$ 45,00
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="w-4 h-4 mr-2 text-orange-500" />
                            Chat + Áudio
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-2 mt-4">
                          <Button variant="outline" size="sm">
                            Reagendar
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            Cancelar
                          </Button>
                          <Button size="sm">
                            Entrar na Consulta
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Créditos */}
          <TabsContent value="credits" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wallet className="w-5 h-5 mr-2 text-green-500" />
                    Meus Créditos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Créditos Normais</p>
                      <p className="text-2xl font-bold text-green-600">R$ {user.credits}</p>
                    </div>
                    <CreditCard className="w-8 h-8 text-green-500" />
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Créditos Bônus</p>
                      <p className="text-2xl font-bold text-orange-600">R$ {user.bonusCredits}</p>
                    </div>
                    <Gift className="w-8 h-8 text-orange-500" />
                  </div>
                  
                  <Button className="w-full">
                    Comprar Mais Créditos
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Transações</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">Consulta - Maria Clara</p>
                        <p className="text-sm text-gray-500">Hoje, 15:00</p>
                      </div>
                      <span className="text-red-600 font-medium">-R$ 45,00</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">Compra de Créditos</p>
                        <p className="text-sm text-gray-500">Ontem, 10:30</p>
                      </div>
                      <span className="text-green-600 font-medium">+R$ 100,00</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">Bônus de Cadastro</p>
                        <p className="text-sm text-gray-500">2 dias atrás</p>
                      </div>
                      <span className="text-green-600 font-medium">+R$ 20,00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Perfil */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Meu Perfil
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
                  Configurações da Conta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Notificações</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Consultas Agendadas</p>
                        <p className="text-sm text-gray-500">Receba lembretes sobre suas consultas</p>
                      </div>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Promoções</p>
                        <p className="text-sm text-gray-500">Ofertas especiais e descontos</p>
                      </div>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Newsletter</p>
                        <p className="text-sm text-gray-500">Conteúdo semanal sobre esoterismo</p>
                      </div>
                      <input type="checkbox" className="toggle" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Privacidade</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Perfil Público</p>
                        <p className="text-sm text-gray-500">Permitir que consultores vejam seu perfil</p>
                      </div>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Avaliações</p>
                        <p className="text-sm text-gray-500">Mostrar suas avaliações publicamente</p>
                      </div>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Segurança</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      Alterar Senha
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Autenticação em Duas Etapas
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