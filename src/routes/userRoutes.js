const express = require('express')
const userController = require('../controllers/userController');
const autenticarJWT = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', autenticarJWT, userController.obterUsuarios); 
router.post('/', userController.criarUsuario);
router.post('/login', userController.login);
router.post('/logout', autenticarJWT, userController.logout);
module.exports = router;