import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, User, Crown, CheckCircle2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import logoImage from "@assets/CONSELHOS_20250521_110746_0000_1754078656294.png";

const Cadastro = () => {
  const [, setLocation] = useLocation();
  const [selectedRole, setSelectedRole] = useState('cliente');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    cpf: '',
    phone: '',
    // Campos específicos para consultores
    specialty: '',
    experience: '',
    description: '',
    pricePerMinute: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Validações
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setIsLoading(false);
      return;
    }

    const cpfNumbers = formData.cpf.replace(/\D/g, '');
    if (!cpfNumbers || cpfNumbers.length !== 11) {
      setError('CPF é obrigatório e deve ter 11 dígitos');
      setIsLoading(false);
      return;
    }

    const phoneNumbers = formData.phone.replace(/\D/g, '');
    if (!phoneNumbers || phoneNumbers.length < 10) {
      setError('Telefone é obrigatório e deve ter pelo menos 10 dígitos');
      setIsLoading(false);
      return;
    }

    if (selectedRole === 'consultor') {
      if (!formData.specialty) {
        setError('Especialidade é obrigatória para consultores');
        setIsLoading(false);
        return;
      }
      if (!formData.experience) {
        setError('Experiência é obrigatória para consultores');
        setIsLoading(false);
        return;
      }
      if (!formData.description) {
        setError('Descrição é obrigatória para consultores');
        setIsLoading(false);
        return;
      }
      if (!formData.pricePerMinute || parseFloat(formData.pricePerMinute) <= 0) {
        setError('Preço por minuto deve ser maior que zero');
        setIsLoading(false);
        return;
      }
    }

    try {
      const API_URL = '/api/auth/register';
      console.log('🚀 CADASTRO ENVIANDO PARA:', API_URL);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          cpf: formData.cpf.replace(/\D/g, ''), // Envia apenas números
          phone: formData.phone.replace(/\D/g, ''), // Envia apenas números
          role: selectedRole,
          // Dados específicos para consultores
          specialty: selectedRole === 'consultor' ? formData.specialty : undefined,
          experience: selectedRole === 'consultor' ? formData.experience : undefined,
          description: selectedRole === 'consultor' ? formData.description : undefined,
          pricePerMinute: selectedRole === 'consultor' ? formData.pricePerMinute : undefined,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(data.message);
        
        if (selectedRole === 'cliente') {
          // Cliente pode fazer login imediatamente
          localStorage.setItem('authToken', data.token);
          setTimeout(() => {
            setLocation('/client-dashboard');
          }, 2000);
        } else {
          // Consultor precisa aguardar aprovação
          setTimeout(() => {
            setLocation('/login');
          }, 3000);
        }
      } else {
        setError(data.error || 'Erro ao criar conta');
      }
    } catch (err) {
      setError('Erro de conexão com o servidor');
    } finally {
      setIsLoading(false);
    }
  };

  const roleConfig = {
    cliente: {
      icon: User,
      color: 'bg-amber-500',
      hoverColor: 'hover:bg-amber-600',
      borderColor: 'border-amber-500',
      textColor: 'text-amber-600',
      title: 'Cliente',
      description: 'Acesso às consultas e serviços esotéricos',
      benefits: ['Consultas por chat e vídeo', 'Créditos de bônus', 'Histórico de consultas', 'Avaliações e feedback']
    },
    consultor: {
      icon: Crown,
      color: 'bg-purple-600',
      hoverColor: 'hover:bg-purple-700',
      borderColor: 'border-purple-600',
      textColor: 'text-purple-600',
      title: 'Consultor',
      description: 'Ofereça seus serviços esotéricos na plataforma',
      benefits: ['Painel de consultoria', 'Gestão de horários', 'Recebimento de pagamentos', 'Sistema de avaliações']
    }
  };

  const currentConfig = roleConfig[selectedRole as keyof typeof roleConfig];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-32 h-24 flex items-center justify-center">
              <img 
                src={logoImage} 
                alt="Conselhos Esotéricos" 
                className="h-24 w-auto"
              />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Conselhos Esotéricos
              </CardTitle>
              <CardDescription className="text-gray-600">
                Junte-se à nossa comunidade espiritual
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-amber-200 bg-amber-50">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                <AlertDescription className="text-amber-800">
                  {success}
                </AlertDescription>
              </Alert>
            )}

            {/* Seleção de Tipo de Conta */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">
                Tipo de Conta
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(roleConfig).map(([role, config]) => {
                  const IconComponent = config.icon;
                  const isSelected = selectedRole === role;
                  
                  return (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                        isSelected
                          ? `${config.color} text-white ${config.borderColor}`
                          : `bg-white text-gray-600 border-gray-200 hover:border-gray-300`
                      }`}
                    >
                      <IconComponent className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-medium">{config.title}</div>
                      <div className="text-xs mt-1 opacity-90">
                        {config.description}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Benefícios do tipo selecionado */}
            <div className={`p-4 rounded-lg border ${currentConfig.borderColor} bg-opacity-5 ${currentConfig.color}`}>
              <h4 className={`font-medium ${currentConfig.textColor} mb-2`}>
                Benefícios como {currentConfig.title}:
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {currentConfig.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle2 className={`w-3 h-3 mr-2 ${currentConfig.textColor}`} />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Seu nome completo"
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  type="text"
                  value={formData.cpf}
                  onChange={(e) => {
                    const cpf = e.target.value.replace(/\D/g, '');
                    const formattedCpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
                    handleInputChange('cpf', formattedCpf);
                  }}
                  placeholder="000.000.000-00"
                  maxLength={14}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  type="text"
                  value={formData.phone}
                  onChange={(e) => {
                    const phone = e.target.value.replace(/\D/g, '');
                    const formattedPhone = phone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
                    handleInputChange('phone', formattedPhone);
                  }}
                  placeholder="(11) 99999-9999"
                  maxLength={15}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Crie uma senha forte"
                    required
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirme sua senha"
                    required
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Campos específicos para consultores */}
              {selectedRole === 'consultor' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Especialidade</Label>
                    <Select value={formData.specialty} onValueChange={(value) => handleInputChange('specialty', value)}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Selecione sua especialidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tarot">Tarot</SelectItem>
                        <SelectItem value="astrologia">Astrologia</SelectItem>
                        <SelectItem value="numerologia">Numerologia</SelectItem>
                        <SelectItem value="mediunidade">Mediunidade</SelectItem>
                        <SelectItem value="runas">Runas</SelectItem>
                        <SelectItem value="oraculos">Oráculos dos Anjos</SelectItem>
                        <SelectItem value="cristaloterapia">Cristaloterapia</SelectItem>
                        <SelectItem value="reiki">Reiki</SelectItem>
                        <SelectItem value="terapia-holistico">Terapia Holística</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Anos de Experiência</Label>
                    <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Selecione sua experiência" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2">1-2 anos</SelectItem>
                        <SelectItem value="3-5">3-5 anos</SelectItem>
                        <SelectItem value="6-10">6-10 anos</SelectItem>
                        <SelectItem value="10+">Mais de 10 anos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição Profissional</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Descreva sua experiência, métodos e abordagem..."
                      rows={4}
                      className="resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pricePerMinute">Preço por Minuto (R$)</Label>
                    <Input
                      id="pricePerMinute"
                      type="number"
                      step="0.50"
                      min="1.00"
                      value={formData.pricePerMinute}
                      onChange={(e) => handleInputChange('pricePerMinute', e.target.value)}
                      placeholder="5.00"
                      required
                      className="h-11"
                    />
                  </div>
                </>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className={`w-full h-11 font-semibold ${currentConfig.color} ${currentConfig.hoverColor} text-white`}
              >
                {isLoading ? 'Criando conta...' : `Criar conta como ${currentConfig.title}`}
              </Button>
            </form>

            {selectedRole === 'consultor' && (
              <div className="text-xs text-gray-500 bg-purple-50 p-3 rounded-lg border border-purple-200">
                <strong>Importante:</strong> Contas de consultor passam por um processo de aprovação. 
                Você receberá um email quando sua conta for ativada.
              </div>
            )}

            <div className="text-center">
              <div className="text-sm text-gray-600">
                Já tem uma conta?{' '}
                <button
                  onClick={() => setLocation('/login')}
                  className="text-blue-800 font-medium hover:underline"
                >
                  Faça login
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cadastro;