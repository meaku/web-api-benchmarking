"use strict";

var exec = require("child_process").exec,
    argv = require("minimist")(process.argv.slice(2)),
    usage = require("usage"),
    when = require("when"),
    poll = require("when/poll");

var count = 0,
    limit = argv.limit || 10,
    interval = argv.interval || 1000,
    pid = parseInt(argv.pid),
    options = {keepHistory: true},
    results = [];

(function monitor() {

    poll(function() { return measure(pid); }, interval, function (res) {

        //TODO handle potential calls with res as array in case of many processes
        results.push({
            count: count,
            cpu: res.cpu,
            mem: res.mem,
            date: res.date
        });

        return ++count === limit;
    })
        .done(function (res) {
            //console.log("main res", res, results);
            console.log(JSON.stringify(results));
        }, function (err) {
            console.log(err);
            //throw err;
        });

})();

function getSubProcesses(pid) {

    return when.promise(function (resolve, reject) {

        exec("pgrep -P " + pid, function (err, stdout) {

            if (err) {
                reject(err);
                return;
            }

            var split = stdout.split(",");
            resolve(split.map(function (s) {
                return parseInt(s.substr(0, s.length - 1));
            }));
        });
    });
}

function measurePid(pid) {

    return when.promise(function (resolve, reject) {

        usage.lookup(pid, options, function (err, result) {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                date: Date.now(),
                counter: count,
                mem: result.memory,
                cpu: result.cpu
            });
        });
    });
}

function measure(pid) {

    var pids = [];

    /*
    return getSubProcesses(pid)
        .then(function (spids) {

            pids.push(pid);
            pids = pids.concat(spids);

            return when.map(pids, function (pid) {
                return measurePid(pid);
            });
        });
        */
    return measurePid(pid);
}



