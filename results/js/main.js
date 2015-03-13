'use strict';

$(document).ready(function() {

    d3.json('data/results.json', function(data) {

        console.log(data);

        //modify away!
        MG.data_graphic({
            title: "Memory usage",
            description: "Memory usage of process (including sub-processes)",
            data: data,
            width: 400,
            height: 250,
            target: "#memory",
            x_accessor: "count",
            y_accessor: "mem",
            //xax_count: 20,
            markers: [
                { count: 5, label: "Benchmark start"},
                { count: 15, label: "Benchmark end"}
            ],
            interpolate: "basis"

        });

        MG.data_graphic({
            title: "CPU usage",
            description: "CPU usage of process (including sub-processes)",
            data: data,
            width: 400,
            height: 250,
            target: "#cpu",
            yax_units: "%",
            xax_units: "",
            x_accessor: "count",
            y_accessor: "cpu",
            //xax_count: 20,
            markers: [
                { count: 5, label: "Benchmark start"},
                { count: 15, label: "Benchmark end"}
            ],
            interpolate: "basis"
        });

        // data tables
        var table_data = [

            {
                label: 'sync',
                transferPerSec: '116.76B',
                requestsPerSec: 0.9,
                connectErrors: '0',
                readErrors: '91',
                writeErrors: '0',
                timeoutErrors: '1666',
                requestsTotal: 9,
                durationActual: '10.02s',
                transferTotal: '1.14KB',
                latencyAvg: '8.54s',
                latencyStdev: '1.42s',
                latencyMax: '9.15s',
                latencyStdevPerc: 90,
                rpsAvg: '0.00',
                rpsStdev: '0.00',
                rpsMax: '0.00',
                rpsStdevPerc: 100,
                latency50: '9.15s',
                latency75: '9.15s',
                latency90: '9.15s',
                latency99: '9.15s' },
            {
                label: 'async',
                transferPerSec: '42.17KB',
                requestsPerSec: 332.15,
                requestsTotal: 3329,
                durationActual: '10.02s',
                transferTotal: '422.63KB',
                latencyAvg: '1.10s',
                latencyStdev: '128.46ms',
                latencyMax: '1.80s',
                latencyStdevPerc: 96.67,
                rpsAvg: '36.00',
                rpsStdev: '2.26',
                rpsMax: '39.00',
                rpsStdevPerc: 63.33,
                latency50: '1.08s',
                latency75: '1.09s',
                latency90: '1.09s',
                latency99: '1.80s' }
        ];

        var table1 = MG.data_table({
            data: table_data,
            title: 'Benchmark results'
        })
            .target('#table1')
            .title({ accessor: 'label', label: 'Test', font_weight: 'bold' })
            .number({ accessor: 'requestsPerSec', label: 'Requests per second' })
            .number({ accessor: 'transferPerSec', label: 'Transfer per second' })
            .number({ accessor: 'timeoutErrors', label: 'Timeout errors' })
            .number({ accessor: 'requestsTotal', label: 'Requests total' })
            .number({ accessor: 'latencyAvg', label: 'Latency average'})
            .display();

    });
}, false);
