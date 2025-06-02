package main

import (
	"log"
	"mymodules/gofolio/handlers"
	"mymodules/gofolio/i18n"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("INFO: .env not found")
	}

	i18n.Init("i18n/locales")

	mux := http.NewServeMux()

	// Static File Server
	fs := http.FileServer(http.Dir("./static"))
	mux.Handle("/static/", http.StripPrefix("/static/", fs))

	// routes fuer sitemap und robots
	mux.HandleFunc("/robots.txt", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./static/robots.txt")
	})

	mux.HandleFunc("/sitemap.xml", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./static/sitemap.xml")
	})

	mux.HandleFunc("/", handlers.IndexHandler)
	mux.HandleFunc("/about", handlers.AboutHandler)
	mux.HandleFunc("/services", handlers.ServiceHandler)
	mux.HandleFunc("/projects", handlers.ProjectsHandler)
	mux.HandleFunc("/arts", handlers.ArtsHandler)
	mux.HandleFunc("/contact", handlers.ContactHandler)

	port := os.Getenv("PORT")
	if port == "" {
		log.Printf("INFO: No PORT environment variable detected, defaulting to :%s", port)
	}

	log.Printf("INFO: Starting server on :%s", port)

	i18nedMux := i18n.MiddlewareI18n(mux)

	err = http.ListenAndServe(":"+port, i18nedMux)
	if err != nil {
		log.Fatalf("FATAL: Server error: %v", err)
	}
}
