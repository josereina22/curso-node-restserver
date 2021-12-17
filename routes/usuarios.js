
const { Router } = require('express');

const router = Router();
const { usuariosGet, usuariosPut,  usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');

router.get('/', usuariosGet );

router.put('/:id', usuariosPut );

router.patch('/', usuariosPatch );

router.post('/', usuariosPost );

router.delete('/',  usuariosDelete);

module.exports = router;