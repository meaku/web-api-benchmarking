"use strict";

var http = require("http"),
    execSync = require("child_process").execSync;

http.createServer(function(req, res) {
    res.writeHead(200);

    //exec sync as a blocking child request
    execSync("sleep 1");

    //done -> end response
    res.end("hello world\n");
}).listen(8000);