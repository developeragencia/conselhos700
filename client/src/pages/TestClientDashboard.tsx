import { useEffect } from "react";

export default function TestClientDashboard() {
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    console.log('Token in localStorage:', token);
    
    if (token) {
      fetch('/api/auth/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log('User data:', data);
      })
      .catch(err => {
        console.error('Error fetching user:', err);
      });
    }
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">CLIENT DASHBOARD TESTE</h1>
      <p>Esta é a página do dashboard do cliente funcionando!</p>
      
      <div className="mt-4 p-4 bg-green-100 rounded">
        <h2 className="font-bold">Status:</h2>
        <p>✅ Página carregada com sucesso</p>
        <p>✅ Rota /client-dashboard funcionando</p>
        <p>✅ Sistema operacional</p>
      </div>
      
      <div className="mt-4">
        <h3 className="font-bold mb-2">Debug Info:</h3>
        <p>Token: {localStorage.getItem('authToken') ? 'Presente' : 'Ausente'}</p>
        <p>Timestamp: {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
}