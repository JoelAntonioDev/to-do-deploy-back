const db = require('../config/database');
const fs = require('fs');
const path = require('path');

exports.listarTarefasPorUsuario = async (userId) => {
    const [rows] = await db.query("SELECT * FROM task WHERE user_id = ?", [userId]);
    return rows;
};

exports.criarTarefa = async (titulo, descricao, user_id) => {
    const [result] = await db.query("INSERT INTO task (titulo, descricao, user_id) VALUES (?, ?, ?)", [titulo, descricao, user_id]);
    return result.insertId;
};


exports.buscarTarefa = async (taskId, userId) => {
    const [rows] = await db.query('SELECT * FROM task WHERE task_id = ? and user_id=?', [taskId, userId]);
    return rows;
}

exports.actualizarTarefa = async (taskData, task_id) => {
    const { titulo, descricao, status, userId } = taskData;
    const [result] = await db.query('UPDATE task SET titulo = ?, descricao = ?, status = ? WHERE user_id = ? and task_id = ?', [titulo, descricao, status, userId, task_id]);
    return result.affectedRows;
};


exports.apagarTarefa = async (taskId, userId) => {
    const [result] = await db.query('DELETE FROM task WHERE task_id=? AND user_id=?', [taskId, userId]);
    return result.affectedRows;
}

exports.carregarArquivo = async (filePath, fileName, fileExtension, taskId, userId) => {
    try {
        console.log("ver task:"+taskId);
        const [task] = await db.query('SELECT * FROM task WHERE task_id = ? AND user_id = ?', [taskId, userId]);
        
        if (!task) {
            return { error: "Tarefa não encontrada ou não pertence ao usuário" };
        }

        const [result] = await db.query(
            'INSERT INTO file (file_path, file_name, file_extension, task_id) VALUES (?, ?, ?, ?)',
            [filePath, fileName, fileExtension, taskId]
        );
        return { success: true, fileId: result.insertId };
    } catch (error) {
        console.error("Erro ao carregar arquivo:", error);
        return { error: "Erro ao carregar arquivo", details: error.message };
    }
};


exports.listarArquivos = async (taskId) => {
    const [rows] = await db.query('select * from file where task_id = ?', [taskId]);
    return rows;
};

const buscarFicheiro = async (taskId, fileId) => {
    const [file] = await db.query('SELECT * FROM file WHERE task_id = ? AND file_id = ?', [taskId, fileId]);
    return file;
}
const apagarFicheiroBD = async (taskId, fileId) => {
    const [result] = await db.query('DELETE FROM file WHERE task_id = ? AND file_id = ?', [taskId, fileId]);
    return result.affectedRows;
}

exports.apagarFicheiro = async (taskId, fileId) => {
    const file = await buscarFicheiro(taskId, fileId);

    if (file.length === 0) {
        return 0;
    }
    const filePath = path.join(__dirname, '..', file[0].file_path); 

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