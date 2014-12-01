"use strict";

var wrk = require("wrk"),
    sequest = require("sequest"),
    when = require("when"),
    nodefn = require("when/node");

//wrk -t12 -c400 -d30s http://192.168.50.100:8000
var wrkOptions = {
        threads: 10,
        connections: 400,
        duration: "10s",
        printLatency: true,
        url: "http://192.168.50.100:8000/"
    },
    sshHost = "vagrant@192.168.50.100";

function startServer(seq, benchmarkId) {

    return nodefn.call(seq, "node /vagrant/testRunner/run.js --id " + benchmarkId)
        .then(function (pid) {
            pid = parseInt(pid);
            console.log("process started " + pid);
            return pid;
        });
}

function runHttpBenchmark(wrkOptions) {
    console.log("running benchmark on " + wrkOptions.url);
    return nodefn.call(wrk, wrkOptions);
}

function killServer(seq, pid) {
    console.log("killing server " + pid);
    return nodefn.call(seq, "kill " + pid);
}

function runMonitor(seq, pid, interval, limit) {
    console.log("monitoring pid " + pid);

    return nodefn.call(seq, "node /vagrant/testRunner/monitor.js --pid " + pid + " --interval " + interval + " --limit " + limit)
        .then(function (results) {
            return JSON.parse(results[0]);
        });
}

function testRunner(id, callback) {
    console.log("running benchmark '" + id + "'");

    var seq = sequest.connect(sshHost),
        results;

    startServer(seq, id)
        .then(function (pid) {

            var monitor = runMonitor(seq, pid, 1000, 20);

            setTimeout(function () {
                when.all([monitor, runHttpBenchmark(wrkOptions)])
                    .then(function (res) {
                        results = res;
                        return killServer(seq, pid);
                    })
                    .done(function () {
                        seq.end();
                        callback(null, results);
                    }, callback);
            }, 5000);
        });
}

module.exports = testRunner;