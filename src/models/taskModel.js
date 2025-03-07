const db = require('../config/database');

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
        "INSERT INTO file (file_path, file_name, file_extension, task_id) VALUES (?, ?, ?, ?)",
        [filePath, fileName, fileExtension, taskId]
    );
    return result.insertId;
};