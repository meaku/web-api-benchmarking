"use strict";

var wrk = require("wrk"),
    sequest = require("sequest"),
    when = require("when"),
    nodefn = require("when/node");

//wrk -t12 -c400 -d30s http://192.168.50.100:8000
var wrkOptions = {
        threads: 10,
        connections: 400,
        duration: "30s",
        printLatency: true,
        url: "http://192.168.50.100:8000/"
    },
    sshHost = "vagrant@vagrant.vm";

function startServer(seq, benchmarkId) {
    console.log("starting server with '" + benchmarkId + "'");

    return nodefn.call(seq, "node /vagrant/testRunner/run.js --id " + benchmarkId)
        .then(function (pid) {
            pid = parseInt(pid);
            console.log("process started " + pid);
            return pid;
        });
}

function runHttpBenchmark(wrkOptions) {
    console.log("running benchmark on " + wrkOptions.url + " for " + wrkOptions.duration);
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
        results,
        currentPid;

    startServer(seq, id)
        .delay(2000)
        .then(function (pid) {
            console.log("server started with pid" + pid);
            currentPid = pid;
            //return runHttpBenchmark(wrkOptions).delay(2000);
            return when.all([runMonitor(seq, pid, 1000, 20), when.resolve().delay(5000).then(function() { return runHttpBenchmark(wrkOptions); }) ]);
        })
        .then(function(res){
            results = res;
            return killServer(seq, currentPid);
        })
        .done(function() {
            seq.end();
            callback(null, results);
        }, function(err) {
            console.log("killing server due to error:" + err.message, err.stack);
            killServer(seq, currentPid).done(function() {
                callback(err);
            }, callback);
        });
}

module.exports = testRunner;