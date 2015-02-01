"use strict";

var testRunner = require("./testRunner.js"),
    fs = require("fs"),
    path = require("path"),
    influx = require("influx");

/*
var client = influx({
    // or single-host configuration
    host: 'localhost',
    port: 8086, // optional, default 8086
    username: 'benchmark',
    password: 'benchmark',
    database: 'benchmark'
});
*/


testRunner("node_non_blocking", function (err, results) {
    if (err) {
        throw err;
    }

    console.log("monitor", JSON.stringify(results[0]));
    console.log("wrk", results[1]);

    /*
    client.writeSeries({
        cpu: results[0].map(function (entry) {
            return {
                time: entry.date,
                cpu: entry.cpu
            };
        })
    }, function (err) {
        console.log("saved?", arguments);
    });
    */


    fs.writeFileSync(path.resolve(__dirname, "../results/data/results.json"), JSON.stringify(results[0]));
});