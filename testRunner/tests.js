var tests = {
    "node_json": {
        cmd: "node",
        args: ["/vagrant/node/benchmark/jsonServer.js"]
    },
    "go_json": {
        cmd: "go",
        args: ["run", "/vagrant/go/benchmark/jsonServer.go"]
    }
};

module.exports = tests;