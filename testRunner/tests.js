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
    },
    "node_fs_sync": {
        cmd: "node",
        args: ["/vagrant/node/blocking-fs/syncRead.js"]
    },
    "node_fs_async": {
        cmd: "node",
        args: ["/vagrant/node/blocking-fs/asyncRead.js"]
    },
    "node_blocking": {
        cmd: "node",
        args: ["/vagrant/node/blocking-non-blocking/blockingServer.js"]
    },
    "node_callback": {
        cmd: "node",
        args: ["/vagrant/node/flowControl/callbackServer.js"]
    },
    "node_promise": {
        cmd: "node",
        args: ["/vagrant/node/flowControl/promiseServer.js"]
    },
    "node_generator": {
        cmd: "node",
        args: ["/vagrant/node/flowControl/generatorServer.js"]
    },
    "node_non_blocking": {
        cmd: "node",
        args: ["/vagrant/node/blocking-non-blocking/nonBlockingServer.js"]
    }
};

module.exports = tests;