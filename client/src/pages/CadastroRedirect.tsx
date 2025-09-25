import React, { useEffect } from 'react';
import { useLocation } from 'wouter';

export default function CadastroRedirect() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Redireciona imediatamente para o novo sistema de cadastro
    setLocation('/cadastro-novo');
  }, [setLocation]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-orange-50">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-purple-600 font-medium">Redirecionando para o novo sistema de cadastro...</p>
      </div>
    </div>
  );
}