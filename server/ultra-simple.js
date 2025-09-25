const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', port: process.env.PORT });
});

app.get('/api/consultants/featured', (req, res) => {
  res.json([
    { id: 1, name: "Maria Fernanda", specialty: "Tarot", price_per_minute: "3.50" },
    { id: 2, name: "João Carlos", specialty: "Astrologia", price_per_minute: "4.00" }
  ]);
});

app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Ultra simple server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

process.on('SIGTERM', () => process.exit(0));
process.on('SIGINT', () => process.exit(0));