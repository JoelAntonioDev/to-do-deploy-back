const express = require('express');
const taskController = require('../controllers/taskController')
const router = express.Router();

router.post('/', taskController.criarTarefa);
router.get('/', taskController.listarTarefas);
router.get('/:id', taskController.buscarTarefa);
router.put('/:id', taskController.actualizarTarefa);
router.delete('/:id', taskController.apagarTarefa);
router.post('/:id/upload', taskController.carregarArquivo);


module.exports = router;