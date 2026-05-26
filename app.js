
// Importa o módulo 'http' do Node.js, que permite criar um servidor web.
const http = require('http');

// Importa a função 'spawn' do módulo 'child_process', usada para rodar comandos externos (como Python).
const { spawn } = require('child_process');

// Importa o módulo 'fs' (file system), que serve para ler e manipular arquivos.
const fs = require('fs');

// Importa o módulo 'path', que ajuda a montar caminhos de arquivos de forma segura.
const path = require('path');

// Define a porta do servidor. Se existir uma variável de ambiente PORT (usada por serviços como Render), usa ela. Senão, usa 3000.
const PORT = process.env.PORT || 3000;

// Cria o servidor web. Toda vez que alguém acessa o site, essa função é chamada.
const server = http.createServer((req, res) => {
    // Se a pessoa acessar a página principal ("/" ou "/index.html") com método GET:
    if ((req.url === '/' || req.url === '/index.html') && req.method === 'GET') {
        // Monta o caminho do arquivo index.html
        const htmlPath = path.join(__dirname, 'index.html');
        // Lê o arquivo index.html
        fs.readFile(htmlPath, (err, data) => {
            if (err) {
                // Se não encontrar o arquivo, responde com erro 404
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('index.html não encontrado');
            } else {
                // Se encontrar, responde com o conteúdo HTML
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
        // Se a pessoa acessar "/csv" com método GET:
    } else if (req.url === '/csv' && req.method === 'GET') {
        // Monta o caminho do arquivo dados.csv
        const csvPath = path.join(__dirname, 'dados.csv');
        // Lê o arquivo CSV
        fs.readFile(csvPath, (err, data) => {
            if (err) {
                // Se não encontrar, responde com erro 404
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Arquivo CSV não encontrado');
            } else {
                // Se encontrar, responde com o conteúdo do CSV
                res.writeHead(200, { 'Content-Type': 'text/csv' });
                res.end(data);
            }
        });
        // Se a pessoa acessar "/media" com método GET:
    } else if (req.url === '/media' && req.method === 'GET') {
        // Executa o script Python chamado media.py usando o Python 3
        const python = spawn('python3', ['media.py']);
        let result = '';
        // Quando o Python mandar dados de saída (stdout), junta na variável result
        python.stdout.on('data', (data) => {
            result += data.toString();
        });
        // Se o Python mandar mensagens de erro (stderr), mostra no console
        python.stderr.on('data', (data) => {
            console.error('Erro Python:', data.toString());
        });
        // Quando o script Python terminar, responde para o navegador com o resultado em formato JSON
        python.on('close', (code) => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ media: result.trim() }));
        });
        // Se a pessoa acessar qualquer outra rota:
    } else {
        // Responde com erro 404 e mensagem de rota não encontrada
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Rota não encontrada');
    }
});

// Faz o servidor começar a escutar na porta definida e mostra uma mensagem no terminal
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
