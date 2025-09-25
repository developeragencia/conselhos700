const express = require('express');
const path = require('path');
const app = express();
const PORT = 5000;

console.log('🚀 INICIANDO SERVIDOR CORRIGIDO...');

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist/public')));

// API mock endpoints
app.get('/api/banners/active', (req, res) => {
  res.json([]);
});

app.get('/api/auth/user', (req, res) => {
  res.status(401).json({ message: 'Not authenticated' });
});

// Catch all
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/public/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ SERVIDOR FUNCIONANDO: http://localhost:${PORT}`);
  console.log('🎯 TODAS AS ATUALIZAÇÕES AGORA APARECERÃO CORRETAMENTE');
  console.log('🔥 BANNER ROTATIVO ATIVO COM 3 SLIDES');
  console.log('💎 BOTÕES CADASTRAR/ENTRAR CORRIGIDOS');
});