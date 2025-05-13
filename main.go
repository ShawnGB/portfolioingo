package main

import (
	"log"
	"mymodules/gofolio/handlers"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("INFO: .env Datei nicht gefunden, verwende gesetzte Umgebungsvariablen.")
	}

	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	http.HandleFunc("/", handlers.IndexHandler)
	http.HandleFunc("/about", handlers.AboutHandler)
	http.HandleFunc("/services", handlers.ServiceHandler)
	http.HandleFunc("/projects", handlers.ProjectsHandler)
	http.HandleFunc("/arts", handlers.ArtsHandler)
	http.HandleFunc("/contact", handlers.ContactHandler)

	port := os.Getenv("PORT")
	if port == "" {
		log.Printf("INFO: No PORT environment variable detected, defaulting to :%s", port)
	}

	log.Printf("INFO: Starting server on :%s", port)

	err = http.ListenAndServe(":"+port, nil)
	if err != nil {
		log.Fatalf("FATAL: Server error: %v", err)
	}
}
