var http = require("http"),
    sleep = require("sleep");

http.createServer(function(req, res) {
    res.writeHead(200);
    sleep.sleep(1);
    res.end("hello world\n");
}).listen(8000);