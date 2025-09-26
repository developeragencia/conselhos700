import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, User, Crown, Shield } from 'lucide-react';
import logoImage from "@assets/CONSELHOS_20250521_110746_0000_1753966138984.png";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-amber-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="rounded-3xl shadow-2xl border-0 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 p-8 transition-all duration-300" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}>
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-32 h-24 flex items-center justify-center">
              <img 
                src={logoImage} 
                alt="Conselhos Esotéricos" 
                className="h-24 w-auto drop-shadow-lg animate-fade-in"
              />
            </div>
            <div>
              <CardTitle className="text-3xl font-extrabold text-purple-800 dark:text-purple-300 tracking-tight">
                Conselhos Esotéricos
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 dark:text-gray-400">
                Bem-vindo de volta! Faça login na sua conta
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            {error && (
              <Alert className="border-red-200 bg-red-50 dark:bg-red-900/30 animate-shake">
                <AlertDescription className="text-red-800 dark:text-red-300">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Seleção de Tipo de Usuário */}
            <div className="space-y-3">
              <Label className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-2 block">
                Tipo de Acesso
              </Label>
              <div className="flex justify-center gap-6 mb-2">
                {Object.entries(roleConfig).map(([role, config]) => {
                  const IconComponent = config.icon;
                  const isSelected = selectedRole === role;
                  return (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      className={`flex flex-col items-center justify-center px-6 py-4 rounded-2xl border-2 transition-all duration-200 shadow-md focus:outline-none ${
                        isSelected
                          ? `${config.color} text-white ${config.borderColor} scale-105 shadow-lg`
                          : `bg-white text-gray-600 border-gray-200 hover:border-gray-300 ${config.hoverColor} hover:text-white hover:scale-105`
                      }`}
                      style={{ minWidth: 120, boxShadow: isSelected ? '0 4px 16px 0 rgba(156, 39, 176, 0.10)' : undefined }}
                    >
                      <IconComponent className="w-8 h-8 mb-2 animate-fade-in" />
                      <span className="text-base font-bold mb-1">{config.title}</span>
                      <span className="text-xs text-gray-100 dark:text-gray-200 opacity-80 font-normal">
                        {config.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-semibold">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="h-12 text-lg px-4"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-base font-semibold">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Sua senha"
                    required
                    className="h-12 pr-12 text-lg px-4"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className={`w-full h-12 text-lg font-bold rounded-xl shadow-md ${roleConfig[selectedRole as keyof typeof roleConfig].color} ${roleConfig[selectedRole as keyof typeof roleConfig].hoverColor} text-white transition-all duration-200`}
              >
                {isLoading ? 'Entrando...' : `Entrar como ${roleConfig[selectedRole as keyof typeof roleConfig].title}`}
              </Button>
            </form>

            <div className="text-center space-y-2 mt-4">
              <button className="text-sm text-purple-600 hover:text-purple-800 font-medium transition-all duration-200">
                Esqueceu sua senha?
              </button>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Não tem uma conta?{' '}
                <button
                  onClick={() => setLocation('/cadastro')}
                  className="text-amber-600 font-bold hover:underline"
                >
                  Cadastre-se
                </button>
              </div>
            </div>
          </CardContent>
        </div>
      </div>
    </div>
  );
};

export default Login;