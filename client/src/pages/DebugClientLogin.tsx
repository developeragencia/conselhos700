import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function DebugClientLogin() {
  const [result, setResult] = useState<any>(null);
  const { login } = useAuth();

  const testClientLogin = async () => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: "cliente@teste.com", 
          password: "123456" 
        }),
      });
      
      const data = await response.json();
      setResult(data);
      
      if (data.success) {
        localStorage.setItem('authToken', data.token);
        window.location.href = '/client-dashboard';
      }
    } catch (error) {
      setResult({ error: error.message });
    }
  };

  return (
    <div className="p-8">
      <h1>Debug Client Login</h1>
      <Button onClick={testClientLogin}>Test Client Login</Button>
      <pre className="mt-4 p-4 bg-gray-100 rounded">
        {JSON.stringify(result, null, 2)}
      </pre>
    </div>
  );
}