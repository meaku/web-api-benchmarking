

# simple print

## node

### wrk -t12 -c400 -d30s http://192.168.50.100:8000
5406.57
5322.68
5385.78
5412.43

## go

### wrk -t12 -c400 -d30s http://192.168.50.100:8080
6134.02
5852.37
6026.44


# non-blocking / go-blocking (threads)
- fast selbes ergebnis

## wrk -t12 -c400 -d30s http://192.168.50.100:8080

### go
Requests/sec:     92.77
Transfer/sec:     13.23KB

### node
__node__
Requests/sec:     92.77
Transfer/sec:     11.78KB