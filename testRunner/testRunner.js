"use strict";

var wrk = require("wrk"),
    sequest = require("sequest");

//wrk -t12 -c400 -d30s http://192.168.50.100:8000
var wrkOptions = {
        threads: 10,
        connections: 400,
        duration: "30s",
        printLatency: true,
        url: 'http://192.168.50.100:8000/'
    },
    sshHost = "vagrant@192.168.50.100";

function runBenchmark(name, serverCommand, callback) {

    console.log("running benchmark '" + name + "' (" + serverCommand + ")");

    var seq = sequest.connect(sshHost);
    seq(serverCommand, function (err, stdout) {});

    setTimeout(function () {
        wrk(wrkOptions, function (err, out) {
            seq.end();
            callback(err, out);
        });
    }, 2000)

}

runBenchmark("node single api", "node /vagrant/node/benchmark/httpServer.js", function (err, results) {
    console.log(results);
});


/*
 wrk(wrkOptions, function (err, out) {
 console.log(err, out);
 });
 */

//seq.end();

