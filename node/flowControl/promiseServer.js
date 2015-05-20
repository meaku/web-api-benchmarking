"use strict";

var http = require("http");

function timeout() {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, 100);
    });
}

http.createServer(function (req, res) {

    timeout()
        .then(function () {
            res.writeHead(200);
            res.end("OK");

        })
        .catch(function (err) {
            res.end("Error: " + err.message);
        });

}).listen(8000);