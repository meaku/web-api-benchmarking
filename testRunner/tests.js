var tests = {
    "node_json": {
        cmd: "node",
        args: ["/vagrant/node/benchmark/jsonServer.js"]
    },
    "node_json_cluster": {
        cmd: "node",
        args: ["/vagrant/node/benchmark/jsonServer.cluster.js"]
    },
    "go_json": {
        cmd: "go",
        args: ["run", "/vagrant/go/benchmark/jsonServer.go"]
    }
};

module.exports = tests;