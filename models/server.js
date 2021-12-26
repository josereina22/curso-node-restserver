const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/api/usuarios';
        this.authPath = '/api/auth';

        // conectar a base de datos
        this.conectarBD();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();

    }

    async conectarBD() {
        await dbConnection();
    }

    middlewares() {

        //CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorios Público
        this.app.use( express.static('public'));
    }

    routes() {
        
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuarioPath, require('../routes/usuarios'));
    }

    listen() {
        
        this.app.listen( this.port, () => {
            console.log('Servidor',  this.port );
        })

    }
}


module.exports = Server;