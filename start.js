var http = require('http');
var fs = require('fs');

// Chargement d'un fichier index.html affich� au client
var server = http.createServer(function(req, res) {
	fs.readFile('./index.html', 'utf-8', function(error, content) {
		res.writeHead(200, {"Content-Type": "text/html"});
		res.end(content);
	});
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function(socket) {
		console.log("Un client est connect� !");
		socket.on('message', function(message) {
			console.log('Message du client : ' + message);
		});
		socket.emit('test', "Roger!");
});

server.listen(8080);