"use strict";

var http = require("http");

function timeout(callback) {
    setTimeout(function() {
        callback(null);
    }, 100);
}

http.createServer(function (req, res) {

    timeout(function(err) {
        if(err) {
            res.end("Error: " + err.message);
        }

        res.writeHead(200);
        res.end("OK");
    });

}).listen(8000);