# Backend Setup (Go)

# Create project directory
mkdir travel-website
cd travel-website

# Create backend directory
mkdir backend
cd backend

# Initialize Go module
go mod init travel-website

# Install required Go packages
go get github.com/gorilla/mux
go get github.com/rs/cors
go get gorm.io/gorm
go get gorm.io/driver/sqlite

# Create main.go file
# [Copy the Go backend code from the first artifact here]

# Run the backend
go run main.go

# Frontend Setup (React)

# Create React app (in a new terminal)
cd travel-website
npx create-react-app frontend

# Navigate to frontend directory
cd frontend

# Install required packages
npm install react-router-dom
npm install bootstrap
npm install react-bootstrap

# Create the necessary directories
mkdir -p src/components
mkdir -p src/pages

# Create the necessary files
# [Create all the React component files from the second artifact]

# Add Bootstrap Icons to public/index.html
# Add this line in the <head> section:
# <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">

# Start the React app
npm start

# Website Database Setup
This SQL file provides:

1. Table Creation:

* places table for storing destination information
* reviews table with a foreign key relationship to places


2. Sample Data:

* 8 popular travel destinations with detailed descriptions
* 10 reviews spread across different destinations


3. Performance Optimization:

* Indexes for faster queries on commonly accessed fields
* Constraints to ensure data integrity (like rating range check)

To use this SQL file:

# Option 1: With SQLite CLI

```bash
# In your project directory
sqlite3 backend/travel.db < travel-db-setup.sql
```

# Option 2: Import via Go
You can create a function in your Go backend to execute this SQL file during startup:

```go
func importSQLFile(db *gorm.DB, filename string) error {
    content, err := ioutil.ReadFile(filename)
    if err != nil {
        return err
    }

    statements := strings.Split(string(content), ";")
    for _, stmt := range statements {
        stmt = strings.TrimSpace(stmt)
        if stmt == "" {
            continue
        }

        result := db.Exec(stmt)
        if result.Error != nil {
            return result.Error
        }
    }

    return nil
}
```

This SQL schema is compatible with the Go and React code provided earlier.
The sample data will give your travel website a populated look from the start.