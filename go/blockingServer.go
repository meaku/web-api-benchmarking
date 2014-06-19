package main

import (
    "log"
    "net/http"
    "fmt"
    "os/exec"
)

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r * http.Request) {
        cmd := exec.Command("sleep", "1")
        err := cmd.Start()
        if err != nil {
            log.Fatal(err)
        }
		log.Printf("Waiting for command to finish...")
        err = cmd.Wait()
		log.Printf("Finished")
        fmt.Fprint(w, "Hello world");
    });

    if err := http.ListenAndServe(":8080", nil); err != nil {
        log.Fatal("ListenAndServe: ", err);
    }
}


