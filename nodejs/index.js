const http = require('http');

let server = http.createServer((req, res) =>{

    console.log('URL:', req.url);
    console.log('URL:', req.method);

    switch(req.url){

        case '/':
        
        res.statusCode = 200; //codigo 200 é o codigo que devemos retornar para o usuario quando a conexão dá certo
        res.setHeader('Content-Type', 'text/html'); // Faz ele ler o res.end como html
        res.end('<h1>Olá</h1>');

        break;

        case '/users':

        res.statusCode = 200; 
        res.setHeader('Content-Type', 'application/json'); 
        res.end(JSON.stringify({
            users:[{
                name:'Guilherme',
                email:'teste@teste',
                id:1
            }]
        }));

        break;

    }
});

server.listen(3000, '127.0.0.1', ()=>{

    console.log('Servidor rodando!')

})