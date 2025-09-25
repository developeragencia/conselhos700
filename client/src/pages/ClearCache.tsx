import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ClearCache() {
  const [, setLocation] = useLocation();

  const clearAllCache = () => {
    // Limpar localStorage
    localStorage.clear();
    
    // Limpar sessionStorage
    sessionStorage.clear();
    
    // Limpar cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    
    // Forçar reload
    window.location.href = '/';
  };

  useEffect(() => {
    // Auto-limpar cache ao carregar esta página
    clearAllCache();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <Card className="bg-black/20 backdrop-blur-md border-white/10 max-w-md">
        <CardHeader>
          <CardTitle className="text-white text-center">
            🗑️ Cache Limpo!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-white mb-4">
            Todos os dados em cache foram removidos.
            O sistema foi limpo completamente.
          </p>
          <Button 
            onClick={() => setLocation('/')}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            Voltar ao Início
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}