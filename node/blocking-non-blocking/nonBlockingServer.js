"use strict";

var http = require("http"),
    exec = require("child_process").exec;

http.createServer(function (req, res) {

    res.writeHead(200);

    //exec sleep async!
    exec("sleep 1", function() {

        //exec is done -> end response
        res.end("hello world");
    });

}).listen(8000);