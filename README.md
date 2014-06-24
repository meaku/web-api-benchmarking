# Web-API Benchmarking


- https://www.mnot.net/blog/2011/05/18/http_benchmark_rules

## Test Setup

### Measurement Tools 

#### HTTP - WRK 

>"Modern HTTP benchmarking tool"

>wrk is a modern HTTP benchmarking tool capable of generating significant
   load when run on a single multi-core CPU. It combines a multithreaded
   design with scalable event notification systems such as epoll and kqueue.
 

- https://github.com/wg/wrk
- also used by node.js during development (https://github.com/joyent/node/tree/master/tools)

#### WebSockets - Thor

>Thor is WebSocket benchmarking/load generator. 
There are a lot of benchmarking tools for HTTP servers. You've got ab, siege, wrk and more. 
But all these tools only work with plain ol HTTP and have no support for WebSockets - even if they did they wouldn't be suitable, as they would be testing short running HTTP requests instead of long running HTTP requests with a lot of messaging traffic.
Thor fixes all of this.

- https://github.com/observing/thor


#### Process logging
sudo collectl -P -f log ? 
