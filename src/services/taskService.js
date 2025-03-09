const taskModel = require('../models/taskModel');

exports.listarTarefasPorUsuario = async (userId) => {
    return await taskModel.listarTarefasPorUsuario(userId);
};

exports.criarTarefa = async (titulo, descricao, user_id) => {
    return await taskModel.criarTarefa(titulo, descricao, user_id);
};


exports.buscarTarefa = async (taskId, userId) => {
    return await taskModel.buscarTarefa(taskId, userId);
};

exports.actualizarTarefa = async (taskData, taskId) => {
    return await taskModel.actualizarTarefa(taskData, taskId);
};

exports.apagarTarefa = async (taskId, userId) => {
    return await taskModel.apagarTarefa(taskId, userId);
};

exports.carregarArquivo = async (file, taskId, userId) => {
    const filePath = `uploads/${file.filename}`;
    const fileName = file.originalname;

    if (!file.mimetype || !file.mimetype.includes("/")) {
        throw new Error("Tipo de arquivo inválido");
    }

    const fileExtension = file.mimetype.split("/")[1]; 
    console.log("Extensão do arquivo no service:", fileExtension);

    return await taskModel.carregarArquivo(filePath, fileName, fileExtension, taskId, userId);
};


exports.listarArquivos = async (taskId) => {
    const files = await taskModel.listarArquivos(taskId);
    return files.map(file => ({
        ...file,
        file_url: `http://localhost:3000/${file.file_path}`
    }));
};

exports.apagarFicheiro = async (taskId, fileId) => {
    return await taskModel.apagarFicheiro(taskId, fileId);
};

exports.buscarArquivoPorId = async (fileId) => {
    return await taskModel.buscarArquivoPorId(fileId);
};