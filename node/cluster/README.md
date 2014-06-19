 # node
 ## wrk -t12 -c400 -d30s http://192.168.50.100:8000

13750.56
13921.22


# go (GOMAXPROCS=2 go run singleProcess/app.go)
## wrk -t12 -c400 -d30s http://192.168.50.100:8080 (

13465.14
13424.80