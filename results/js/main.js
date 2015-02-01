'use strict';

$(document).ready(function() {

    d3.json('data/results.json', function(data) {

        console.log(data);

        //modify away!
        data_graphic({
            title: "Memory usage",
            description: "Memory usage of process (including sub-processes)",
            data: data,
            width: 400,
            height: 250,
            target: "#memory",
            x_accessor: "count",
            y_accessor: "mem",
            markers: [
                { count: 5, label: "Benchmark start"},
                { count: 15, label: "Benchmark end"}
            ],
            interpolate: "basis"

        });
        data_graphic({
            title: "CPU usage",
            description: "CPU usage of process (including sub-processes)",
            data: data,
            width: 400,
            height: 250,
            target: "#cpu",
            x_accessor: "count",
            y_accessor: "cpu",
            markers: [
                { count: 5, label: "Benchmark start"},
                { count: 15, label: "Benchmark end"}
            ],
            interpolate: "basis"
        });
    });
}, false);
