package model

import (
	"context"
	"encoding/json"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Client is the MongoDB client that will be used to interact with the database.
var Client *mongo.Client

// Define the database name
var dbName = "test"

// InitDB initializes the connection to the MongoDB database.
func InitDB() {
	// Load environment variables from .env file.
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found!")
	}

	// Get the MongoDB URI from the environment variables.
	uri := os.Getenv("MONGODB_URI")
	if uri == "" {
		log.Fatal("You must set your 'MONGODB_URI' environment variable")
	}

	// Create a context with a timeout of 10 seconds.
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Connect to MongoDB with the provided URI.
	var err error
	Client, err = mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal(err)
	}

	// Ping the MongoDB server to ensure that the connection has been established correctly.
	err = Client.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}

	log.Println("Connected to MongoDB")
}

// PopulateDB populates the MongoDB with mock data from JSON file.
func PopulateDB() (bool, error) {
	// Define the database name
	dbName := "test"

	// Check if KPIs, Products, and Transactions collections are populated
	kpiCollection := Client.Database(dbName).Collection("kpis")
	productCollection := Client.Database(dbName).Collection("products")
	transactionCollection := Client.Database(dbName).Collection("transactions")

	kpiCount, err := kpiCollection.CountDocuments(context.TODO(), bson.D{})
	if err != nil {
		return false, err
	}

	productCount, err := productCollection.CountDocuments(context.TODO(), bson.D{})
	if err != nil {
		return false, err
	}

	transactionCount, err := transactionCollection.CountDocuments(context.TODO(), bson.D{})
	if err != nil {
		return false, err
	}

	// If all collections are already populated, return false
	if kpiCount > 0 && productCount > 0 && transactionCount > 0 {
		log.Println("All collections are already populated. Skipping population.")
		return false, nil
	}

	// Read JSON file
	file, err := os.ReadFile("data/mockdata.json")
	if err != nil {
		return false, err
	}

	// Unmarshal JSON to structs
	var data struct {
		KPIs        []KPI          `json:"kpis"`
		Product     []Products     `json:"products"`
		Transaction []Transactions `json:"transactions"`
	}
	if err := json.Unmarshal(file, &data); err != nil {
		return false, err
	}

	// Populate collections if they are empty
	if kpiCount == 0 {
		for _, kpi := range data.KPIs {
			_, err := kpiCollection.InsertOne(context.TODO(), kpi)
			if err != nil {
				return false, err
			}
		}
		log.Println("KPIs have been populated")
	}

	if productCount == 0 {
		for _, product := range data.Product {
			_, err := productCollection.InsertOne(context.TODO(), product)
			if err != nil {
				return false, err
			}
		}
		log.Println("Products have been populated!")
	}

	if transactionCount == 0 {
		for _, transaction := range data.Transaction {
			_, err := transactionCollection.InsertOne(context.TODO(), transaction)
			if err != nil {
				return false, err
			}
		}
		log.Println("Transactions have been populated!")
	}

	log.Println("Data has been populated!")
	return true, nil
}
