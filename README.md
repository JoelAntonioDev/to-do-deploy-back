# To-Do List API

Este é um projeto de API RESTful para gerenciar tarefas, desenvolvido com **Node.js**, **Express** e **MySQL**.

## Tecnologias Usadas

- Node.js
- Express
- MySQL
- dotenv
- cors

## Como executar o projeto

### 1️⃣ Pré-requisitos

É necessário ter instalado:

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

### 2️⃣ Configurar Banco de Dados

1. Criar a base de dados MySQL:

```sql
CREATE DATABASE todo_list;

Configurar Banco de Dados

DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha
DB_NAME=todo_list
DB_PORT=3306  # Porta do MySQL
PORT=3000     # Porta do servidor Node.js

3️⃣ Instalar dependências

Execute o seguinte comando no terminal:

npm install

4️⃣ Rodar a API

npm start

A API estará disponível em:
🔗 http://localhost:3000
📌 Rotas da API

    GET /tasks - Lista todas as tarefas
    GET /tasks/:id - recupera os detalhes de uma tarefa específica
    POST /tasks - Cria uma nova tarefa
    PUT /tasks/:id - Atualizar uma tarefa exitente
    DELETE /tasks/:id - Remove uma tarefa
    POST /tasks/:id/upload - faz upload de um arquivo associado a uma tarefa
    GET /tasks/:id/files - lista arquivos associados a uma tarefa
    DELETE /tasks/:id/files/:fileid - remove um arquivo específico associado a uma tarefa

🛠️ Tecnologias utilizadas

    Express para criar o servidor
    MySQL para armazenamento dos dados
    dotenv para gerenciamento de variáveis de ambiente
    cors para permitir acessos de diferentes origens

📌 Feito com 💙 por Joel António