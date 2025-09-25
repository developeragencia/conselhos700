const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy all requests to Next.js running on port 3000
app.use('/', createProxyMiddleware({
  target: 'http://localhost:3000',
  changeOrigin: true,
  ws: true, // Enable WebSocket proxying for hot reload
}));

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Proxy server running on port ${PORT}, forwarding to Next.js on port 3000`);
});