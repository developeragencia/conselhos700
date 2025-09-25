import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Eye, EyeOff, Lock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";

export default function ForgotPassword() {
  const [step, setStep] = useState<'email' | 'cpf' | 'newPassword' | 'success'>('email');
  const [email, setEmail] = useState('');
  const [cpfDigits, setCpfDigits] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cpfInfo, setCpfInfo] = useState<{digits: string, type: 'first' | 'last'} | null>(null);
  const { toast } = useToast();

  const validateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Por favor, informe seu e-mail');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (data.success) {
        setCpfInfo(data.cpfInfo);
        setStep('cpf');
      } else {
        setError(data.message || 'E-mail não encontrado');
      }
    } catch (err: any) {
      setError('Erro ao verificar e-mail. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const validateCpfDigits = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cpfDigits || cpfDigits.length !== 3) {
      setError('Por favor, informe os 3 dígitos do CPF');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/verify-cpf-digits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          digits: cpfDigits,
          type: cpfInfo?.type 
        })
      });

      const data = await response.json();

      if (data.success) {
        setStep('newPassword');
      } else {
        setError('Dígitos do CPF incorretos. Tente novamente.');
      }
    } catch (err: any) {
      setError('Erro ao verificar CPF. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          newPassword 
        })
      });

      const data = await response.json();

      if (data.success) {
        setStep('success');
        toast({
          title: "Senha alterada com sucesso!",
          description: "Você já pode fazer login com sua nova senha.",
        });
      } else {
        setError(data.message || 'Erro ao alterar senha');
      }
    } catch (err: any) {
      setError('Erro ao alterar senha. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-gold-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
            <Lock className="w-10 h-10 text-purple-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-purple-800">
            Recuperar Senha
          </CardTitle>
          <CardDescription>
            {step === 'email' && 'Informe seu e-mail para recuperar a senha'}
            {step === 'cpf' && 'Confirme sua identidade'}
            {step === 'newPassword' && 'Defina sua nova senha'}
            {step === 'success' && 'Senha alterada com sucesso!'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {step === 'email' && (
            <form onSubmit={validateEmail} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Verificando...' : 'Continuar'}
              </Button>
            </form>
          )}

          {step === 'cpf' && cpfInfo && (
            <form onSubmit={validateCpfDigits} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cpfDigits">
                  Digite os {cpfInfo.type === 'first' ? 'primeiros' : 'últimos'} 3 dígitos do seu CPF
                </Label>
                <div className="text-sm text-gray-600 mb-2">
                  CPF: {cpfInfo.type === 'first' ? '___' : '***.***.***-'}{cpfInfo.digits}
                </div>
                <Input
                  id="cpfDigits"
                  type="text"
                  value={cpfDigits}
                  onChange={(e) => setCpfDigits(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  placeholder="123"
                  maxLength={3}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Verificando...' : 'Confirmar'}
              </Button>
            </form>
          )}

          {step === 'newPassword' && (
            <form onSubmit={resetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword">Nova Senha</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirme a senha"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Alterando...' : 'Alterar Senha'}
              </Button>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-green-600 font-medium">
                Sua senha foi alterada com sucesso!
              </p>
              <Link href="/login">
                <Button className="w-full">
                  Fazer Login
                </Button>
              </Link>
            </div>
          )}

          <div className="text-center pt-4">
            <Link href="/login" className="text-sm text-purple-600 hover:underline">
              Voltar para o login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}