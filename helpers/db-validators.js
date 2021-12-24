const role = require("../models/role");
const usuario = require("../models/usuario");

const esRolValido = async( rol = '' ) => {
    const existeRol = await role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está en la base de datos`)
    }
}

const emailExiste = async( correo = '')  => {
    
    //verificar si el correo existe
    const existeEmail = await usuario.findOne({ correo });
    
    if ( existeEmail ) {
        throw new Error(`El correo ${ correo } ya esta registrado`);
    }
}

const existeUsuarioPorId = async( id )  => {
    
    // Verifica si exsite usuario
    const existeUsuario = await usuario.findById(id);
    
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}