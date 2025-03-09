const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.obterUsuarios = async (req, res) => {
  try {
    const users = await userService.obterUsuarios();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};

exports.criarUsuario = async (req, res) => {
    try {
      const { nome, sobrenome, email, senha } = req.body;
  
      if (!nome || !sobrenome || !email || !senha) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
      }
  
      const senhaCriptografada = await bcrypt.hash(senha, 10);
  
      const userId = await userService.criarUsuario({ nome, sobrenome, email, senha: senhaCriptografada });
  
      res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  };

exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const user = await userService.buscarUsuarioPorEmail(email);

        if (!user) {
            return res.status(401).json({ error: "Usuário ou senha inválidos" });
        }

        const senhaValida = await bcrypt.compare(senha, user.senha);
        if (!senhaValida) {
            return res.status(401).json({ error: "Usuário ou senha inválidos" });
        }
        console.log(user);
        const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        res.status(200).json({ message: "Login bem-sucedido", token, email });
    } catch (error) {
        res.status(500).json({ error: "Erro ao realizar login" });
    }
};

exports.logout = async (req, res) => {
    res.json({ message: "Logout bem-sucedido" });
};