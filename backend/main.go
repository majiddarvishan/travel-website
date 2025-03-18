package main

import (
	"encoding/json"
	"log"
	"net/http"
	"sort"
	"strconv"
	"time"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// Place represents a travel destination
type Place struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Location    string    `json:"location"`
	ImageURL    string    `json:"imageUrl"`
	Views       int       `json:"views"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
	Reviews     []Review  `json:"reviews,omitempty" gorm:"foreignKey:PlaceID"`
}

// Review represents a user review for a place
type Review struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	PlaceID   uint      `json:"placeId"`
	UserName  string    `json:"userName"`
	Rating    int       `json:"rating"`
	Comment   string    `json:"comment"`
	CreatedAt time.Time `json:"createdAt"`
}

var db *gorm.DB

func main() {
	// Initialize database
	initDB()

	// Create router
	router := mux.NewRouter()

	// Define routes
	router.HandleFunc("/api/places", getPlaces).Methods("GET")
	router.HandleFunc("/api/places/popular", getPopularPlaces).Methods("GET")
	router.HandleFunc("/api/places/{id}", getPlace).Methods("GET")
	router.HandleFunc("/api/places", createPlace).Methods("POST")
	router.HandleFunc("/api/places/{id}/view", incrementViews).Methods("POST")
	router.HandleFunc("/api/places/{id}/reviews", getReviews).Methods("GET")
	router.HandleFunc("/api/places/{id}/reviews", createReview).Methods("POST")

	// Set up CORS
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	// Start server
	handler := c.Handler(router)
	log.Println("Server started on port 8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}

func initDB() {
	var err error
	db, err = gorm.Open(sqlite.Open("travel.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Migrate schema
	db.AutoMigrate(&Place{}, &Review{})

	// Seed some initial data if database is empty
	var count int64
	db.Model(&Place{}).Count(&count)
	if count == 0 {
		seedData()
	}
}

func seedData() {
	places := []Place{
		{
			Name:        "Bali Beach",
			Description: "Beautiful tropical paradise with crystal clear waters.",
			Location:    "Bali, Indonesia",
			ImageURL:    "/images/bali.jpg",
			Views:       120,
		},
		{
			Name:        "Swiss Alps",
			Description: "Majestic mountains with breathtaking views.",
			Location:    "Switzerland",
			ImageURL:    "/images/swiss-alps.jpg",
			Views:       95,
		},
		{
			Name:        "Santorini",
			Description: "Iconic white buildings with blue domes overlooking the sea.",
			Location:    "Greece",
			ImageURL:    "/images/santorini.jpg",
			Views:       150,
		},
		{
			Name:        "Grand Canyon",
			Description: "One of the most spectacular natural wonders of the world.",
			Location:    "Arizona, USA",
			ImageURL:    "/images/grand-canyon.jpg",
			Views:       200,
		},
		{
			Name:        "Kyoto Gardens",
			Description: "Traditional Japanese gardens with peaceful ambiance.",
			Location:    "Kyoto, Japan",
			ImageURL:    "/images/kyoto.jpg",
			Views:       85,
		},
	}

	for _, place := range places {
		db.Create(&place)
	}

	// Add some sample reviews
	reviews := []Review{
		{
			PlaceID:  1,
			UserName: "TravelFan",
			Rating:   5,
			Comment:  "The most beautiful beach I've ever visited!",
		},
		{
			PlaceID:  1,
			UserName: "Adventurer123",
			Rating:   4,
			Comment:  "Great place to relax and enjoy nature.",
		},
		{
			PlaceID:  2,
			UserName: "MountainLover",
			Rating:   5,
			Comment:  "The views are absolutely breathtaking.",
		},
	}

	for _, review := range reviews {
		db.Create(&review)
	}
}

func getPlaces(w http.ResponseWriter, r *http.Request) {
	var places []Place
	result := db.Find(&places)
	if result.Error != nil {
		http.Error(w, result.Error.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(places)
}

func getPopularPlaces(w http.ResponseWriter, r *http.Request) {
	var places []Place
	result := db.Order("views DESC").Limit(5).Find(&places)
	if result.Error != nil {
		http.Error(w, result.Error.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(places)
}

func getPlace(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id := params["id"]

	var place Place
	result := db.Preload("Reviews").First(&place, id)
	if result.Error != nil {
		http.Error(w, "Place not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(place)
}

func createPlace(w http.ResponseWriter, r *http.Request) {
	var place Place
	err := json.NewDecoder(r.Body).Decode(&place)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	place.CreatedAt = time.Now()
	place.UpdatedAt = time.Now()
	place.Views = 0

	result := db.Create(&place)
	if result.Error != nil {
		http.Error(w, result.Error.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(place)
}

func incrementViews(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id := params["id"]

	var place Place
	result := db.First(&place, id)
	if result.Error != nil {
		http.Error(w, "Place not found", http.StatusNotFound)
		return
	}

	place.Views++
	db.Save(&place)

	w.WriteHeader(http.StatusOK)
}

func getReviews(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	placeID := params["id"]

	var reviews []Review
	result := db.Where("place_id = ?", placeID).Find(&reviews)
	if result.Error != nil {
		http.Error(w, result.Error.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(reviews)
}

func createReview(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	placeID, err := strconv.Atoi(params["id"])
	if err != nil {
		http.Error(w, "Invalid place ID", http.StatusBadRequest)
		return
	}

	var review Review
	err = json.NewDecoder(r.Body).Decode(&review)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	review.PlaceID = uint(placeID)
	review.CreatedAt = time.Now()

	result := db.Create(&review)
	if result.Error != nil {
		http.Error(w, result.Error.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(review)
}