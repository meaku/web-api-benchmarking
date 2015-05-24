"use strict";

var http = require("http"),
    co = require("co");

function timeout() {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, 100);
    });
}

http.createServer(function (req, res) {

    co(function* () {

        try {
            yield timeout();
            res.writeHead(200);
            res.end("OK");
        }
        catch(err) {
            res.end("Error: " + err.message);
        }
    });

}).listen(8000);