"use strict";

var testRunner = require("./testRunner.js"),
    tests = require("./tests"),
    fs = require("fs"),
    path = require("path"),
    influx = require("influx"),
    argv = require("minimist")(process.argv.slice(2));


var influxClient = influx({
    // or single-host configuration
    host: 'localhost',
    port: 8086, // optional, default 8086
    username: 'benchmark',
    password: 'benchmark',
    database: 'benchmark'
});

var testName = argv.id;

if(!testName) {
    throw new Error("Please tell me which test you want? " + Object.keys(tests).join(","));
}

console.log("running test '" + testName + "'");

testRunner(testName, function (err, results) {
    if (err) {
        throw err;
    }

    console.log("monitor", JSON.stringify(results[0]));
    console.log("wrk", results[1]);

    var influxData = results[0].map(function (entry) {
        return {
            time: entry.date,
            cpu: entry.cpu,
            mem: entry.mem,
            count: entry.count
        };
    });

    console.log(influxData);

    console.log(JSON.stringify(results[0]));

    influxClient.writePoints(testName, influxData, function (err) {
        console.log("saved to influx as " +  + "?", err);
    });


    fs.writeFileSync(path.resolve(__dirname, "../results/data/results.json"), JSON.stringify(results[0]));
});