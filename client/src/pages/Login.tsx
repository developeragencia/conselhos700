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
    // ...existing code...
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, role }),
          });
          const data = await response.json();
          if (data.success) {
            localStorage.setItem('authToken', data.token);
            setLocation(role === 'consultor' ? '/consultant-dashboard' : '/client-dashboard');
          } else {
            setError(data.error || 'Credenciais inválidas');
          }
        } catch (err) {
          setError('Erro de conexão com o servidor');
        } finally {
          setIsLoading(false);
        }
      };

      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <Card className="shadow-xl border-0">
              <CardHeader className="text-center space-y-4">
                <div className="mx-auto w-20 h-20 flex items-center justify-center">
                  <img src={logoImage} alt="Conselhos Esotéricos" className="h-20 w-auto" />
                </div>
                <CardTitle className="text-2xl font-bold text-purple-800">Conselhos Esotéricos</CardTitle>
                <CardDescription className="text-gray-600">Bem-vindo! Faça login na sua conta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-800">{error}</AlertDescription>
                  </Alert>
                )}
                <div className="flex justify-center gap-4 mb-4">
                  <button
                    type="button"
                    className={`flex flex-col items-center px-4 py-2 rounded-xl border-2 transition-all duration-200 ${role === 'cliente' ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'}`}
                    onClick={() => setRole('cliente')}
                  >
                    <User className="w-6 h-6 mb-1" />
                    <span className="text-xs font-medium">Cliente</span>
                  </button>
                  <button
                    type="button"
                    className={`flex flex-col items-center px-4 py-2 rounded-xl border-2 transition-all duration-200 ${role === 'consultor' ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300'}`}
                    onClick={() => setRole('consultor')}
                  >
                    <Crown className="w-6 h-6 mb-1" />
                    <span className="text-xs font-medium">Consultor</span>
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" required className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <div className="relative">
                      <Input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Sua senha" required className="h-11 pr-10" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <Button type="submit" disabled={isLoading} className={`w-full h-11 font-semibold ${role === 'cliente' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-purple-600 hover:bg-purple-700'} text-white`}>
                    {isLoading ? 'Entrando...' : `Entrar como ${role === 'cliente' ? 'Cliente' : 'Consultor'}`}
                  </Button>
                </form>
                <div className="text-center mt-4">
                  <span className="text-sm text-gray-600">Não tem uma conta? </span>
                  <button type="button" onClick={() => setLocation('/cadastro')} className="text-purple-600 font-medium hover:underline">Cadastre-se</button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    };

// ...existing code...