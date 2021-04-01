require('dotenv').config();
const express = require('express');
const hbs = require('hbs');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.juegoPath = '/';

        this.routes();
    }

    routes(){

        this.app.set('view engine', 'hbs');

        this.app.use(express.static('public'));

        this.app.use(this.juegoPath, require('../routes/juego'));

    }

    listen(){
        this.app.listen( this.port, () =>{
            console.log(`App corriendo en el puerto ${this.port}`);
        })
    }

}

module.exports = Server;