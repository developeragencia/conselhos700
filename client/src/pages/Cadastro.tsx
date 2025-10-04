import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, User, Crown, CheckCircle2, Sparkles, Moon, Stars } from 'lucide-react';
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
  const [cpfValidation, setCpfValidation] = useState({ checking: false, valid: false, message: '' });
  const [duplicateCheck, setDuplicateCheck] = useState({ cpf: false, email: false, phone: false });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateCPF = async (cpf: string) => {
    const cpfNumbers = cpf.replace(/\D/g, '');
    if (cpfNumbers.length !== 11) {
      setCpfValidation({ checking: false, valid: false, message: '' });
      return;
    }

    setCpfValidation({ checking: true, valid: false, message: 'Verificando...' });

    try {
      const response = await fetch('/api/cpf/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cpf: cpfNumbers })
      });

      const data = await response.json();
      setCpfValidation({
        checking: false,
        valid: data.valid,
        message: data.message
      });

      if (data.valid) {
        checkDuplicates({ cpf: cpfNumbers });
      }
    } catch (err) {
      setCpfValidation({
        checking: false,
        valid: false,
        message: 'Erro ao validar CPF'
      });
    }
  };

  const checkDuplicates = async (fields: { cpf?: string; email?: string; phone?: string }) => {
    try {
      const response = await fetch('/api/auth/check-duplicates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields)
      });

      const data = await response.json();
      setDuplicateCheck(prev => ({
        ...prev,
        ...data.duplicates
      }));
    } catch (err) {
      console.error('Erro ao verificar duplicidade:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

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

    if (!cpfValidation.valid) {
      setError('CPF inválido. Por favor, verifique o número digitado.');
      setIsLoading(false);
      return;
    }

    if (duplicateCheck.cpf) {
      setError('Este CPF já está cadastrado no sistema');
      setIsLoading(false);
      return;
    }

    if (duplicateCheck.email) {
      setError('Este e-mail já está cadastrado no sistema');
      setIsLoading(false);
      return;
    }

    if (duplicateCheck.phone) {
      setError('Este telefone já está cadastrado no sistema');
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
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          cpf: formData.cpf.replace(/\D/g, ''),
          phone: formData.phone.replace(/\D/g, ''),
          role: selectedRole,
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
          localStorage.setItem('authToken', data.token);
          setTimeout(() => {
            setLocation('/client-dashboard');
          }, 2000);
        } else {
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
      color: 'bg-gradient-to-r from-amber-500 to-amber-600',
      hoverColor: 'hover:from-amber-600 hover:to-amber-700',
      borderColor: 'border-amber-500',
      ringColor: 'ring-amber-500/20',
      textColor: 'text-amber-600',
      title: 'Cliente',
      description: 'Acesso às consultas e serviços esotéricos',
      benefits: ['Consultas por chat e vídeo', 'Créditos de bônus', 'Histórico de consultas', 'Avaliações e feedback']
    },
    consultor: {
      icon: Crown,
      color: 'bg-gradient-to-r from-purple-600 to-purple-700',
      hoverColor: 'hover:from-purple-700 hover:to-purple-800',
      borderColor: 'border-purple-600',
      ringColor: 'ring-purple-500/20',
      textColor: 'text-purple-600',
      title: 'Consultor',
      description: 'Ofereça seus serviços esotéricos na plataforma',
      benefits: ['Painel de consultoria', 'Gestão de horários', 'Recebimento de pagamentos', 'Sistema de avaliações']
    }
  };

  const currentConfig = roleConfig[selectedRole as keyof typeof roleConfig];

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      {/* Conteúdo principal */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Logo grande e visível */}
          <div className="text-center mb-8">
            <div className="inline-block bg-white rounded-3xl p-6 mb-6 shadow-2xl border-0">
              <img 
                src={logoImage} 
                alt="Conselhos Esotéricos" 
                className="h-32 w-auto mx-auto"
                data-testid="img-logo-cadastro"
              />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2" data-testid="text-title-cadastro">
              Conselhos Esotéricos
            </h1>
            <p className="text-gray-600 text-lg" data-testid="text-subtitle-cadastro">
              Junte-se à nossa comunidade espiritual
            </p>
          </div>

          {/* Card de Cadastro */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1" data-testid="text-welcome-register">
                Criar sua conta
              </h2>
              <p className="text-gray-600" data-testid="text-register-instruction">
                Preencha seus dados para começar
              </p>
            </div>

            {error && (
              <Alert className="mb-6 bg-red-50 border-red-200" data-testid="alert-error">
                <AlertDescription className="text-red-700">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-6 bg-green-50 border-green-200" data-testid="alert-success">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <AlertDescription className="text-green-700">
                  {success}
                </AlertDescription>
              </Alert>
            )}

            {/* Seleção de Tipo de Conta */}
            <div className="mb-6">
              <Label className="text-sm font-medium text-gray-700 mb-3 block" data-testid="label-account-type">
                Tipo de Conta
              </Label>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(roleConfig).map(([role, config]) => {
                  const IconComponent = config.icon;
                  const isSelected = selectedRole === role;
                  
                  return (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      data-testid={`button-role-${role}`}
                      className={`p-5 rounded-xl border-2 text-center transition-all duration-300 transform hover:scale-105 ${
                        isSelected
                          ? `${config.color} text-white border-gray-300 shadow-lg ring-4 ${config.ringColor}`
                          : `bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300`
                      }`}
                    >
                      <IconComponent className="w-10 h-10 mx-auto mb-3" />
                      <div className="font-semibold text-lg mb-1">{config.title}</div>
                      <div className="text-xs opacity-90">{config.description}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Benefícios do tipo selecionado */}
            <div className={`p-5 rounded-xl border-2 ${currentConfig.borderColor} bg-gray-50 mb-6`}>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Benefícios como {currentConfig.title}:
              </h4>
              <ul className="text-sm text-gray-600 space-y-2">
                {currentConfig.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-3"></div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-gray-700 mb-2 block" data-testid="label-name">
                    Nome Completo
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Seu nome completo"
                    required
                    data-testid="input-name"
                    className="h-11 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-purple-500 transition-all"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-700 mb-2 block" data-testid="label-email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      handleInputChange('email', e.target.value);
                      setDuplicateCheck(prev => ({ ...prev, email: false }));
                    }}
                    onBlur={() => {
                      if (formData.email) {
                        checkDuplicates({ email: formData.email });
                      }
                    }}
                    placeholder="seu@email.com"
                    required
                    data-testid="input-email"
                    className={`h-11 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-purple-500 transition-all ${
                      duplicateCheck.email ? 'border-red-500' : ''
                    }`}
                  />
                  {duplicateCheck.email && (
                    <p className="text-xs text-red-600 mt-1">
                      Este e-mail já está cadastrado no sistema
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="cpf" className="text-gray-700 mb-2 block" data-testid="label-cpf">
                    CPF
                  </Label>
                  <div className="relative">
                    <Input
                      id="cpf"
                      type="text"
                      value={formData.cpf}
                      onChange={(e) => {
                        const cpf = e.target.value.replace(/\D/g, '');
                        const formattedCpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
                        handleInputChange('cpf', formattedCpf);
                        setDuplicateCheck(prev => ({ ...prev, cpf: false }));
                      }}
                      onBlur={() => validateCPF(formData.cpf)}
                      placeholder="000.000.000-00"
                      maxLength={14}
                      required
                      data-testid="input-cpf"
                      className={`h-11 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-purple-500 pr-12 transition-all ${
                        cpfValidation.valid ? 'border-green-500' : 
                        cpfValidation.message && !cpfValidation.valid && !cpfValidation.checking ? 'border-red-500' : ''
                      } ${duplicateCheck.cpf ? 'border-red-500' : ''}`}
                    />
                    {cpfValidation.checking && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="animate-spin w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full"></div>
                      </div>
                    )}
                    {cpfValidation.valid && !duplicateCheck.cpf && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  {cpfValidation.message && (
                    <p className={`text-xs mt-1 ${cpfValidation.valid ? 'text-green-600' : 'text-red-600'}`}>
                      {cpfValidation.message}
                    </p>
                  )}
                  {duplicateCheck.cpf && (
                    <p className="text-xs text-red-600 mt-1">
                      Este CPF já está cadastrado no sistema
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-700 mb-2 block" data-testid="label-phone">
                    Telefone
                  </Label>
                  <Input
                    id="phone"
                    type="text"
                    value={formData.phone}
                    onChange={(e) => {
                      const phone = e.target.value.replace(/\D/g, '');
                      const formattedPhone = phone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
                      handleInputChange('phone', formattedPhone);
                      setDuplicateCheck(prev => ({ ...prev, phone: false }));
                    }}
                    onBlur={() => {
                      const phoneNumbers = formData.phone.replace(/\D/g, '');
                      if (phoneNumbers.length >= 10) {
                        checkDuplicates({ phone: phoneNumbers });
                      }
                    }}
                    placeholder="(11) 99999-9999"
                    maxLength={15}
                    required
                    data-testid="input-phone"
                    className={`h-11 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-purple-500 transition-all ${
                      duplicateCheck.phone ? 'border-red-500' : ''
                    }`}
                  />
                  {duplicateCheck.phone && (
                    <p className="text-xs text-red-600 mt-1">
                      Este telefone já está cadastrado no sistema
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password" className="text-gray-700 mb-2 block" data-testid="label-password">
                    Senha
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Crie uma senha forte"
                      required
                      data-testid="input-password"
                      className="h-11 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-purple-500 pr-12 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      data-testid="button-toggle-password"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-gray-700 mb-2 block" data-testid="label-confirm-password">
                    Confirmar Senha
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="Confirme sua senha"
                      required
                      data-testid="input-confirm-password"
                      className="h-11 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-purple-500 pr-12 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      data-testid="button-toggle-confirm-password"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Campos específicos para consultores */}
              {selectedRole === 'consultor' && (
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Crown className="w-5 h-5 mr-2" />
                    Informações Profissionais
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="specialty" className="text-gray-700 mb-2 block" data-testid="label-specialty">
                        Especialidade
                      </Label>
                      <Select value={formData.specialty} onValueChange={(value) => handleInputChange('specialty', value)}>
                        <SelectTrigger className="h-11 bg-white border-gray-300 text-gray-900 focus:bg-white focus:border-purple-500" data-testid="select-specialty">
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

                    <div>
                      <Label htmlFor="experience" className="text-gray-700 mb-2 block" data-testid="label-experience">
                        Anos de Experiência
                      </Label>
                      <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                        <SelectTrigger className="h-11 bg-white border-gray-300 text-gray-900 focus:bg-white focus:border-purple-500" data-testid="select-experience">
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

                    <div className="md:col-span-2">
                      <Label htmlFor="description" className="text-gray-700 mb-2 block" data-testid="label-description">
                        Descrição Profissional
                      </Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Descreva sua experiência, métodos e abordagem..."
                        rows={4}
                        data-testid="textarea-description"
                        className="resize-none bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="pricePerMinute" className="text-gray-700 mb-2 block" data-testid="label-price">
                        Preço por Minuto (R$)
                      </Label>
                      <Input
                        id="pricePerMinute"
                        type="number"
                        step="0.50"
                        min="1.00"
                        value={formData.pricePerMinute}
                        onChange={(e) => handleInputChange('pricePerMinute', e.target.value)}
                        placeholder="5.00"
                        required
                        data-testid="input-price"
                        className="h-11 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                data-testid="button-submit"
                className={`w-full h-12 font-semibold text-white shadow-lg transform transition-all duration-300 hover:scale-105 ${currentConfig.color} ${currentConfig.hoverColor} mt-6`}
              >
                {isLoading ? 'Criando conta...' : `Criar conta como ${currentConfig.title}`}
              </Button>
            </form>

            {selectedRole === 'consultor' && (
              <div className="mt-6 text-xs text-purple-700 bg-purple-50 p-4 rounded-lg border border-purple-200" data-testid="text-consultant-notice">
                <strong className="text-purple-900">Importante:</strong> Contas de consultor passam por um processo de aprovação. 
                Você receberá um email quando sua conta for ativada.
              </div>
            )}

            <div className="mt-6 text-center">
              <div className="text-sm text-gray-600">
                Já tem uma conta?{' '}
                <button
                  onClick={() => setLocation('/login')}
                  data-testid="link-login"
                  className="text-purple-600 font-semibold hover:text-purple-700 transition-colors underline decoration-2 underline-offset-2"
                >
                  Fazer login
                </button>
              </div>
            </div>
          </div>

          {/* Rodapé */}
          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm" data-testid="text-footer">
              © 2024 Conselhos Esotéricos. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
