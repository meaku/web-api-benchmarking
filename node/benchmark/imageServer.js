var http = require("http"),
    fs = require("fs");

http.createServer(function(req, res) {
    fs.createReadStream(__dirname + "/assets/logo.jpg").pipe(res);
}).listen(8000);