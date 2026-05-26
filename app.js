const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/csv' && req.method === 'GET') {
    // Serve o arquivo CSV
    const csvPath = path.join(__dirname, 'dados.csv');
    fs.readFile(csvPath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Arquivo CSV não encontrado');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/csv' });
        res.end(data);
      }
    });
  } else if (req.url === '/media' && req.method === 'GET') {
    // Chama o script Python para calcular a média
    const python = spawn('python3', ['media.py']);
    let result = '';
    python.stdout.on('data', (data) => {
      result += data.toString();
    });
    python.stderr.on('data', (data) => {
      console.error('Erro Python:', data.toString());
    });
    python.on('close', (code) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ media: result.trim() }));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Rota não encontrada');
  }
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
