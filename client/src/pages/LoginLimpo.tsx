import { useState } from "react";

export default function LoginLimpo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('authToken', data.token);
        
        // Redirecionar baseado no role
        switch (data.user.role) {
          case 'admin':
            window.location.href = '/admin-dashboard';
            break;
          case 'consultor':
            window.location.href = '/consultant-dashboard';
            break;
          case 'cliente':
          default:
            window.location.href = '/client-dashboard';
            break;
        }
      } else {
        setError(data.error || "Erro no login");
      }
    } catch (err) {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '10px'
          }}>
            ✨ Conselhos Esotéricos
          </h1>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Entre na sua conta
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fee2e2',
            color: '#dc2626',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#374151'
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#374151'
            }}>
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              placeholder="Sua senha"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: loading ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {loading ? '⏳ Entrando...' : '🚀 Entrar'}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '1px solid #e5e7eb'
        }}>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '15px' }}>
            Novo aqui?
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <a
              href="/cadastro/cliente"
              style={{
                flex: 1,
                padding: '10px',
                border: '2px solid #667eea',
                color: '#667eea',
                textDecoration: 'none',
                borderRadius: '6px',
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              👤 Cliente
            </a>
            <a
              href="/cadastro/consultor"
              style={{
                flex: 1,
                padding: '10px',
                border: '2px solid #764ba2',
                color: '#764ba2',
                textDecoration: 'none',
                borderRadius: '6px',
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              🔮 Consultor
            </a>
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '20px'
        }}>
          <p style={{ color: '#9ca3af', fontSize: '12px' }}>
            © 2025 Conselhos Esotéricos - Sistema Seguro
          </p>
        </div>
      </div>
    </div>
  );
}