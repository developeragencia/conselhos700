const http = require('http');
const fs = require('fs');
const path = require('path');

// Simple data - no database dependencies
const appData = {
  consultants: [
    { id: 1, name: "Maria Fernanda", specialty: "Tarot", price_per_minute: "3.50", rating: "4.90", review_count: 245 },
    { id: 2, name: "João Carlos", specialty: "Astrologia", price_per_minute: "4.00", rating: "4.80", review_count: 189 },
    { id: 3, name: "Ana Beatriz", specialty: "Mediunidade", price_per_minute: "3.20", rating: "4.70", review_count: 156 },
    { id: 4, name: "Rafael Santos", specialty: "Numerologia", price_per_minute: "2.80", rating: "4.60", review_count: 98 }
  ],
  testimonials: [
    { id: 1, content: "Consulta incrível! Maria foi muito precisa.", authorName: "Sandra Oliveira", authorLocation: "São Paulo - SP", rating: 5 },
    { id: 2, content: "João fez um mapa astral perfeito. Recomendo!", authorName: "Pedro Lima", authorLocation: "Rio de Janeiro - RJ", rating: 5 },
    { id: 3, content: "Ana tem um dom especial. A consulta foi transformadora!", authorName: "Carla Santos", authorLocation: "Belo Horizonte - MG", rating: 5 }
  ],
  services: [
    { id: 1, name: "Consulta de Tarot Completa", description: "Leitura completa de tarot", category: "tarot", basePrice: "35.00", duration: 45 },
    { id: 2, name: "Mapa Astral Personalizado", description: "Análise astrológica completa", category: "astrologia", basePrice: "50.00", duration: 60 },
    { id: 3, name: "Sessão de Mediunidade", description: "Contato espiritual", category: "mediunidade", basePrice: "40.00", duration: 40 }
  ],
  banners: [
    { id: 1, title: "Consultas Esotéricas Online", subtitle: "Conecte-se com o místico" },
    { id: 2, title: "Tarot e Astrologia", subtitle: "Descubra seu futuro" },
    { id: 3, title: "Orientação Espiritual", subtitle: "Encontre respostas" }
  ]
};

const server = http.createServer((req, res) => {
  // API Routes
  if (req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'OK', timestamp: new Date().toISOString() }));
    return;
  }

  if (req.url === '/api/consultants/featured') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(appData.consultants));
    return;
  }

  if (req.url === '/api/testimonials') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(appData.testimonials));
    return;
  }

  if (req.url === '/api/services') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(appData.services));
    return;
  }

  if (req.url === '/api/banner-slides') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(appData.banners));
    return;
  }

  if (req.url === '/api/blog-posts') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify([
      { id: 1, title: "Como escolher o melhor consultor", slug: "como-escolher", author: "Equipe" }
    ]));
    return;
  }

  // Handle registration
  if (req.url === '/api/test/register' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const { name, email, role } = data;
        
        if (!name || !email) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Dados obrigatórios não fornecidos' }));
          return;
        }
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          user: { id: `user_${Date.now()}`, email, firstName: name.split(' ')[0], role: role || 'cliente' },
          message: role === 'consultor' ? 'Consultor registrado! Aguarde aprovação.' : 'Cliente registrado com sucesso!'
        }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Dados inválidos' }));
      }
    });
    return;
  }

  // 404 for unknown APIs
  if (req.url.startsWith('/api/')) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Endpoint não encontrado' }));
    return;
  }

  // Serve static files
  const publicPath = path.join(__dirname, 'public');
  let filePath = path.join(publicPath, req.url === '/' ? 'index.html' : req.url);
  
  // Security check
  if (!filePath.startsWith(publicPath)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // SPA fallback
      filePath = path.join(publicPath, 'index.html');
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end('Error loading page');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html', 'Cache-Control': 'no-cache' });
          res.end(data);
        }
      });
    } else {
      const ext = path.extname(filePath);
      const contentTypes = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.json': 'application/json'
      };
      
      const contentType = contentTypes[ext] || 'text/plain';
      const cacheControl = ext === '.html' ? 'no-cache' : 'public, max-age=86400';
      
      res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': cacheControl });
      res.end(data);
    }
  });
});

const PORT = process.env.PORT || 5000;
const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

server.listen(PORT, HOST, () => {
  console.log(`Zero-conflict server running on ${HOST}:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down');
  server.close(() => process.exit(0));
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down');
  server.close(() => process.exit(0));
});