"use strict";

var cluster = require("cluster"),
    http = require("http"),
    fs = require("fs");
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
        fs.createReadStream(__dirname + "/assets/names.json").pipe(res);
    }).listen(8000);

    console.log("server running on port 8000 with pid " + process.pid);
}


