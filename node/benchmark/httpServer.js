var http = require("http"),
    fs = require("fs");

http.createServer(function(req, res) {
    fs.createReadStream(__dirname + "/assets/index.html").pipe(res);
}).listen(8000);