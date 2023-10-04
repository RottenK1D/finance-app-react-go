package model

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Day represents the structure of a transaction in the database.
type Day struct {
	Date     string  `json:"date" bson:"date"`
	Revenue  float64 `json:"revenue" bson:"revenue"`
	Expenses float64 `json:"expenses" bson:"expenses"`
}

// Month represents the financial data for a specific month.
type Month struct {
	Month                  string  `json:"month" bson:"month"`
	Revenue                float64 `json:"revenue" bson:"revenue"`
	Expenses               float64 `json:"expenses" bson:"expenses"`
	OperationalExpenses    float64 `json:"operationalExpenses" bson:"operationalExpenses"`
	NonOperationalExpenses float64 `json:"nonOperationalExpenses" bson:"nonOperationalExpenses"`
}

// KPI represents the Key Performance Indicators for financial data.
type KPI struct {
	ID                 primitive.ObjectID `json:"id" bson:"_id"`
	TotalProfit        float64            `json:"totalProfit" bson:"totalProfit"`
	TotalRevenue       float64            `json:"totalRevenue" bson:"totalRevenue"`
	TotalExpenses      float64            `json:"totalExpenses" bson:"totalExpenses"`
	ExpensesByCategory map[string]float64 `json:"expensesByCategory" bson:"expensesByCategory"`
	MonthlyData        []Month            `json:"monthlyData" bson:"monthlyData"`
	DailyData          []Day              `json:"dailyData" bson:"dailyData"`
	CreatedAt          time.Time          `json:"createdAt" bson:"createdAt"`
	UpdatedAt          time.Time          `json:"updatedAt" bson:"updatedAt"`
}

// FindKPIs retrieves all Key Performance Indicators from database
func FindKPIs() ([]KPI, error) {
	// Access the collection from the database
	collection := Client.Database("test").Collection("kpis")
	cursor, err := collection.Find(context.TODO(), bson.D{})
	if err != nil {
		log.Printf("Failed to find KPIs: %v", err)
		return nil, err
	}

	// Ensure the cursor is closed after the function returns
	defer cursor.Close(context.TODO())

	var kpis []KPI
	// Decode all the documents returned by the cursor
	if err := cursor.All(context.TODO(), &kpis); err != nil {
		log.Printf("Failed to decode KPIs: %v", err)
		return nil, err
	}

	// Return the slice of transactions
	return kpis, nil
}
