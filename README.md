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

ps -f -L 22929

vagrant  22929  1395 22929 24    6 13:10 pts/0    Sl+    0:22 node node/benchmark/jsonServer.js
vagrant  22929  1395 22930  2    6 13:10 pts/0    Sl+    0:01 node node/benchmark/jsonServer.js
vagrant  22929  1395 22932  9    6 13:11 pts/0    Sl+    0:04 node node/benchmark/jsonServer.js
vagrant  22929  1395 22933 10    6 13:11 pts/0    Sl+    0:04 node node/benchmark/jsonServer.js
vagrant  22929  1395 22934 10    6 13:11 pts/0    Sl+    0:04 node node/benchmark/jsonServer.js
vagrant  22929  1395 22935 10    6 13:11 pts/0    Sl+    0:04 node node/benchmark/jsonServer.js

    psr        PSR     processor that process is currently assigned to.
    rss        RSS     resident set size, the non-swapped physical memory that a task has used (in kiloBytes). (alias rssize, rsz).
    vsz        VSZ     virtual memory size of the process in KiB (1024-byte units). Device mappings are currently excluded; this is
                             subject to change. (alias vsize).


ps -T -o "%cpu %mem rss vsz lwp psr" 22929


## maybe?
ps -o thcount -p <process id>
That would give you only the thread count.

Play with other field specifiers for the "-o" option (see 'man ps') for other info. For instance

ps -o pid,comm,user,thcount -p <process id>
