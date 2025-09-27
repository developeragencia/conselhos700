import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, User, Crown, Shield } from 'lucide-react';
import logoImage from "@assets/CONSELHOS_20250521_110746_0000_1754078656294.png";

const Login = () => {
  const [, setLocation] = useLocation();
  const [selectedRole, setSelectedRole] = useState('cliente');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          role: selectedRole,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('authToken', data.token);
        
        // Redirecionar baseado no role
        switch (data.user.role) {
          case 'admin':
            setLocation('/admin-dashboard');
            break;
          case 'consultor':
            setLocation('/consultant-dashboard');
            break;
          case 'cliente':
          default:
            setLocation('/client-dashboard');
            break;
        }
      } else {
        setError(data.error || 'Credenciais inválidas');
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
      description: 'Acesso às consultas e serviços'
    },
    consultor: {
      icon: Crown,
      color: 'bg-purple-600',
      hoverColor: 'hover:bg-purple-700',
      borderColor: 'border-purple-600',
      textColor: 'text-purple-600',
      title: 'Consultor',
      description: 'Painel do consultor esotérico'
    },
    admin: {
      icon: Shield,
      color: 'bg-blue-800',
      hoverColor: 'hover:bg-blue-900',
      borderColor: 'border-blue-800',
      textColor: 'text-blue-800',
      title: 'Administrador',
      description: 'Painel administrativo'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
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
                Bem-vindo de volta! Faça login na sua conta
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

            {/* Seleção de Tipo de Usuário */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">
                Tipo de Acesso
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(roleConfig).map(([role, config]) => {
                  const IconComponent = config.icon;
                  const isSelected = selectedRole === role;
                  
                  return (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      className={`p-3 rounded-xl border-2 text-center transition-all duration-200 ${
                        isSelected
                          ? `${config.color} text-white ${config.borderColor}`
                          : `bg-white text-gray-600 border-gray-200 hover:border-gray-300 ${config.hoverColor} hover:text-white`
                      }`}
                    >
                      <IconComponent className="w-6 h-6 mx-auto mb-1" />
                      <div className="text-xs font-medium">{config.title}</div>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-gray-500 text-center">
                {roleConfig[selectedRole as keyof typeof roleConfig].description}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Sua senha"
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

              <Button
                type="submit"
                disabled={isLoading}
                className={`w-full h-11 font-semibold ${roleConfig[selectedRole as keyof typeof roleConfig].color} ${roleConfig[selectedRole as keyof typeof roleConfig].hoverColor} text-white`}
              >
                {isLoading ? 'Entrando...' : `Entrar como ${roleConfig[selectedRole as keyof typeof roleConfig].title}`}
              </Button>
            </form>

            <div className="text-center space-y-2">
              <button className="text-sm text-gray-500 hover:text-gray-700">
                Esqueceu sua senha?
              </button>
              <div className="text-sm text-gray-600">
                Não tem uma conta?{' '}
                <button
                  onClick={() => setLocation('/cadastro')}
                  className="text-amber-600 font-medium hover:underline"
                >
                  Cadastre-se
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;