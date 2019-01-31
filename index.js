var http = require('http');

/*
    HTTP server
    Listen: 3000
    Request: Nothing
    Response: 'Hola'
*/

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hola');
}).listen(3000);

console.log('Servidor iniciado!');