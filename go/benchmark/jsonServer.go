package main

import (
	"io"
	"os"
	"log"
	"net/http"
	"fmt"
)



func main() {
	filePath := "/vagrant/go/benchmark/assets/names.json"
	fmt.Printf("%path", filePath)

	http.HandleFunc("/", func(w http.ResponseWriter, req *http.Request) {

			// open input file
			fi, err := os.Open(filePath)
			if err != nil {
				panic(err)
			}
			// close fi on exit and check for its returned error
			defer func() {
				if err := fi.Close(); err != nil {
					panic(err)
				}
			}()

			//dec := json.NewDecoder(fi)
			//dec.Encode(w);

			io.Copy(w, fi);
	})


	if err := http.ListenAndServe(":8000", nil); err != nil {
		log.Fatal("ListenAndServe: ", err);
	}
}


