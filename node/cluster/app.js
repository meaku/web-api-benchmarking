var cluster = require('cluster');
var http = require('http');
//var numCPUs = require('os').cpus().length;
var numCPUs = 2;

if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

}
else {
    // Workers can share any TCP connection
    // In this case its a HTTP server
    http.createServer(function(req, res) {
        res.writeHead(200);
        res.end("hello world\n");
    }).listen(8000);
}


