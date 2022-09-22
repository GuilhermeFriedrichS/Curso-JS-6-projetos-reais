const express = require('express');
let routes = express.Router();

routes.get('/', (req, res) =>{

    res.statusCode = 200; //codigo 200 é o codigo que devemos retornar para o usuario quando a conexão dá certo
    res.setHeader('Content-Type', 'text/html'); // Faz ele ler o res.end como html
    res.end('<h1>Olá</h1>');
});

module.exports = routes;