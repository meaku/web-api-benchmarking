"use strict";

var wrk = require("wrk"),
    sequest = require("sequest");

//wrk -t12 -c400 -d30s http://192.168.50.100:8000
var wrkOptions = {
        threads: 10,
        connections: 400,
        duration: "10s",
        printLatency: true,
        url: 'http://192.168.50.100:8000/'
    },
    sshHost = "vagrant@192.168.50.100";

function runBenchmark(id, callback) {

    console.log("running benchmark '" + id + "'");

    var seq = sequest.connect(sshHost);

    console.log("starting server benchmark...");

    seq("node /vagrant/testRunner/run.js --id " + id, function (err, pid) {
        if(err) {
            console.log(pid);
            callback(err);
            return;
        }

        //give server some time to warm up
        setTimeout(function () {

            console.log("running benchmark...");
            wrk(wrkOptions, function (err, out) {
                if (err) {
                    callback(err);
                    return;
                }

                console.log("killing server " + pid);

                seq("kill " + pid, function (err) {
                    callback(err, out);
                    seq.end();
                });
            });

        }, 1000);
    });
}

runBenchmark("node_json", function (err, results) {

    if(err) {
        throw err;
    }

    console.log(results);
});