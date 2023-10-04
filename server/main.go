package main

import (
	"context"
	"finance-app/handler"
	"finance-app/model"
	"log"
	"net/http"
	"os"
	"os/signal"

	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

func main() {
	//Intialize the database connection
	model.InitDB()
	//Populate database
	populated, err := model.PopulateDB()
	if err != nil {
		log.Fatal("Error populating dabase: %v", err)
	}

	if populated {
		log.Println("Database has been populated during this run.")
	} else {
		log.Println("Database was already populated. No changes were made.")
	}

	// Setup a channel to receive os.Interrupt signal (Ctrl+C)
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)

	// Launch a goroutine that will perform cleanup tasks when os.Interrupt is received.
	go func() {
		<-c //Block until we receive os.Interrupt
		log.Println("Gracefully shutting down...")

		//Perform cleanup tasks here...
		if err := model.Client.Disconnect(context.TODO()); err != nil {
			log.Fatal("Error disconnecting from the dabase: %v", err)
		}

		os.Exit(0)
	}()

	//Setup HTTP routes
	mux := http.NewServeMux()
	mux.HandleFunc("/kpi/kpis/", handler.KpiHandler)
	mux.HandleFunc("/kpi/products/", handler.ProductsHandler)
	mux.HandleFunc("/kpi/transactions/", handler.TransactionsHandler)

	// Apply the CORS middleware to your top-level handler, with the allowed origins.
	corsHandler := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:5173"}, // Your React app’s origin
		AllowedMethods: []string{"GET"},
		AllowedHeaders: []string{"Authorization", "Content-Type"},
	}).Handler(mux)

	loggedRouter := handler.LoggingMiddleware(corsHandler)

	//Check environment variable
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found!")
	}

	// Get the port from environment variables
	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("You must provide a port number")
	}

	// Log that the server is starting.
	log.Printf("Starting server on port %s", port)

	// Start the server.
	log.Fatal(http.ListenAndServe(":"+port, loggedRouter))
}
