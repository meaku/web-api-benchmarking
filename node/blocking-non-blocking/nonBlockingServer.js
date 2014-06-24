var http = require("http");

http.createServer(function (req, res) {
    res.writeHead(200);

    setTimeout(function () {
        res.end("hello world\n");
    }, 1000);

}).listen(8000);