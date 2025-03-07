const express = require('express');
const taskController = require('../controllers/taskController');
const upload = require('../middlewares/uploadMiddlewares');
const autenticarJWT = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', autenticarJWT, taskController.criarTarefa);
router.get('/', autenticarJWT, taskController.listarTarefas);
router.get('/:id', autenticarJWT, taskController.buscarTarefa);
router.put('/:id', autenticarJWT, taskController.actualizarTarefa);
router.delete('/:id', autenticarJWT, taskController.apagarTarefa);

router.post('/:id/upload', autenticarJWT, upload.single('file'), taskController.carregarArquivo);
router.get('/:id/files', autenticarJWT, taskController.listarArquivos);
router.delete('/:id/files/:fileid', autenticarJWT, taskController.apagarFicheiro);

//rota para servir os arquivos para o front
router.get('/files/:fileId', autenticarJWT, taskController.obterArquivo);

module.exports = router;
