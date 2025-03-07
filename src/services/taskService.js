const taskModel = require('../models/taskModel');

exports.listarTarefas = async () => {
  return await taskModel.listarTarefas();
};

exports.criarTarefa = async (taskData) => {
  const { titulo, descricao, user_id } = taskData;
  return await taskModel.criarTarefa(titulo, descricao, user_id);
};

exports.buscarTarefa = async (taskId) => {
    return await taskModel.buscarTarefa(taskId);
};

exports.actualizarTarefa = async(taskData, taskId)=>{
    return await taskModel.actualizarTarefa(taskData, taskId);
};

exports.apagarTarefa = async(taskId)=>{
    return await taskModel.apagarTarefa(taskId);
};

exports.carregarArquivo = async(body, taskId) =>{
    return await taskModel.carregarArquivo(body, taskId);
};