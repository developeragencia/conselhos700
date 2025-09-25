import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'cliente' | 'consultor' | 'admin';
  credits: string;
  bonusCredits: string;
  phone?: string;
  cpf?: string;
  profileImageUrl?: string;
  isVerified: boolean;
  createdAt: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'cliente' | 'consultor';
  phone?: string;
  cpf?: string;
}

export function useAuth() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  // Verificar se usuário está autenticado
  const { data: user, isLoading } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!localStorage.getItem('authToken'),
  });

  // Mutation para login
  const loginMutation = useMutation({
    mutationFn: async (data: LoginData) => {
      console.log('Fazendo login com:', data);
      
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log('Resposta do login:', result);
      
      if (!response.ok || !result.success) {
        throw new Error(result.error || result.message || 'Erro no login');
      }

      return result;
    },
    onSuccess: (data) => {
      // Salvar token no localStorage
      localStorage.setItem('authToken', data.token);
      
      // Configurar dados do usuário no cache
      queryClient.setQueryData(["/api/auth/user"], data.user);
      
      // Forçar atualização da query
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      
      // Redirecionar baseado no role
      console.log('Login successful, redirecting user with role:', data.user.role);
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
    },
  });

  // Mutation para registro
  const registerMutation = useMutation({
    mutationFn: async (data: RegisterData) => {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Erro no cadastro');
      }

      return result;
    },
    onSuccess: (data) => {
      // Salvar token no localStorage
      localStorage.setItem('authToken', data.token);
      
      // Configurar header de autenticação
      queryClient.setQueryData(["/api/auth/user"], data.user);
      
      // Redirecionar baseado no role
      switch (data.user.role) {
        case 'consultor':
          setLocation('/consultant-dashboard');
          break;
        case 'cliente':
        default:
          setLocation('/client-dashboard');
          break;
      }
    },
  });

  // Mutation para logout
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem('authToken');
      
      if (token) {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json" 
          },
        });
      }
    },
    onSettled: () => {
      // Limpar token e cache
      localStorage.removeItem('authToken');
      queryClient.setQueryData(["/api/auth/user"], null);
      queryClient.clear();
      
      // Redirecionar para home
      setLocation('/');
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    loginError: loginMutation.error?.message,
    registerError: registerMutation.error?.message,
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
    isLogoutLoading: logoutMutation.isPending,
  };
}