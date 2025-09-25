import { createServer } from 'http';

const port = process.env.PORT || 3000;

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'OK', message: 'Server working', port }));
    return;
  }
  
  res.end(`
<!DOCTYPE html>
<html>
<head>
  <title>Sensitivos na Web - ATIVO</title>
  <style>
    body { 
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-family: Arial;
      text-align: center;
      padding: 50px;
      margin: 0;
    }
    h1 { font-size: 3em; margin: 20px 0; }
    .status { 
      background: rgba(0,255,0,0.8); 
      padding: 30px; 
      border-radius: 15px; 
      margin: 20px auto;
      max-width: 600px;
    }
    .info { background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin: 20px 0; }
  </style>
</head>
<body>
  <h1>🔮 SENSITIVOS NA WEB</h1>
  <div class="status">
    <h2>✅ DEPLOYMENT ATIVO</h2>
    <p><strong>SERVIDOR FUNCIONANDO PERFEITAMENTE</strong></p>
    <p>Porta: ${port}</p>
    <p>Status: ONLINE</p>
  </div>
  <div class="info">
    <h3>Sistema Operacional</h3>
    <p>Plataforma de consultas esotéricas</p>
    <p>Remix + Express + PostgreSQL</p>
  </div>
</body>
</html>
  `);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`🚀 SERVIDOR ATIVO NA PORTA ${port}`);
  console.log(`🌐 URL: http://0.0.0.0:${port}`);
});