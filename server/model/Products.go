package model

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Product represents the structure of a products in the database.
type Products struct {
	ID           primitive.ObjectID   `json:"id" bson:"_id"`
	Price        float64              `json:"price" bson:"price"`
	Expense      float64              `json:"expense" bson:"expense"`
	Transactions []primitive.ObjectID `json:"transactions" bson:"transactions"`
	CreatedAt    time.Time            `json:"createdAt" bson:"createdAt"`
	UpdatedAt    time.Time            `json:"updatedAt" bson:"updatedAt"`
}

// FindProducts retrieves all products from database
func FindProducts() ([]Products, error) {
	// Access the collection from the database
	collection := Client.Database("test").Collection("products")
	cursor, err := collection.Find(context.TODO(), bson.D{})
	if err != nil {
		log.Printf("Failed to find Products: %v", err)
		return nil, err
	}

	// Ensure the cursor is closed after the function returns
	defer cursor.Close(context.TODO())

	var products []Products
	// Decode all the documents returned by the cursor
	if err := cursor.All(context.TODO(), &products); err != nil {
		log.Printf("Failed to decode Products: %v", err)
		return nil, err
	}

	// Return the slice of transactions
	return products, nil
}
