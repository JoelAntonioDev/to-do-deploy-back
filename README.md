# 📝 To-Do List API

Este é um projeto de **API RESTful** para gerenciamento de tarefas, desenvolvido com **Node.js**, **Express** e **MySQL**.  
Ele permite criar, actualizar, excluir e listar tarefas, além de gerenciar arquivos associados.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** - Para executar código JavaScript no servidor
- **Express** - Framework para criação de APIs
- **MySQL** - Banco de dados relacional para armazenamento das tarefas
- **dotenv** - Gerenciamento de variáveis de ambiente
- **cors** - Habilitação de requisições entre diferentes origens
- **jsonwebtoken (JWT)** - Autenticação e segurança
- **multer** - Manipulação de upload de arquivos
- **bcrypt** - Criptografia de senhas

---

## 📌 Como Executar o Projeto

### 1️⃣ **Pré-requisitos**

Certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

---
Clonar o repositório

    git clone https://github.com/JoelAntonioDev/to-do-list-backend.git

    cd to-do-list-backend


### 2️⃣ **Configuração do Banco de Dados**

1. **Criar a base de dados MySQL**:  
   No MySQL, execute o seguinte comando para criar o banco:

   ```sql
        CREATE DATABASE todo_list;

    Configurar as variáveis de ambiente:
    Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

        DB_HOST=localhost
        DB_USER=root
        DB_PASS=sua_senha
        DB_NAME=todo_list
        DB_PORT=3306   # Porta do MySQL
        PORT=3000      # Porta do servidor Node.js
        JWT_SECRET=password_secreta
        JWT_EXPIRES_IN=1d

3️⃣ Instalar as Dependências

No terminal, dentro do diretório do projeto, execute:

        npm install

4️⃣ Rodar a API

Para iniciar o servidor, execute:

        npm start

A API estará disponível em:
🔗 http://localhost:3000

📡 Rotas da API

📂 Gestão de Usuários

    GET /users - Lista todos os usuários
    POST /users - Adicionar usuário
    GET /users/:id - Obtém os detalhes de um usuário
    POST /users/login - Fazer login
    POST /users/logout - Fazer logout

📂 Gestão de Tarefas

    GET /tasks - Lista todas as tarefas
    GET /tasks/:id - Obtém os detalhes de uma tarefa específica
    POST /tasks - Cria uma nova tarefa
    PUT /tasks/:id - Atualiza uma tarefa existente
    DELETE /tasks/:id - Remove uma tarefa

📁 Gestão de Arquivos

    POST /tasks/:id/upload - Faz upload de um arquivo associado a uma tarefa
    GET /tasks/:id/files - Lista os arquivos associados a uma tarefa
    GET /files/:fileId - Obtém um arquivo específico
    DELETE /tasks/:id/files/:fileId - Remove um arquivo associado a uma tarefa

💙 Feito por Joel António 🚀