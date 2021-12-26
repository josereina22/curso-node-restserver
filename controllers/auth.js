const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {
        
        // Verificar si existe Email
        const usuario = await Usuario.findOne({ correo });

        if( !usuario) {
            return res.status(400).json({
                msj: 'Usuario / Password no son válidos - correo'
            });
        }

        // vericar si usuario esta activo
        if( !usuario.estado) {
            return res.status(400).json({
                msj: 'Usuario / Password no son válidos - estado: false'
            });
        }
        
        // verificar contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        
        if( !validPassword) {
            return res.status(400).json({
                msj: 'Usuario / Password no son válidos - password'
            });
        }

        // Generar JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msj: 'Error del servidor'
        })
    }

    
}

module.exports = {
    login
}
