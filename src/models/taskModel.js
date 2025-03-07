const db = require('../config/database');
const fs = require('fs');
const path = require('path');

exports.listarTarefas = async () => {
  const [rows] = await db.query("SELECT * FROM task");
  return rows;
};

exports.criarTarefa = async (titulo, descricao, user_id) => {
  const [result] = await db.query("INSERT INTO task (titulo, descricao, user_id) VALUES (?, ?, ?)", [titulo, descricao, user_id]);
  return result.insertId;
};

exports.buscarTarefa = async(taskId) =>{
    const [rows] = await db.query('SELECT * FROM task WHERE task_id = ?', [taskId]);
    return rows;
}

exports.actualizarTarefa = async (taskData, task_id) =>{
    const { titulo, descricao, status, user_id} = taskData;
    const [result] = await db.query('UPDATE task SET titulo = ?, descricao = ?, status = ?, user_id = ? WHERE task_id = ?',[titulo, descricao, status, user_id, task_id]);
    return result.affectedRows;
}

exports.apagarTarefa = async(taskId)=>{
    const [result] = await db.query('DELETE FROM task WHERE task_id=?',[taskId]);
    return result.affectedRows;
}

exports.carregarArquivo = async (filePath, fileName, fileExtension, taskId) => {
    const [result] = await db.query(
        'INSERT INTO file (file_path, file_name, file_extension, task_id) VALUES (?, ?, ?, ?)',
        [filePath, fileName, fileExtension, taskId]
    );
    return result.insertId;
};

exports.listarArquivos = async(taskId)=>{
    const [rows] = await db.query('select * from file where task_id = ?',[taskId]);
    return rows;
};

const buscarFicheiro = async(taskId, fileId)=>{
    const [file] = await db.query('SELECT * FROM file WHERE task_id = ? AND file_id = ?', [taskId, fileId]);
    return file;
}
const apagarFicheiroBD = async(taskId, fileId)=>{
    const [result] = await db.query('DELETE FROM file WHERE task_id = ? AND file_id = ?', [taskId, fileId]);
    return result.affectedRows; 
}

exports.apagarFicheiro = async (taskId, fileId) => {
    const file = await buscarFicheiro(taskId, fileId);

    if ( file.length === 0) {
        return 0;// Arquivo não encontrado
    }
    const filePath = path.join(__dirname, '..', file[0].file_path); // Caminho absoluto

    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    } catch (err) {
        console.error("Erro ao excluir o arquivo do sistema:", err);
        throw new Error("Erro ao remover arquivo do sistema de arquivos");
    }

    return await apagarFicheiroBD(taskId, fileId);

};


exports.buscarArquivoPorId = async (fileId) => {
    const [rows] = await db.query("SELECT * FROM file WHERE file_id = ?", [fileId]);
    return rows[0];
};