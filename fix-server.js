const express = require('express');
const path = require('path');
const app = express();
const PORT = 5000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'client/dist/assets')));

// API endpoint para banners (mock data)
app.get('/api/banners/active', (req, res) => {
  res.json([]);
});

// Catch all handler - serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 SERVIDOR FUNCIONANDO: http://localhost:${PORT}`);
  console.log('✅ SISTEMA CORRIGIDO E OPERACIONAL');
});