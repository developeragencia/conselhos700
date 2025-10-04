import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, User, Crown, Shield, Sparkles, Moon, Stars } from 'lucide-react';
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
      color: 'bg-gradient-to-r from-amber-500 to-amber-600',
      hoverColor: 'hover:from-amber-600 hover:to-amber-700',
      borderColor: 'border-amber-500',
      ringColor: 'ring-amber-500/20',
      textColor: 'text-amber-600',
      title: 'Cliente',
      description: 'Acesso às consultas e serviços'
    },
    consultor: {
      icon: Crown,
      color: 'bg-gradient-to-r from-purple-600 to-purple-700',
      hoverColor: 'hover:from-purple-700 hover:to-purple-800',
      borderColor: 'border-purple-600',
      ringColor: 'ring-purple-500/20',
      textColor: 'text-purple-600',
      title: 'Consultor',
      description: 'Painel do consultor esotérico'
    },
    admin: {
      icon: Shield,
      color: 'bg-gradient-to-r from-blue-800 to-blue-900',
      hoverColor: 'hover:from-blue-900 hover:to-blue-950',
      borderColor: 'border-blue-800',
      ringColor: 'ring-blue-500/20',
      textColor: 'text-blue-800',
      title: 'Administrador',
      description: 'Painel administrativo'
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-950">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl"></div>
        
        {/* Estrelas decorativas */}
        <Sparkles className="absolute top-20 right-20 w-8 h-8 text-amber-400/40 animate-pulse" />
        <Moon className="absolute bottom-32 left-20 w-12 h-12 text-purple-300/30 animate-pulse" />
        <Stars className="absolute top-40 left-1/4 w-6 h-6 text-blue-300/40 animate-pulse" />
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo grande e visível */}
          <div className="text-center mb-8">
            <div className="inline-block bg-white/10 backdrop-blur-xl rounded-3xl p-6 mb-6 shadow-2xl border border-white/20">
              <img 
                src={logoImage} 
                alt="Conselhos Esotéricos" 
                className="h-32 w-auto mx-auto"
                data-testid="img-logo-login"
              />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2" data-testid="text-title-login">
              Conselhos Esotéricos
            </h1>
            <p className="text-purple-200/80 text-lg" data-testid="text-subtitle-login">
              Portal de Consultas Místicas
            </p>
          </div>

          {/* Card de Login */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-1" data-testid="text-welcome">
                Bem-vindo de volta
              </h2>
              <p className="text-purple-200/70" data-testid="text-login-instruction">
                Faça login para acessar sua conta
              </p>
            </div>

            {error && (
              <Alert className="mb-6 bg-red-500/20 border-red-500/50 backdrop-blur-sm" data-testid="alert-error">
                <AlertDescription className="text-red-200">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Seleção de Tipo de Usuário */}
            <div className="mb-6">
              <Label className="text-sm font-medium text-purple-200 mb-3 block" data-testid="label-role">
                Tipo de Acesso
              </Label>
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(roleConfig).map(([role, config]) => {
                  const IconComponent = config.icon;
                  const isSelected = selectedRole === role;
                  
                  return (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      data-testid={`button-role-${role}`}
                      className={`p-4 rounded-xl border-2 text-center transition-all duration-300 transform hover:scale-105 ${
                        isSelected
                          ? `${config.color} text-white border-white/30 shadow-lg ring-4 ${config.ringColor}`
                          : `bg-white/5 text-purple-200 border-white/20 hover:bg-white/10 hover:border-white/30`
                      }`}
                    >
                      <IconComponent className="w-7 h-7 mx-auto mb-2" />
                      <div className="text-xs font-semibold">{config.title}</div>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-purple-200/60 text-center mt-3" data-testid="text-role-description">
                {roleConfig[selectedRole as keyof typeof roleConfig].description}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="email" className="text-purple-200 mb-2 block" data-testid="label-email">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  data-testid="input-email"
                  className="h-12 bg-white/10 border-white/30 text-white placeholder:text-purple-200/50 focus:bg-white/20 focus:border-white/50 transition-all"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-purple-200 mb-2 block" data-testid="label-password">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Sua senha"
                    required
                    data-testid="input-password"
                    className="h-12 bg-white/10 border-white/30 text-white placeholder:text-purple-200/50 focus:bg-white/20 focus:border-white/50 pr-12 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    data-testid="button-toggle-password"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-200/60 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                data-testid="button-submit"
                className={`w-full h-12 font-semibold text-white shadow-lg transform transition-all duration-300 hover:scale-105 ${roleConfig[selectedRole as keyof typeof roleConfig].color} ${roleConfig[selectedRole as keyof typeof roleConfig].hoverColor}`}
              >
                {isLoading ? 'Entrando...' : `Entrar como ${roleConfig[selectedRole as keyof typeof roleConfig].title}`}
              </Button>
            </form>

            <div className="mt-6 space-y-3 text-center">
              <button 
                onClick={() => setLocation('/forgot-password')}
                className="text-sm text-purple-200/70 hover:text-white transition-colors"
                data-testid="link-forgot-password"
              >
                Esqueceu sua senha?
              </button>
              <div className="text-sm text-purple-200/80">
                Não tem uma conta?{' '}
                <button
                  onClick={() => setLocation('/cadastro')}
                  data-testid="link-register"
                  className="text-amber-400 font-semibold hover:text-amber-300 transition-colors underline decoration-2 underline-offset-2"
                >
                  Cadastre-se agora
                </button>
              </div>
            </div>
          </div>

          {/* Rodapé */}
          <div className="text-center mt-6">
            <p className="text-purple-200/50 text-sm" data-testid="text-footer">
              © 2024 Conselhos Esotéricos. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
