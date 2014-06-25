var tests = {
    "node_json": {
        cmd: "node",
        args: ["/vagrant/node/benchmark/httpServer.js"]
    },
    "go_json": {
        cmd: "go-run",
        args: [""]
    }
};

module.exports = tests;