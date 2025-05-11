package main

import (
	"fmt"
	"mymodules/gofolio/handlers"
	"net/http"
)

func main() {
	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	http.HandleFunc("/", handlers.IndexHandler)
	http.HandleFunc("/about", handlers.AboutHandler)
	http.HandleFunc("/services", handlers.ServiceHandler)
	http.HandleFunc("/projects", handlers.ProjectsHandler)
	http.HandleFunc("/arts", handlers.ArtsHandler)
	http.HandleFunc("/contact", handlers.Contacthandler)

	fmt.Println("Running server on port 8080")
	err := http.ListenAndServe(":8080", nil) // Server starten
	if err != nil {
		fmt.Println("Server error:", err)
	}
}
