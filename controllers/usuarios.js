const { response } = require('express');

const usuariosGet = (req, res = response) => {

    const {edad, nombre = 'no name', page = 1, limit} = req.query
    res.json({
        msg:'get API - controlador',
        edad,
        nombre,
        page,
        limit
    });
}

const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg:'put API - controlador',
        id
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg:'patch API - controlador'
    });
}

const usuariosPost = (req, res = response) => {

    const { nombre, edad } = req.body;
    res.json({
        msg:'post API - controlador',
        nombre,
        edad
    });
}

const usuariosDelete = (req, res = response) => {

    res.json({
        msg:'delete API - controlador'
    });
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPatch,
    usuariosPost,
    usuariosDelete,
}