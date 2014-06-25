"use strict";

var spawn = require("child_process").spawn,
    tests = require("./tests.js"),
    argv = require('minimist')(process.argv.slice(2)),
    testId = argv.id,
    test = tests[testId];

if(!test) {
    throw new Error("invalid test id '" + testId + "'");
}

var child = spawn(test.cmd, test.args, {
    detached: true,
    stdio: ['ignore', 'ignore', 'ignore']
});

console.log(child.pid);
child.unref();