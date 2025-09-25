import React, { useState } from 'react';

export default function DebugLogin() {
  const [result, setResult] = useState<any>(null);

  const testLogin = async () => {
    try {
      // Limpar todo o localStorage primeiro
      localStorage.clear();
      sessionStorage.clear();

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: 'alexmoura-2015@hotmail.com', 
          password: '123456', 
          role: 'client' 
        }),
      });

      const data = await response.json();
      setResult(data);

      if (data.success) {
        localStorage.setItem('token', data.token);
        // Redirecionar para o dashboard
        setTimeout(() => {
          window.location.href = '/client-dashboard';
        }, 2000);
      }
    } catch (error) {
      setResult({ error: error.message });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Debug Login - Alex</h1>
        
        <button 
          onClick={testLogin}
          className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 mb-4"
        >
          Login como Alex Developer
        </button>

        {result && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-bold mb-2">Resultado:</h3>
            <pre className="text-sm overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}