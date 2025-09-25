import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Crown, Shield, Search, Check, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

interface UserData {
  nome: string;
  cpf: string;
  nascimento?: string;
  situacao?: string;
}

export default function CadastroNovo() {
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<'cliente' | 'consultor'>('cliente');
  const [cpf, setCpf] = useState('');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    specialties: [] as string[],
    description: '',
    hourlyRate: ''
  });

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const searchCPF = async () => {
    if (cpf.replace(/\D/g, '').length !== 11) {
      setError('CPF deve ter 11 dígitos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('🔍 Buscando dados do CPF:', cpf);
      
      // Usar API pública da Receita Federal ou serviço similar
      const response = await fetch(`/api/cpf/consulta`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cpf: cpf.replace(/\D/g, '') })
      });

      if (!response.ok) {
        throw new Error('Erro ao consultar CPF');
      }

      const data = await response.json();
      
      if (data.success) {
        setUserData(data.data);
        setStep(3);
      } else {
        setError(data.message || 'CPF não encontrado ou inválido');
      }
    } catch (err) {
      console.error('Erro na consulta:', err);
      setError('Erro ao consultar dados. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Senhas não coincidem');
      return;
    }

    if (!formData.email || !formData.password || !formData.phone) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const registerData = {
        name: userData?.nome || 'Nome não encontrado',
        email: formData.email,
        password: formData.password,
        role: accountType,
        cpf: cpf.replace(/\D/g, ''),
        phone: formData.phone,
        ...(accountType === 'consultor' && {
          specialties: formData.specialties,
          description: formData.description,
          hourlyRate: parseFloat(formData.hourlyRate) || 0
        })
      };

      console.log('🚀 CADASTRO ENVIANDO PARA:', '/api/auth/register');
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStep(4);
      } else {
        throw new Error(result.message || 'Erro no cadastro');
      }
    } catch (err: any) {
      console.error('Erro no cadastro:', err);
      setError(err.message || 'Erro ao finalizar cadastro');
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-purple-800 dark:text-purple-300">
          Escolha o Tipo de Conta
        </CardTitle>
        <CardDescription>
          Selecione como você deseja usar nossa plataforma
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className={`border-2 rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg ${
              accountType === 'cliente'
                ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
            }`}
            onClick={() => setAccountType('cliente')}
          >
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400">Cliente</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Acesso a consultas e serviços esotéricos
                </p>
              </div>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Consultas por chat e vídeo</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Créditos de bônus</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Histórico de consultas</span>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`border-2 rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg ${
              accountType === 'consultor'
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
            }`}
            onClick={() => setAccountType('consultor')}
          >
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400">Consultor</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Ofereça seus serviços esotéricos na plataforma
                </p>
              </div>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Perfil profissional</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Defina seus horários</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Receba pagamentos</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button 
          onClick={() => setStep(2)} 
          className="w-full bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600"
          size="lg"
        >
          Continuar
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-purple-800 dark:text-purple-300">
          Consulta CPF
        </CardTitle>
        <CardDescription>
          Digite seu CPF para buscar seus dados automaticamente
        </CardDescription>
        <Badge variant="outline" className="mx-auto">
          {accountType === 'cliente' ? 'Cliente' : 'Consultor'}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="cpf">CPF</Label>
          <Input
            id="cpf"
            type="text"
            placeholder="000.000.000-00"
            value={cpf}
            onChange={(e) => setCpf(formatCPF(e.target.value))}
            maxLength={14}
            className="text-center text-lg"
          />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button 
          onClick={searchCPF} 
          disabled={loading || cpf.replace(/\D/g, '').length !== 11}
          className="w-full bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600"
          size="lg"
        >
          {loading ? (
            <>
              <Search className="w-4 h-4 mr-2 animate-spin" />
              Consultando...
            </>
          ) : (
            <>
              <Search className="w-4 h-4 mr-2" />
              Buscar Dados
            </>
          )}
        </Button>

        <div className="text-center">
          <Button variant="ghost" onClick={() => setStep(1)}>
            Voltar
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-purple-800 dark:text-purple-300">
          Finalizar Cadastro
        </CardTitle>
        <CardDescription>
          Complete seus dados para finalizar
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {userData && (
          <Alert>
            <Check className="w-4 h-4" />
            <AlertDescription>
              <strong>Dados encontrados:</strong> {userData.nome}
              <br />
              <strong>CPF:</strong> {formatCPF(userData.cpf)}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="seu@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="(11) 99999-9999"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha *</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              placeholder="Repita a senha"
            />
          </div>
        </div>

        {accountType === 'consultor' && (
          <div className="space-y-4 border-t pt-6">
            <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300">
              Dados Profissionais
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descrição Profissional</Label>
              <textarea
                id="description"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descreva sua experiência e especialidades..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Valor por Hora (R$)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData(prev => ({ ...prev, hourlyRate: e.target.value }))}
                  placeholder="50.00"
                />
              </div>
            </div>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex gap-4">
          <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
            Voltar
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600"
          >
            {loading ? 'Cadastrando...' : 'Finalizar Cadastro'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep4 = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6 text-center space-y-6">
        <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
            Cadastro Realizado!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Sua conta foi criada com sucesso
          </p>
        </div>
        <Link href="/login">
          <Button className="w-full bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600">
            Fazer Login
          </Button>
        </Link>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <Link href="/">
            <img 
              src="/logo.png" 
              alt="Conselhos Esotéricos" 
              className="h-16 mx-auto mb-4"
            />
          </Link>
          <h1 className="text-3xl font-bold text-purple-800 dark:text-purple-300">
            Criar Nova Conta
          </h1>
          
          <div className="flex justify-center mt-6">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    stepNum <= step 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {stepNum < step ? <Check className="w-4 h-4" /> : stepNum}
                  </div>
                  {stepNum < 4 && (
                    <div className={`w-12 h-1 mx-2 ${
                      stepNum < step ? 'bg-purple-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}

        <div className="text-center mt-8">
          <p className="text-gray-600 dark:text-gray-400">
            Já tem uma conta?{' '}
            <Link href="/login" className="text-purple-600 hover:underline">
              Fazer Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}