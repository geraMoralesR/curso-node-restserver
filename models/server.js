const express = require('express')
const cors = require('cors');
const { dbconection } = require('../DB/config.db');


class Server {
   //definiendo instancia del servidor
    constructor() {
        //definiendo express
        this.app = express();
        //definiendo el puerto
        this.port = process.env.PORT;
        //definiendo un url de usuario
        this.userPath = '/api/usuarios';

        //conectar DB
        this.conectarDB();

        //middlewares
        this.middlewares();

        //rutas de la aplicacion 
        this.routes;
    }


    async conectarDB(){
        await dbconection();
    }
    
    middlewares(){

        //cors
        this.app.use(cors());

        //lectura y parseo del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use( express.static('public'));
    }

    routes() {
        this.app.use(this.userPath, require('../routes/user.controller'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en el puerto', this.port);
        });
    }

}


module.exports = Server;