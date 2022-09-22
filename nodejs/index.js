const express = require('express');

let app = express();

app.get('/', (req, res) =>{

    res.statusCode = 200; //codigo 200 é o codigo que devemos retornar para o usuario quando a conexão dá certo
    res.setHeader('Content-Type', 'text/html'); // Faz ele ler o res.end como html
    res.end('<h1>Olá</h1>');
});

app.get('/users', (req, res) =>{

    res.statusCode = 200; 
    res.setHeader('Content-Type', 'application/json'); 
    res.end(JSON.stringify({
        users:[{
            name:'Guilherme',
            email:'teste@teste',
            id:1
        }]
    }));

});

app.listen(3000, '127.0.0.1', ()=>{

    console.log('Servidor rodando!')

})