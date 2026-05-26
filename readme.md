# Instruções para rodar localmente ou no Render

1. Instale as dependências do Node.js (se necessário):
   npm install

2. Para rodar localmente:
   node app.js

3. Para acessar as rotas:
   - /csv   → retorna o arquivo CSV
   - /media → retorna a média calculada pelo Python

4. O arquivo dados.csv deve estar no mesmo diretório que app.js e media.py.

5. O Render irá rodar automaticamente o comando `npm start`.

6. Certifique-se de que o Python 3 está disponível no ambiente do Render.
