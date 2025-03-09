const taskService = require('../services/taskService');
const path = require('path');
const fs = require('fs');

exports.listarTarefas = async (req, res) => {
    try {
        const userId = req.userId;
        const tasks = await taskService.listarTarefasPorUsuario(userId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar tarefas" });
    }
};

exports.criarTarefa = async (req, res) => {
    try {
        const userId = req.userId;
        const { titulo, descricao } = req.body;

        if (!titulo || !descricao || !userId) {
            return res.status(400).json({ error: "Os campos título, descrição e usuário são obrigatórios" });
        }

        const taskId = await taskService.criarTarefa(titulo, descricao, userId);
        res.status(201).json({ message: 'Tarefa criada com sucesso', taskId: taskId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar tarefa" });
    }
};

exports.buscarTarefa = async (req, res) => {
    try {
        const taskId = req.params.id;
        const userId = req.userId;
        if (!taskId || !userId) {
            return res.status(400).json({ error: "O id da tarefa é necessário, e o token não deve ser inválido" });
        }
        const task = await taskService.buscarTarefa(taskId, userId);

        if (!task || task.length === 0) {
            return res.status(404).json({ error: "Tarefa não encontrada" });
        }

        res.json(task);
    } catch (error) {
        console.error("Erro ao buscar tarefa:", error);
        res.status(500).json({ error: "Erro ao buscar tarefa" });
    }
};

exports.actualizarTarefa = async (req, res) => {
    try {
        const taskId = Number(req.params.id);

        if (isNaN(taskId)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const { titulo, descricao, status } = req.body;
        const userId = req.userId;
        if (!titulo || !descricao || !status) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }
        if (!userId) {
            return res.status(400).json({ error: "Token inválido" });
        }

        const statusValidos = ['pendente', 'em progresso', 'concluido'];

        if (!statusValidos.includes(status)) {
            return res.status(400).json({ error: `Status inválido. Os valores válidos são: ${statusValidos.join(', ')}` });
        }

        const affectedRows = await taskService.actualizarTarefa({ titulo, descricao, status, userId }, taskId);

        if (affectedRows === 0) {
            return res.status(404).json({ error: "Tarefa não encontrada" });
        }

        res.json({ message: "Tarefa atualizada com sucesso" });
    } catch (error) {
        console.error("Erro ao actualizar tarefa:", error);
        res.status(500).json({ error: "Erro ao actualizar tarefa", details: error.message });
    }
};

exports.apagarTarefa = async (req, res) => {
    try {
        const taskId = req.params.id;
        const userId = req.userId;
        if (!taskId) {
            return res.status(400).json({ error: "Id não enviado" });
        }
        if (!userId) {
            return res.status(400).json({ error: "Token inválido" });
        }
        const affectedRows = await taskService.apagarTarefa(taskId, userId);
        if (affectedRows == 0) {
            return res.status(404).json({ error: "Tarefa não encontrada, impossível remover" })
        }
        return res.json({ message: "Tarefa apagada com sucesso" })
    } catch (error) {
        console.error("Erro ao apagar tarefa:", error);
        return res.status(500).json({ error: "Erro ao apagar tarefa" });
    }
};

exports.carregarArquivo = async (req, res) => {
    try {
        const taskId = req.params.id;
        const userId = req.userId;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: "Nenhum arquivo enviado" });
        }

        console.log("Objeto 'file':", file);

        if (!file.mimetype || !file.mimetype.includes("/")) {
            return res.status(400).json({ error: "Tipo de arquivo inválido" });
        }

        
        const fileExtension = file.mimetype.split('/')[1]; 
        console.log("Extensão do arquivo:", fileExtension);

        const result = await taskService.carregarArquivo(file, taskId, userId);  

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        res.status(201).json({ message: "Arquivo carregado com sucesso", fileId: result.fileId });
    } catch (error) {
        console.error("Erro ao carregar arquivo:", error);
        res.status(500).json({ error: "Erro ao carregar arquivo", details: error.message });
    }
};

exports.listarArquivos = async (req, res) => {
    try {
        const taskId = Number(req.params.id);
        if (isNaN(taskId)) {
            return res.status(400).json({ error: "Id da tarefa inválido" });
        }
        const files = await taskService.listarArquivos(taskId);
        res.json({ task_id: taskId, files: files });
    } catch (error) {
        console.error("Erro ao buscar ficheiros da tarefa:", error);
        res.status(500).json({ error: "Erro ao buscar ficheiros da tarefa" });
    }
}

exports.apagarFicheiro = async (req, res) => {
    try {
        const taskId = Number(req.params.id);
        const fileId = Number(req.params.fileid);
        if (isNaN(taskId)) {
            return res.status(400).json({ error: "Id da tarefa inválido" });
        } else if (isNaN(fileId)) {
            return res.status(400).json({ error: "Id do ficheiro inválido" });
        }
        const affectedRows = await taskService.apagarFicheiro(taskId, fileId);
        if (affectedRows == 0) {
            res.status(404).json({ error: "Problema ao remover" })
        }
        res.json({ message: "Arquivo apagado com sucesso" })
    } catch (error) {

    }
}

exports.obterArquivo = async (req, res) => {
    try {
        const { fileId } = req.params;
        const userId = req.userId;

        const arquivo = await taskService.buscarArquivoPorId(fileId);

        if (!arquivo) {
            return res.status(404).json({ error: "Arquivo não encontrado" });
        }

        const filePath = path.join(__dirname, '../', arquivo.file_path);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: "Arquivo não encontrado no servidor" });
        }

        // Enviar o arquivo
        res.sendFile(filePath);
    } catch (error) {
        console.error("Erro ao obter arquivo:", error);
        res.status(500).json({ error: "Erro ao obter arquivo" });
    }
};