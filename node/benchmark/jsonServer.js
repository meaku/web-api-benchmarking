var http = require("http"),
    fs = require("fs");

http.createServer(function(req, res) {
    fs.createReadStream(__dirname + "/assets/names.json").pipe(res);
}).listen(8000);

console.log("server running on port 8000 with pid " + process.pid);