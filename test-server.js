const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  
  if (req.url === '/api/health') {
    res.end(JSON.stringify({ status: 'OK', port: process.env.PORT }));
  } else if (req.url === '/api/consultants/featured') {
    res.end(JSON.stringify([{ id: 1, name: "Test Consultant" }]));
  } else {
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Test server running on port ${PORT}`);
});

process.on('SIGTERM', () => server.close());
process.on('SIGINT', () => server.close());