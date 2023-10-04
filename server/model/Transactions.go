package model

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Transaction represents the structure of a transaction in the database.
type Transactions struct {
	ID         primitive.ObjectID   `json:"id" bson:"_id"`
	Buyer      string               `json:"buyer" bson:"buyer"`
	Amount     float64              `json:"amount" bson:"amount"`
	ProductIds []primitive.ObjectID `json:"productIds" bson:"productIds"`
	CreatedAt  time.Time            `json:"createdAt" bson:"createdAt"`
	UpdatedAt  time.Time            `json:"updatedAt" bson:"updatedAt"`
}

// FindTransactions retrieves all transactions from database
func FindTransactions() ([]Transactions, error) {
	// Access the collection from the database
	collection := Client.Database("test").Collection("transactions")
	cursor, err := collection.Find(context.TODO(), bson.D{})
	if err != nil {
		log.Printf("Failed to find Transactions: %v", err)
		return nil, err
	}

	// Ensure the cursor is closed after the function returns
	defer cursor.Close(context.TODO())

	var transactions []Transactions
	// Decode all the documents returned by the cursor
	if err := cursor.All(context.TODO(), &transactions); err != nil {
		log.Printf("Failed to decode Transactions: %v", err)
		return nil, err
	}

	// Return the slice of transactions
	return transactions, nil
}
