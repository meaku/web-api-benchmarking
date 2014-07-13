"use strict";

var exec = require("child_process").exec,
    argv = require('minimist')(process.argv.slice(2)),
    usage = require("usage");

var count = 0,
    limit = argv.limit || 10,
    interval = argv.interval || 1000,
    pid = parseInt(argv.pid),
    options = { keepHistory: true },
    results = [];

(function monitor() {
    setInterval(function () {

        if (count === limit) {
            console.log(JSON.stringify(results));
            process.exit(0);
        }

        measure(argv.pid);
        count++;

    }, interval);

})();

function measure(pid) {

    usage.lookup(pid, options, function (err, result) {
        if(err) {
            throw err;
        }

        results.push({
            date: Date.now(),
            mem: result.memory,
            cpu: result.cpu
        });
    });
}



