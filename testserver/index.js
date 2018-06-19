var http = require('http');
var server=http.createServer(function(req,res){
	console.log('dede');
	res.end('hello,world')
});

server.listen(3002);

