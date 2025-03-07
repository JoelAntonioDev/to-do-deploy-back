const express = require('express')
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.obterUsuarios);
router.post('/', userController.criarUsuario);

module.exports = router;