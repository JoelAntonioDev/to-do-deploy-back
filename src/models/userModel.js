const db = require('../config/database');

exports.obterUsuarios = async () => {
  const [rows] = await db.query("SELECT * FROM usuario");
  return rows;
};

exports.criarUsuario = async (nome, sobrenome, email, senha) => {
  const [result] = await db.query("INSERT INTO usuario (nome, sobrenome, email, senha) VALUES (?, ?, ?, ?)", [nome, sobrenome, email, senha]);
  return result.insertId;
};
