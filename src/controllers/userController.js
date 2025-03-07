const userService = require('../services/userService');

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
    const userId = await userService.criarUsuario(req.body);
    res.status(201).json({ id: userId, message: "Usuário criado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
};
