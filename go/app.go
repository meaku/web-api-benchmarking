package main

import (
	"log"
	"net/http"
	"fmt"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter) {
			fmt.Fprint(w, "Hello world");
		});

	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal("ListenAndServe: ", err);
	}
}


