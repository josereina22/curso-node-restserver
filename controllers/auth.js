const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async(req, res = response) => {

    const { id_token } = req.body

    try {
        
        const { nombre, img, correo } = await googleVerify( id_token );
        
        let usuario = await Usuario.findOne({ correo });
        
        if ( !usuario ) {
            //Lo tengo que crear
            const data = {
                nombre,
                correo,
                password: ':p',
                img,
                google: true
            }    

            usuario  = new Usuario( data );
            await usuario.save();
        }

        // Si el usuario es DB
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqeado'
            });
        }

        // Generar JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        });

    } catch (error) {
        
        json.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }

} 

module.exports = {
    login, 
    googleSignIn
}
