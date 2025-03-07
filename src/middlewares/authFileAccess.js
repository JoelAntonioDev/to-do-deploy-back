
const path = require('path');
const db = require('../config/database');

const verificarPermissaoArquivo = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const filePath = req.params.filePath; 

        if (!userId) {
            return res.status(401).json({ error: "Usuário não autenticado" });
        }

        const [files] = await db.query(
            'SELECT * FROM file INNER JOIN task ON file.task_id = task.task_id WHERE file.file_path = ? AND task.user_id = ?',
            [`uploads/${filePath}`, userId]
        );

        if (files.length === 0) {
            return res.status(403).json({ error: "Acesso negado ao arquivo" });
        }
        req.filePath = path.join(__dirname, '..', 'uploads', filePath);
        next(); 
    } catch (error) {
        console.error("Erro ao verificar permissão do arquivo:", error);
        res.status(500).json({ error: "Erro ao verificar permissão do arquivo" });
    }
};

module.exports = verificarPermissaoArquivo;
