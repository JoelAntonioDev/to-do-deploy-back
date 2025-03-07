const taskService = require('../services/taskService');

exports.listarTarefas = async (req, res) => {
    try {
        const tasks = await taskService.listarTarefas();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar tarefas" });
    }
};

exports.criarTarefa = async (req, res) => {
    try {
        const taskId = await taskService.criarTarefa(req.body);
        res.status(201).json({ message: 'Tarefa criada com sucesso', taskId: taskId });
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar tarefa" });
    }
};

exports.buscarTarefa = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await taskService.buscarTarefa(taskId);

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

        const { titulo, descricao, status, user_id } = req.body;
        if (!titulo || !descricao || !status || !user_id) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }

        const affectedRows = await taskService.actualizarTarefa({ titulo, descricao, status, user_id }, taskId);
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
        const affectedRows = taskService.apagarTarefa(taskId);
        if (affectedRows == 0) {
            res.status(404).json({ error: "Tarefa não encontrada, impossível remover" })
        }
        res.json({ message: "Tarefa apagada com sucesso" })
    } catch (error) {
        console.error("Erro ao apagar tarefa:", error);
        res.status(500).json({ error: "Erro ao apagar tarefa" });
    }
};

exports.carregarArquivo = async(req, res)=>{
    try{
        const taskId = req.params.id;
        const affectedRows = taskService.carregarArquivo(req.body, taskId);
        if (affectedRows == 0) {
            res.status(404).json({ error: "Arquivo não carregado, impossível encontrar tarefa" })
        }
        res.json({ message: "Arquivo carregado com sucesso" })
    }catch(error){
        console.error("Erro ao carregar arquivo na tarefa:", error);
        res.status(500).json({ error: "Erro ao carregar arquivo na tarefa"});
    }
};
