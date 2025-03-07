const userModel = require('../models/userModel');

exports.obterUsuarios = async () => {
  return await userModel.obterUsuarios();
};

exports.criarUsuario = async (userData) => {
  const { nome, sobrenome,  email, senha } = userData;
  return await userModel.criarUsuario(nome, sobrenome, email, senha);
};
