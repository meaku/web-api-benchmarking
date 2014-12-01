"use strict";

var testRunner = require("./testRunner.js"),
    fs = require("fs"),
    path = require("path");

testRunner("node_json", function (err, results) {
    if (err) {
        throw err;
    }

    console.log("monitor", JSON.stringify(results[0]));
    console.log("wrk", results[1]);


    fs.writeFileSync(path.resolve(__dirname, "../results/data/results.json"), JSON.stringify(results[0]));
});